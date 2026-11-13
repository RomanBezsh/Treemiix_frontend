"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import LoadError from "@/components/common/LoadError";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  ImageOff,
  Loader2,
  LockKeyhole,
  Package,
  Pencil,
  RefreshCw,
  Store,
  Trash2,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import ProductMediaFields from "@/components/products/ProductMediaFields";
import { clearAuthSession, saveAuthSession } from "@/lib/authSession";
import { productImagePaths } from "@/lib/media";
import {
  createSellerProduct,
  deleteSellerProduct,
  getCategories,
  getMySeller,
  getSellerPlan,
  getSellerProducts,
  Seller,
  SellerApiError,
  SellerBusinessType,
  SellerCategory,
  SellerPlan,
  SellerProduct,
  SellerStatus,
  startSellerOnboarding,
  submitSellerOnboarding,
  updateSellerBusiness,
  updateSellerPayout,
  updateSellerProduct,
  updateSellerStorefront,
  type BusinessForm,
  type CreateProductForm,
  type PayoutForm,
  type StorefrontForm,
} from "@/lib/sellerApi";

const emptyBusiness: BusinessForm = {
  businessType: "Individual",
  legalName: "",
  country: "",
  taxNumber: "",
  legalAddress: "",
  supportEmail: "",
  supportPhone: "",
};

const emptyStorefront: StorefrontForm = {
  storeName: "",
  storeSlug: "",
  logoUrl: "",
  description: "",
};

const emptyPayout: PayoutForm = {
  bankAccount: "",
};

const emptyProduct: CreateProductForm = {
  name: "",
  slug: "",
  categoryId: "",
  price: 0,
  oldCost: null,
  stock: 0,
  description: "",
  images: [],
};

const statusLabels: Record<SellerStatus, string> = {
  Draft: "Draft",
  PendingVerification: "Pending verification",
  Active: "Active",
  Rejected: "Rejected",
  Suspended: "Suspended",
  Inactive: "Inactive",
};

const statusStyles: Record<SellerStatus, string> = {
  Draft: "bg-slate-100 text-slate-700",
  PendingVerification: "bg-amber-100 text-amber-800",
  Active: "bg-emerald-100 text-emerald-800",
  Rejected: "bg-red-100 text-red-700",
  Suspended: "bg-red-100 text-red-700",
  Inactive: "bg-slate-100 text-slate-600",
};

function messageOf(error: unknown): string {
  if (error instanceof SellerApiError) return error.message;
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}

function formatDate(value: string | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
}

function sellerToBusiness(seller: Seller): BusinessForm {
  return {
    businessType: seller.businessType ?? "Individual",
    legalName: seller.legalName ?? "",
    country: seller.country ?? "",
    taxNumber: seller.taxNumber ?? "",
    legalAddress: seller.legalAddress ?? "",
    supportEmail: seller.supportEmail ?? "",
    supportPhone: seller.supportPhone ?? "",
  };
}

function sellerToStorefront(seller: Seller): StorefrontForm {
  return {
    storeName: seller.storeName ?? "",
    storeSlug: seller.storeSlug ?? "",
    logoUrl: seller.logoUrl ?? "",
    description: seller.description ?? "",
  };
}

function StepPill({
  number,
  title,
  active,
  done,
}: {
  number: number;
  title: string;
  active: boolean;
  done: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-semibold ${
          done
            ? "bg-emerald-500 text-white"
            : active
              ? "bg-[#49516D] text-white"
              : "bg-[#E9ECF2] text-[#777]"
        }`}
      >
        {done ? <CheckCircle2 size={16} /> : number}
      </span>
      <span
        className={`hidden text-[13px] font-medium sm:block ${
          active ? "text-[#333]" : "text-[#888]"
        }`}
      >
        {title}
      </span>
    </div>
  );
}

export default function SellerApplication() {
  const [loading, setLoading] = useState(true);
  // The initial seller/plan request failed (server error, rate limit, network): show a retry
  // instead of the onboarding wizard, which would wrongly suggest the user has no store
  const [loadFailed, setLoadFailed] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [hasToken, setHasToken] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [seller, setSeller] = useState<Seller | null>(null);
  const [plan, setPlan] = useState<SellerPlan | null>(null);
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [business, setBusiness] = useState<BusinessForm>(emptyBusiness);
  const [storefront, setStorefront] =
    useState<StorefrontForm>(emptyStorefront);
  const [payout, setPayout] = useState<PayoutForm>(emptyPayout);
  const [slugTouched, setSlugTouched] = useState(false);

  const [products, setProducts] = useState<SellerProduct[]>([]);
  const [categories, setCategories] = useState<SellerCategory[]>([]);
  const [productForm, setProductForm] =
    useState<CreateProductForm>(emptyProduct);
  const [editingProduct, setEditingProduct] = useState<SellerProduct | null>(
    null,
  );

  const applySeller = useCallback((next: Seller | null) => {
    setSeller(next);

    if (!next) {
      setStep(1);
      setBusiness(emptyBusiness);
      setStorefront(emptyStorefront);
      setPayout(emptyPayout);
      return;
    }

    setBusiness(sellerToBusiness(next));
    setStorefront(sellerToStorefront(next));
    setPayout((current) => ({
      bankAccount: next.bankAccount ?? current.bankAccount,
    }));

    if (next.status === "Rejected") {
      setStep(1);
    } else {
      setStep(Math.min(Math.max(next.onboardingStep || 1, 1), 4));
    }
  }, []);

  const loadSeller = useCallback(async () => {
    const next = await getMySeller();
    applySeller(next);
    return next;
  }, [applySeller]);

  const loadProducts = useCallback(async (sellerId: string) => {
    try {
      const [productData, categoryData] = await Promise.all([
        getSellerProducts(sellerId),
        getCategories(),
      ]);
      setProducts(productData);
      setCategories(categoryData);
      setProductForm((current) => ({
        ...current,
        categoryId: current.categoryId || categoryData[0]?.id || "",
      }));
    } catch {
      // Products are secondary; do not block the seller dashboard on them.
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (typeof window === "undefined") return;

      const token = localStorage.getItem("token");
      if (!token) {
        setHasToken(false);
        setLoading(false);
        return;
      }

      setHasToken(true);
      setUserEmail(localStorage.getItem("userEmail"));

      try {
        const [planData, sellerData] = await Promise.all([
          getSellerPlan(),
          getMySeller(),
        ]);

        if (cancelled) return;

        setPlan(planData);
        applySeller(sellerData);

        if (sellerData?.status === "Active") {
          void loadProducts(sellerData.id);
        }
      } catch (loadError) {
        if (cancelled) return;

        if (loadError instanceof SellerApiError && loadError.status === 401) {
          clearAuthSession();
          setHasToken(false);
        } else {
          console.warn("Failed to load Seller Center", loadError);
          setLoadFailed(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [applySeller, loadProducts, reloadKey]);

  useEffect(() => {
    const shouldPoll =
      seller?.status === "PendingVerification" ||
      (seller?.status === "Active" && !seller.canSell);

    if (!shouldPoll) return;

    const interval = window.setInterval(async () => {
      try {
        const next = await getMySeller();
        if (next) {
          applySeller(next);
          if (next.status === "Active" && next.canSell) {
            void loadProducts(next.id);
          }
        }
      } catch {
        // Ignore transient polling errors.
      }
    }, 30000);

    return () => window.clearInterval(interval);
  }, [applySeller, loadProducts, seller?.status, seller?.canSell]);

  const isEditable =
    seller?.status === "Draft" || seller?.status === "Rejected";

  const stepTitles = useMemo(
    () => ["Business", "Storefront", "Payout", "Review"],
    [],
  );

  const handleStart = async () => {
    setBusy(true);
    setError(null);
    setNotice(null);

    try {
      const result = await startSellerOnboarding();
      saveAuthSession({
        token: result.auth.token,
        refreshToken: result.auth.refreshToken,
        userRole: result.auth.user.role,
        userEmail: result.auth.user.email,
        userFirstName: result.auth.user.firstName,
        userLastName: result.auth.user.lastName,
      });
      applySeller(result.seller);
      setNotice("Your seller account was created. Continue with the details.");
    } catch (startError) {
      setError(messageOf(startError));
    } finally {
      setBusy(false);
    }
  };

  const handleBusinessSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);

    try {
      const updated = await updateSellerBusiness(business);
      applySeller(updated);
      setStep(2);
      setNotice("Business details saved.");
    } catch (saveError) {
      setError(messageOf(saveError));
    } finally {
      setBusy(false);
    }
  };

  const handleStorefrontSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);

    try {
      const updated = await updateSellerStorefront(storefront);
      applySeller(updated);
      setStep(3);
      setNotice("Storefront details saved.");
    } catch (saveError) {
      setError(messageOf(saveError));
    } finally {
      setBusy(false);
    }
  };

  const handlePayoutSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);

    try {
      const updated = await updateSellerPayout(payout);
      applySeller(updated);
      setStep(4);
      setNotice("Payout details saved.");
    } catch (saveError) {
      setError(messageOf(saveError));
    } finally {
      setBusy(false);
    }
  };

  const handleSubmitApplication = async () => {
    setBusy(true);
    setError(null);
    setNotice(null);

    try {
      const result = await submitSellerOnboarding();
      applySeller(result.seller);
      setNotice("Your application was sent for review.");
    } catch (submitError) {
      setError(messageOf(submitError));
    } finally {
      setBusy(false);
    }
  };

  const handleRefresh = async () => {
    setBusy(true);
    setError(null);

    try {
      const next = await loadSeller();
      if (next?.status === "Active") {
        void loadProducts(next.id);
      }
      setNotice("Status refreshed.");
    } catch (refreshError) {
      setError(messageOf(refreshError));
    } finally {
      setBusy(false);
    }
  };

  const handleStoreNameChange = (value: string) => {
    setStorefront((current) => ({
      ...current,
      storeName: value,
      storeSlug: slugTouched ? current.storeSlug : slugify(value),
    }));
  };

  const resetProductForm = () => {
    setEditingProduct(null);
    setProductForm({
      ...emptyProduct,
      categoryId: categories[0]?.id || "",
    });
  };

  const handleEditProduct = (product: SellerProduct) => {
    setEditingProduct(product);
    setError(null);
    setNotice(null);
    setProductForm({
      name: product.name,
      slug: product.slug,
      categoryId: product.categoryId,
      price: Number(product.price),
      oldCost: product.oldCost ?? null,
      stock: Number(product.stock),
      description: product.description,
      images: productImagePaths(product),
    });
    document
      .getElementById("seller-product-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSaveProduct = async (event: FormEvent) => {
    event.preventDefault();

    if (!productForm.categoryId) {
      setError("Select a category before adding a product.");
      return;
    }

    const price = Number(productForm.price);
    const oldCost =
      productForm.oldCost === null || Number.isNaN(Number(productForm.oldCost))
        ? null
        : Number(productForm.oldCost);
    if (oldCost !== null && oldCost <= price) {
      setError("Old price must be higher than the current price.");
      return;
    }

    setBusy(true);
    setError(null);
    setNotice(null);

    const form: CreateProductForm = {
      ...productForm,
      price,
      oldCost,
      stock: Number(productForm.stock),
    };

    try {
      if (editingProduct) {
        await updateSellerProduct(editingProduct, form);
      } else {
        await createSellerProduct(form);
      }
      const wasEditing = Boolean(editingProduct);
      resetProductForm();
      if (seller) await loadProducts(seller.id);
      setNotice(wasEditing ? "Product updated." : "Product added.");
    } catch (productError) {
      setError(messageOf(productError));
    } finally {
      setBusy(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm("Delete this product from your store?")) return;

    setBusy(true);
    setError(null);
    setNotice(null);

    try {
      await deleteSellerProduct(id);
      if (editingProduct?.id === id) resetProductForm();
      if (seller) await loadProducts(seller.id);
      setNotice("Product deleted.");
    } catch (productError) {
      setError(messageOf(productError));
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#49516D]" />
      </div>
    );
  }

  if (loadFailed) {
    return (
      <div className="mx-auto w-full max-w-[720px]">
        <h1 className="mb-6 text-[30px] font-bold text-[#333] sm:text-[36px]">
          Seller Center
        </h1>
        <LoadError
          what="your Seller Center"
          onRetry={() => {
            setLoadFailed(false);
            setLoading(true);
            setReloadKey((key) => key + 1);
          }}
        />
      </div>
    );
  }

  if (!hasToken) {
    return (
      <div className="mx-auto max-w-[720px] rounded-[24px] bg-[#F8F8F8] p-8 text-center shadow-[0_2px_8px_rgba(0,0,0,0.08)] sm:p-12">
        <LockKeyhole className="mx-auto mb-4 h-10 w-10 text-[#49516D]" />
        <h1 className="text-[28px] font-bold text-[#333]">
          Sign in to become a seller
        </h1>
        <p className="mt-3 text-[15px] text-[#666]">
          Use your Treemiix account to open a store. It takes a few minutes.
        </p>
        <Link
          href="/auth?next=/sell/apply"
          className="mt-6 inline-flex h-[48px] items-center justify-center rounded-[12px] bg-gradient-to-r from-[#FFDB5A] to-[#FF825A] px-8 text-[16px] font-medium text-white"
        >
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1120px]">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            href="/sell"
            className="mb-2 inline-flex items-center gap-1 text-[13px] text-[#7C9BC0] hover:underline"
          >
            <ArrowLeft size={14} /> Back to seller information
          </Link>
          <h1 className="text-[30px] font-bold text-[#333] sm:text-[36px]">
            Seller Center
          </h1>
          {userEmail && (
            <p className="mt-1 text-[14px] text-[#666]">
              Signed in as{" "}
              <span className="font-semibold text-[#333]">{userEmail}</span>
            </p>
          )}
        </div>

        {seller && (
          <span
            className={`rounded-full px-4 py-2 text-[13px] font-semibold ${statusStyles[seller.status]}`}
          >
            {statusLabels[seller.status]}
          </span>
        )}
      </div>

      {error && (
        <div className="mb-5 flex items-start gap-2 rounded-[14px] border border-red-200 bg-red-50 p-4 text-[14px] text-red-700">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {notice && (
        <div className="mb-5 flex items-start gap-2 rounded-[14px] border border-emerald-200 bg-emerald-50 p-4 text-[14px] text-emerald-800">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {!seller && (
        <section className="rounded-[24px] bg-[#F8F8F8] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
            <div>
              <h2 className="text-[28px] font-bold text-[#333]">
                Open your Treemiix store
              </h2>
              <p className="mt-3 max-w-[620px] text-[15px] leading-7 text-[#666]">
                Sell to customers across Treemiix. Fill in your business and
                store details, then our team will review your application.
              </p>

              <ul className="mt-6 space-y-3 text-[14px] text-[#555]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-emerald-600" />
                  Your own storefront with a unique link
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-emerald-600" />
                  Product management after approval
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-emerald-600" />
                  Orders and payouts handled in one place
                </li>
              </ul>

              <button
                type="button"
                onClick={handleStart}
                disabled={busy}
                className="mt-8 inline-flex h-[50px] items-center justify-center gap-2 rounded-[12px] bg-gradient-to-r from-[#FFDB5A] to-[#FF825A] px-8 text-[16px] font-medium text-white transition hover:-translate-y-0.5 disabled:opacity-60"
              >
                {busy && <Loader2 size={18} className="animate-spin" />}
                Become a seller
              </button>
            </div>

            <div className="rounded-[20px] border border-[#E5E7EB] bg-white p-6">
              <p className="text-[13px] font-medium uppercase tracking-wide text-[#888]">
                {plan?.name ?? "Professional"} plan
              </p>
              <p className="mt-3 text-[38px] font-bold leading-none text-[#333]">
                ${plan?.monthlyPrice?.toFixed(2) ?? "39.99"}
                <span className="text-[15px] font-normal text-[#777]">
                  {" "}
                  / month
                </span>
              </p>
              <p className="mt-3 text-[13px] leading-6 text-[#777]">
                Plus selling fees. Your subscription is activated after
                approval and renewed by the Treemiix team.
              </p>
              <div className="mt-5 flex items-center gap-2 rounded-[12px] bg-[#F3F5F9] p-3 text-[12px] text-[#555]">
                <Wallet size={16} className="text-[#49516D]" />
                No card is charged on this page.
              </div>
            </div>
          </div>
        </section>
      )}

      {seller && isEditable && (
        <section className="rounded-[24px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <div className="flex flex-wrap items-center gap-4 border-b border-[#EEF0F4] px-5 py-4 sm:px-8">
            {stepTitles.map((title, index) => (
              <StepPill
                key={title}
                number={index + 1}
                title={title}
                active={step === index + 1}
                done={step > index + 1}
              />
            ))}
          </div>

          <div className="p-5 sm:p-8">
            {seller.status === "Rejected" && seller.rejectionReason && (
              <div className="mb-6 rounded-[14px] border border-red-200 bg-red-50 p-4 text-[14px] text-red-700">
                <p className="font-semibold">Application rejected</p>
                <p className="mt-1">{seller.rejectionReason}</p>
                <p className="mt-1 text-[13px]">
                  Fix the details below and submit the application again.
                </p>
              </div>
            )}

            {step === 1 && (
              <form onSubmit={handleBusinessSubmit} className="space-y-4">
                <div>
                  <h2 className="text-[22px] font-semibold text-[#333]">
                    Business details
                  </h2>
                  <p className="mt-1 text-[14px] text-[#777]">
                    Tell us about the business behind your store.
                  </p>
                </div>

                <label className="block text-[14px] text-[#444]">
                  Business type
                  <select
                    value={business.businessType}
                    onChange={(event) =>
                      setBusiness((current) => ({
                        ...current,
                        businessType: event.target.value as SellerBusinessType,
                      }))
                    }
                    className="mt-1.5 h-[48px] w-full rounded-[10px] border border-[#D8DCE5] bg-white px-3 text-[15px] outline-none focus:border-[#7C9BC0]"
                  >
                    <option value="Individual">Individual</option>
                    <option value="SoleProprietor">Sole proprietor</option>
                    <option value="Company">Company</option>
                  </select>
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-[14px] text-[#444]">
                    Legal name
                    <input
                      value={business.legalName}
                      onChange={(event) =>
                        setBusiness((current) => ({
                          ...current,
                          legalName: event.target.value,
                        }))
                      }
                      required
                      minLength={2}
                      className="mt-1.5 h-[48px] w-full rounded-[10px] border border-[#D8DCE5] px-3 text-[15px] outline-none focus:border-[#7C9BC0]"
                    />
                  </label>

                  <label className="block text-[14px] text-[#444]">
                    Country
                    <input
                      value={business.country}
                      onChange={(event) =>
                        setBusiness((current) => ({
                          ...current,
                          country: event.target.value,
                        }))
                      }
                      required
                      minLength={2}
                      className="mt-1.5 h-[48px] w-full rounded-[10px] border border-[#D8DCE5] px-3 text-[15px] outline-none focus:border-[#7C9BC0]"
                    />
                  </label>
                </div>

                <label className="block text-[14px] text-[#444]">
                  Tax number
                  <input
                    value={business.taxNumber}
                    onChange={(event) =>
                      setBusiness((current) => ({
                        ...current,
                        taxNumber: event.target.value,
                      }))
                    }
                    required
                    minLength={2}
                    className="mt-1.5 h-[48px] w-full rounded-[10px] border border-[#D8DCE5] px-3 text-[15px] outline-none focus:border-[#7C9BC0]"
                  />
                </label>

                <label className="block text-[14px] text-[#444]">
                  Legal address
                  <textarea
                    value={business.legalAddress}
                    onChange={(event) =>
                      setBusiness((current) => ({
                        ...current,
                        legalAddress: event.target.value,
                      }))
                    }
                    required
                    minLength={5}
                    rows={3}
                    className="mt-1.5 w-full rounded-[10px] border border-[#D8DCE5] px-3 py-2.5 text-[15px] outline-none focus:border-[#7C9BC0]"
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-[14px] text-[#444]">
                    Support email
                    <input
                      type="email"
                      value={business.supportEmail}
                      onChange={(event) =>
                        setBusiness((current) => ({
                          ...current,
                          supportEmail: event.target.value,
                        }))
                      }
                      className="mt-1.5 h-[48px] w-full rounded-[10px] border border-[#D8DCE5] px-3 text-[15px] outline-none focus:border-[#7C9BC0]"
                    />
                  </label>

                  <label className="block text-[14px] text-[#444]">
                    Support phone
                    <input
                      value={business.supportPhone}
                      onChange={(event) =>
                        setBusiness((current) => ({
                          ...current,
                          supportPhone: event.target.value,
                        }))
                      }
                      className="mt-1.5 h-[48px] w-full rounded-[10px] border border-[#D8DCE5] px-3 text-[15px] outline-none focus:border-[#7C9BC0]"
                    />
                  </label>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={busy}
                    className="inline-flex h-[48px] items-center gap-2 rounded-[10px] bg-[#49516D] px-7 text-[15px] font-medium text-white disabled:opacity-60"
                  >
                    {busy && <Loader2 size={17} className="animate-spin" />}
                    Continue <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleStorefrontSubmit} className="space-y-4">
                <div>
                  <h2 className="text-[22px] font-semibold text-[#333]">
                    Storefront
                  </h2>
                  <p className="mt-1 text-[14px] text-[#777]">
                    This is what customers will see.
                  </p>
                </div>

                <label className="block text-[14px] text-[#444]">
                  Store name
                  <input
                    value={storefront.storeName}
                    onChange={(event) =>
                      handleStoreNameChange(event.target.value)
                    }
                    required
                    minLength={2}
                    className="mt-1.5 h-[48px] w-full rounded-[10px] border border-[#D8DCE5] px-3 text-[15px] outline-none focus:border-[#7C9BC0]"
                  />
                </label>

                <label className="block text-[14px] text-[#444]">
                  Store slug
                  <div className="mt-1.5 flex items-center rounded-[10px] border border-[#D8DCE5] bg-white focus-within:border-[#7C9BC0]">
                    <span className="pl-3 text-[14px] text-[#999]">
                      treemiix.com/seller/
                    </span>
                    <input
                      value={storefront.storeSlug}
                      onChange={(event) => {
                        setSlugTouched(true);
                        setStorefront((current) => ({
                          ...current,
                          storeSlug: slugify(event.target.value),
                        }));
                      }}
                      required
                      minLength={2}
                      className="h-[46px] min-w-0 flex-1 rounded-r-[10px] px-1 text-[15px] outline-none"
                    />
                  </div>
                  <span className="mt-1 block text-[12px] text-[#888]">
                    Lowercase letters, numbers and hyphens only.
                  </span>
                </label>

                <label className="block text-[14px] text-[#444]">
                  Logo URL
                  <input
                    value={storefront.logoUrl}
                    onChange={(event) =>
                      setStorefront((current) => ({
                        ...current,
                        logoUrl: event.target.value,
                      }))
                    }
                    placeholder="https://..."
                    className="mt-1.5 h-[48px] w-full rounded-[10px] border border-[#D8DCE5] px-3 text-[15px] outline-none focus:border-[#7C9BC0]"
                  />
                </label>

                <label className="block text-[14px] text-[#444]">
                  Description
                  <textarea
                    value={storefront.description}
                    onChange={(event) =>
                      setStorefront((current) => ({
                        ...current,
                        description: event.target.value,
                      }))
                    }
                    rows={4}
                    className="mt-1.5 w-full rounded-[10px] border border-[#D8DCE5] px-3 py-2.5 text-[15px] outline-none focus:border-[#7C9BC0]"
                  />
                </label>

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex h-[48px] items-center gap-2 rounded-[10px] border border-[#D8DCE5] px-6 text-[15px] text-[#555]"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={busy}
                    className="inline-flex h-[48px] items-center gap-2 rounded-[10px] bg-[#49516D] px-7 text-[15px] font-medium text-white disabled:opacity-60"
                  >
                    {busy && <Loader2 size={17} className="animate-spin" />}
                    Continue <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handlePayoutSubmit} className="space-y-4">
                <div>
                  <h2 className="text-[22px] font-semibold text-[#333]">
                    Payout details
                  </h2>
                  <p className="mt-1 text-[14px] text-[#777]">
                    Where should Treemiix send your sales payouts?
                  </p>
                </div>

                <label className="block text-[14px] text-[#444]">
                  Bank account
                  <input
                    value={payout.bankAccount}
                    onChange={(event) =>
                      setPayout({ bankAccount: event.target.value })
                    }
                    required
                    minLength={5}
                    placeholder="IBAN or account number"
                    className="mt-1.5 h-[48px] w-full rounded-[10px] border border-[#D8DCE5] px-3 text-[15px] outline-none focus:border-[#7C9BC0]"
                  />
                </label>

                <div className="rounded-[12px] bg-[#F3F5F9] p-4 text-[13px] leading-6 text-[#666]">
                  Payout details are visible only to you and the Treemiix
                  administration team. They are never shown on your public store
                  page.
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex h-[48px] items-center gap-2 rounded-[10px] border border-[#D8DCE5] px-6 text-[15px] text-[#555]"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={busy}
                    className="inline-flex h-[48px] items-center gap-2 rounded-[10px] bg-[#49516D] px-7 text-[15px] font-medium text-white disabled:opacity-60"
                  >
                    {busy && <Loader2 size={17} className="animate-spin" />}
                    Continue <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}

            {step === 4 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-[22px] font-semibold text-[#333]">
                    Review and submit
                  </h2>
                  <p className="mt-1 text-[14px] text-[#777]">
                    Check the details before sending your application.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[14px] border border-[#E5E7EB] p-4">
                    <p className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-[#888]">
                      Business
                    </p>
                    <p className="text-[14px] text-[#333]">
                      {business.legalName || "—"}
                    </p>
                    <p className="mt-1 text-[13px] text-[#777]">
                      {business.businessType} · {business.country || "—"}
                    </p>
                    <p className="mt-1 text-[13px] text-[#777]">
                      Tax number: {business.taxNumber || "—"}
                    </p>
                  </div>

                  <div className="rounded-[14px] border border-[#E5E7EB] p-4">
                    <p className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-[#888]">
                      Storefront
                    </p>
                    <p className="text-[14px] text-[#333]">
                      {storefront.storeName || "—"}
                    </p>
                    <p className="mt-1 text-[13px] text-[#777]">
                      /seller/{storefront.storeSlug || "—"}
                    </p>
                    <p className="mt-1 line-clamp-2 text-[13px] text-[#777]">
                      {storefront.description || "No description"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex h-[46px] items-center gap-2 rounded-[10px] border border-[#D8DCE5] px-5 text-[14px] text-[#555]"
                  >
                    <ArrowLeft size={15} /> Edit details
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmitApplication}
                    disabled={busy}
                    className="inline-flex h-[46px] items-center gap-2 rounded-[10px] bg-gradient-to-r from-[#FFDB5A] to-[#FF825A] px-7 text-[15px] font-medium text-white disabled:opacity-60"
                  >
                    {busy && <Loader2 size={17} className="animate-spin" />}
                    Submit application
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {seller?.status === "PendingVerification" && (
        <section className="rounded-[24px] bg-[#F8F8F8] p-6 text-center shadow-[0_2px_8px_rgba(0,0,0,0.08)] sm:p-10">
          <Clock3 className="mx-auto mb-4 h-12 w-12 text-amber-500" />
          <h2 className="text-[26px] font-bold text-[#333]">
            Your application is under review
          </h2>
          <p className="mx-auto mt-3 max-w-[620px] text-[15px] leading-7 text-[#666]">
            We received your application for <b>{seller.storeName}</b>. The
            Treemiix team will review it and activate your store. This page
            refreshes automatically.
          </p>
          <div className="mt-4 text-[13px] text-[#888]">
            Submitted {formatDate(seller.submittedAt)}
          </div>
          <button
            type="button"
            onClick={handleRefresh}
            disabled={busy}
            className="mt-6 inline-flex h-[46px] items-center gap-2 rounded-[10px] border border-[#D8DCE5] bg-white px-6 text-[14px] font-medium text-[#49516D] disabled:opacity-60"
          >
            <RefreshCw size={16} className={busy ? "animate-spin" : ""} />
            Refresh status
          </button>
        </section>
      )}

      {seller?.status === "Active" && (
        <div className="space-y-6">
          <section className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-[24px] bg-[#F8F8F8] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[16px] bg-white text-[#49516D] shadow-sm">
                  <Store size={28} />
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-[26px] font-bold text-[#333]">
                    {seller.storeName}
                  </h2>
                  {seller.status === "Active" && (
                    <Link
                      href={`/seller/${seller.id}`}
                      className="mt-1 inline-block text-[14px] font-medium text-[#496B94] hover:underline"
                    >
                      View store
                    </Link>
                  )}
                  <p className="mt-3 line-clamp-2 text-[14px] leading-6 text-[#666]">
                    {seller.description || "No store description yet."}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[14px] bg-white p-4">
                  <p className="text-[12px] text-[#888]">Rating</p>
                  <p className="mt-1 text-[20px] font-semibold text-[#333]">
                    {seller.rating.toFixed(1)}
                  </p>
                </div>
                <div className="rounded-[14px] bg-white p-4">
                  <p className="text-[12px] text-[#888]">Commission</p>
                  <p className="mt-1 text-[20px] font-semibold text-[#333]">
                    {(seller.commissionRate * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="rounded-[14px] bg-white p-4">
                  <p className="text-[12px] text-[#888]">Approved</p>
                  <p className="mt-1 text-[20px] font-semibold text-[#333]">
                    {formatDate(seller.approvedAt)}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
              <p className="text-[13px] font-semibold uppercase tracking-wide text-[#888]">
                Subscription
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    seller.canSell ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                />
                <span className="text-[15px] font-medium text-[#333]">
                  {seller.canSell ? "Active" : "Payment required"}
                </span>
              </div>
              <p className="mt-3 text-[13px] leading-6 text-[#777]">
                {seller.subscriptionPaidUntil
                  ? `Paid until ${formatDate(seller.subscriptionPaidUntil)}.`
                  : "The subscription period has not been set yet."}
              </p>
              {!seller.canSell && (
                <p className="mt-3 rounded-[10px] bg-amber-50 p-3 text-[12px] leading-5 text-amber-800">
                  You can view your store, but new products are blocked until
                  the Treemiix team marks the subscription as paid.
                </p>
              )}
              <button
                type="button"
                onClick={handleRefresh}
                disabled={busy}
                className="mt-5 inline-flex h-[42px] items-center gap-2 rounded-[10px] border border-[#D8DCE5] px-4 text-[13px] font-medium text-[#49516D] disabled:opacity-60"
              >
                <RefreshCw size={15} className={busy ? "animate-spin" : ""} />
                Refresh
              </button>
            </div>
          </section>

          <section className="rounded-[24px] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] sm:p-8">
            <div className="mb-5 flex items-center gap-2">
              <Package size={20} className="text-[#49516D]" />
              <h2 className="text-[20px] font-semibold text-[#333]">
                Products
              </h2>
            </div>

            {seller.canSell ? (
              <form
                id="seller-product-form"
                onSubmit={handleSaveProduct}
                className="mb-7 grid scroll-mt-6 gap-3 rounded-[16px] bg-[#F8F8F8] p-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {editingProduct && (
                  <p className="text-[14px] font-medium text-[#49516D] sm:col-span-2 lg:col-span-3">
                    Editing: {editingProduct.name}
                  </p>
                )}
                <input
                  value={productForm.name}
                  onChange={(event) =>
                    setProductForm((current) => ({
                      ...current,
                      name: event.target.value,
                      slug: slugify(event.target.value),
                    }))
                  }
                  required
                  placeholder="Product name"
                  className="h-[44px] rounded-[10px] border border-[#D8DCE5] bg-white px-3 text-[14px] outline-none focus:border-[#7C9BC0]"
                />
                <input
                  value={productForm.slug}
                  onChange={(event) =>
                    setProductForm((current) => ({
                      ...current,
                      slug: slugify(event.target.value),
                    }))
                  }
                  required
                  placeholder="product-slug"
                  className="h-[44px] rounded-[10px] border border-[#D8DCE5] bg-white px-3 text-[14px] outline-none focus:border-[#7C9BC0]"
                />
                <select
                  value={productForm.categoryId}
                  onChange={(event) =>
                    setProductForm((current) => ({
                      ...current,
                      categoryId: event.target.value,
                    }))
                  }
                  required
                  className="h-[44px] rounded-[10px] border border-[#D8DCE5] bg-white px-3 text-[14px] outline-none focus:border-[#7C9BC0]"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={productForm.price || ""}
                  onChange={(event) =>
                    setProductForm((current) => ({
                      ...current,
                      price: Number(event.target.value),
                    }))
                  }
                  required
                  placeholder="Price"
                  className="h-[44px] rounded-[10px] border border-[#D8DCE5] bg-white px-3 text-[14px] outline-none focus:border-[#7C9BC0]"
                />
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={productForm.oldCost ?? ""}
                  onChange={(event) =>
                    setProductForm((current) => ({
                      ...current,
                      oldCost:
                        event.target.value === ""
                          ? null
                          : Number(event.target.value),
                    }))
                  }
                  placeholder="Old price (optional, for a deal)"
                  className="h-[44px] rounded-[10px] border border-[#D8DCE5] bg-white px-3 text-[14px] outline-none focus:border-[#7C9BC0]"
                />
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={productForm.stock || ""}
                  onChange={(event) =>
                    setProductForm((current) => ({
                      ...current,
                      stock: Number(event.target.value),
                    }))
                  }
                  required
                  placeholder="Stock"
                  className="h-[44px] rounded-[10px] border border-[#D8DCE5] bg-white px-3 text-[14px] outline-none focus:border-[#7C9BC0]"
                />
                <input
                  value={productForm.description}
                  onChange={(event) =>
                    setProductForm((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  required
                  placeholder="Description"
                  className="h-[44px] rounded-[10px] border border-[#D8DCE5] bg-white px-3 text-[14px] outline-none focus:border-[#7C9BC0]"
                />
                <div className="sm:col-span-2 lg:col-span-3">
                  <ProductMediaFields
                    images={productForm.images}
                    onChange={(images) =>
                      setProductForm((current) => ({ ...current, images }))
                    }
                  />
                  {productForm.images.length === 0 && (
                    <p className="mt-2 text-[12px] text-amber-700">
                      Products without a photo are not shown on the site.
                    </p>
                  )}
                </div>
                <div className="flex gap-3 sm:col-span-2 lg:col-span-1 lg:col-start-3">
                  {editingProduct && (
                    <button
                      type="button"
                      onClick={resetProductForm}
                      disabled={busy}
                      className="inline-flex h-[44px] flex-1 items-center justify-center rounded-[10px] border border-[#D8DCE5] bg-white px-4 text-[14px] font-medium text-[#49516D] disabled:opacity-60"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={busy}
                    className="inline-flex h-[44px] flex-1 items-center justify-center rounded-[10px] bg-[#49516D] px-5 text-[14px] font-medium text-white disabled:opacity-60"
                  >
                    {editingProduct ? "Save changes" : "Add product"}
                  </button>
                </div>
              </form>
            ) : (
              <p className="mb-5 rounded-[12px] bg-amber-50 p-4 text-[13px] text-amber-800">
                Product creation is disabled until the subscription is active.
              </p>
            )}

            {products.length === 0 ? (
              <div className="rounded-[14px] border border-dashed border-[#D8DCE5] p-8 text-center text-[14px] text-[#888]">
                No products yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[14px]">
                  <thead>
                    <tr className="border-b border-[#EEF0F4] text-[12px] uppercase tracking-wide text-[#888]">
                      <th className="px-3 py-3">Product</th>
                      <th className="px-3 py-3">Price</th>
                      <th className="px-3 py-3">Stock</th>
                      <th className="px-3 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F2F5]">
                    {products.map((product) => {
                      const mainImage = productImagePaths(product)[0];
                      return (
                      <tr key={product.id}>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-[#EEF0F4] bg-white">
                              {mainImage ? (
                                <Image
                                  src={mainImage}
                                  alt={product.name}
                                  width={48}
                                  height={48}
                                  className="h-full w-full object-contain"
                                />
                              ) : (
                                <ImageOff size={18} className="text-[#BBB]" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-[#333]">
                                {product.name}
                              </p>
                              <p className="text-[12px] text-[#888]">
                                {product.slug}
                              </p>
                              {!mainImage && (
                                <span className="mt-1 inline-block rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700">
                                  No photo — not shown on the site
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-[#555]">
                          ${Number(product.price).toFixed(2)}
                          {product.oldCost != null &&
                            Number(product.oldCost) > Number(product.price) && (
                              <span className="ml-1 text-[12px] text-[#999] line-through">
                                ${Number(product.oldCost).toFixed(2)}
                              </span>
                            )}
                        </td>
                        <td className="px-3 py-3 text-[#555]">
                          {product.stock}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-right">
                          <button
                            type="button"
                            onClick={() => handleEditProduct(product)}
                            disabled={busy || !seller.canSell}
                            title={
                              seller.canSell
                                ? "Edit product"
                                : "Subscription must be active"
                            }
                            className="mr-2 inline-flex h-[34px] items-center gap-1 rounded-[8px] bg-[#EEF1F7] px-3 text-[12px] font-medium text-[#49516D] disabled:opacity-50"
                          >
                            <Pencil size={13} /> Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(product.id)}
                            disabled={busy || !seller.canSell}
                            title={
                              seller.canSell
                                ? "Delete product"
                                : "Subscription must be active"
                            }
                            className="inline-flex h-[34px] items-center gap-1 rounded-[8px] bg-red-50 px-3 text-[12px] font-medium text-red-600 disabled:opacity-50"
                          >
                            <Trash2 size={13} /> Delete
                          </button>
                        </td>
                      </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      )}

      {(seller?.status === "Suspended" || seller?.status === "Inactive") && (
        <section className="rounded-[24px] bg-[#F8F8F8] p-6 text-center shadow-[0_2px_8px_rgba(0,0,0,0.08)] sm:p-10">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
          <h2 className="text-[26px] font-bold text-[#333]">
            Your seller account is {statusLabels[seller.status].toLowerCase()}
          </h2>
          <p className="mx-auto mt-3 max-w-[620px] text-[15px] leading-7 text-[#666]">
            {seller.status === "Inactive"
              ? "The subscription is not active. Contact Treemiix support to renew it."
              : "This store has been suspended. Contact Treemiix support for details."}
          </p>
          <button
            type="button"
            onClick={handleRefresh}
            disabled={busy}
            className="mt-6 inline-flex h-[46px] items-center gap-2 rounded-[10px] border border-[#D8DCE5] bg-white px-6 text-[14px] font-medium text-[#49516D] disabled:opacity-60"
          >
            <RefreshCw size={16} className={busy ? "animate-spin" : ""} />
            Refresh status
          </button>
        </section>
      )}
    </div>
  );
}
