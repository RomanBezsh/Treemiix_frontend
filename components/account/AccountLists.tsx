"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import LoadError from "@/components/common/LoadError";
import { addToCart } from "@/lib/cart";
import { isSignedIn, loadWishlist, removeFromWishlist, type WishlistItem } from "@/lib/wishlist";

const PLACEHOLDER = "/account/lists/product-placeholder.png";

// The session only changes on sign-in/out, which navigates away, so there is nothing to subscribe to.
const subscribeToNothing = () => () => {};

type RowState = { adding?: boolean; added?: boolean; error?: string };

const formatPrice = (value: number) => `$${value.toFixed(2)}`;
const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

/** "Your Lists" page: the signed-in user's wishlist with real products. */
export default function AccountLists() {
  const router = useRouter();
  const signedIn = useSyncExternalStore(subscribeToNothing, isSignedIn, () => false);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [rows, setRows] = useState<Record<string, RowState>>({});
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!signedIn) return;
    let cancelled = false;
    (async () => {
      try {
        const list = await loadWishlist();
        if (cancelled) return;
        setItems(list);
        setStatus("ready");
      } catch (error) {
        console.warn("Failed to load the wishlist", error);
        if (!cancelled) setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [signedIn, reloadKey]);

  const setRow = (productId: string, state: RowState) =>
    setRows((current) => ({ ...current, [productId]: state }));

  const handleAddToCart = async (productId: string) => {
    setRow(productId, { adding: true });
    const result = await addToCart(productId, 1);
    if (result.ok) {
      setRow(productId, { added: true });
    } else if (result.reason === "auth") {
      router.push("/auth");
    } else {
      setRow(productId, { error: result.message });
    }
  };

  const handleRemove = async (productId: string) => {
    const result = await removeFromWishlist(productId);
    if (result.status === "auth") {
      router.push("/auth");
      return;
    }
    if (result.status === "error") {
      setRow(productId, { error: result.message });
      return;
    }
    setItems((current) => current.filter((item) => item.productId !== productId));
  };

  const title = (
    <h1 className="mb-[18px] text-[28px] font-medium leading-[130%] text-[#333333]">Your Lists</h1>
  );

  if (!signedIn) {
    return (
      <section className="w-full">
        {title}
        <div className="flex flex-col items-center rounded-[16px] bg-[#F8F8F8] px-[20px] py-[40px] text-center">
          <p className="text-[20px] font-medium text-[#333333]">Sign in to see your list</p>
          <p className="mt-[8px] text-[14px] text-[#555555]">Products you save with the heart button appear here.</p>
          <Link
            href="/auth"
            className="mt-[20px] flex h-[44px] items-center justify-center rounded-[12px] bg-[linear-gradient(90deg,#FFDB5A_0%,#FF825A_100%)] px-[26px] text-[16px] font-medium text-white transition hover:-translate-y-0.5"
          >
            Sign in
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="flex flex-wrap items-baseline justify-between gap-x-[16px]">
        {title}
        {status === "ready" && items.length > 0 && (
          <p className="mb-[18px] text-[14px] text-[#828282]">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
        )}
      </div>

      {status === "loading" && (
        <div className="flex min-h-[160px] items-center justify-center rounded-[16px] bg-[#F8F8F8] text-[16px] text-[#555555]">
          Loading your list...
        </div>
      )}

      {status === "error" && (
        <LoadError
          what="your list"
          onRetry={() => {
            setStatus("loading");
            setReloadKey((key) => key + 1);
          }}
        />
      )}

      {status === "ready" && items.length === 0 && (
        <div className="flex flex-col items-center rounded-[16px] bg-[#F8F8F8] px-[20px] py-[40px] text-center">
          <p className="text-[20px] font-medium text-[#333333]">Your list is empty</p>
          <p className="mt-[8px] text-[14px] text-[#555555]">
            Tap the heart on any product to save it here.
          </p>
          <Link
            href="/catalog"
            className="mt-[20px] flex h-[44px] items-center justify-center rounded-[12px] bg-[linear-gradient(90deg,#FFDB5A_0%,#FF825A_100%)] px-[26px] text-[16px] font-medium text-white transition hover:-translate-y-0.5"
          >
            Browse products
          </Link>
        </div>
      )}

      {status === "ready" && items.length > 0 && (
        <ul className="flex flex-col gap-[12px]">
          {items.map((item) => {
            const product = item.product;
            const row = rows[item.productId] || {};
            const inStock = (product?.stock ?? 0) > 0;
            const href = `/product/${item.productId}`;

            return (
              <li
                key={item.productId}
                className="flex flex-col gap-[14px] rounded-[16px] bg-[#F8F8F8] p-[14px] shadow-[0_2px_5px_rgba(0,0,0,0.06)] sm:flex-row sm:items-center sm:gap-[18px] sm:p-[16px]"
              >
                <div className="flex min-w-0 flex-1 items-center gap-[14px]">
                  {/* Image */}
                  <div className="flex h-[88px] w-[88px] shrink-0 items-center justify-center overflow-hidden rounded-[12px] bg-white">
                    {item.available ? (
                      <Link href={href} aria-label={product?.name}>
                        <Image
                          src={product?.imageUrl || PLACEHOLDER}
                          alt=""
                          width={88}
                          height={88}
                          className="max-h-[88px] w-auto object-contain"
                        />
                      </Link>
                    ) : (
                      <Image
                        src={product?.imageUrl || PLACEHOLDER}
                        alt=""
                        width={88}
                        height={88}
                        className="max-h-[88px] w-auto object-contain opacity-50 grayscale"
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div className="min-w-0">
                    {item.available ? (
                      <Link href={href} className="line-clamp-2 text-[16px] font-medium text-[#333333] hover:text-[#496B94]">
                        {product?.name}
                      </Link>
                    ) : (
                      <p className="line-clamp-2 text-[16px] font-medium text-[#828282]">
                        {product?.name || "Removed product"}
                      </p>
                    )}
                    {product?.storeName && (
                      <p className="mt-[2px] text-[13px] text-[#828282]">{product.storeName}</p>
                    )}

                    {item.available ? (
                      <div className="mt-[6px] flex flex-wrap items-baseline gap-x-[10px] gap-y-[2px]">
                        <span className="text-[18px] text-[#DE3A3A]">{formatPrice(product!.price)}</span>
                        {product?.oldCost && product.oldCost > product.price && (
                          <span className="text-[13px] text-[#828282] line-through">{formatPrice(product.oldCost)}</span>
                        )}
                        <span className={`text-[13px] ${inStock ? "text-[#7C9BC0]" : "text-[#828282]"}`}>
                          {inStock ? "In stock" : "Out of stock"}
                        </span>
                      </div>
                    ) : (
                      <p className="mt-[6px] text-[14px] font-medium text-amber-700">No longer available</p>
                    )}

                    <p className="mt-[4px] text-[12px] text-[#828282]">Added {formatDate(item.addedAt)}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 flex-col gap-[8px] sm:w-[180px]">
                  {item.available && inStock && (
                    row.added ? (
                      <Link
                        href="/cart"
                        className="flex h-[40px] items-center justify-center rounded-[20px] border-2 border-[#7C9BC0] px-[16px] text-[14px] font-medium text-[#496B94]"
                      >
                        Added · Go to cart
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleAddToCart(item.productId)}
                        disabled={row.adding}
                        className="flex h-[40px] items-center justify-center rounded-[20px] bg-[linear-gradient(144.29deg,#FFDB5A_-0.18%,#FF825A_101.85%)] px-[16px] text-[14px] font-medium text-white shadow-[0_2px_4px_#00000033] transition hover:-translate-y-[1px] active:translate-y-0 disabled:opacity-60"
                      >
                        {row.adding ? "Adding..." : "Add to cart"}
                      </button>
                    )
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemove(item.productId)}
                    className="flex h-[40px] items-center justify-center rounded-[20px] border-2 border-[#EFEFEF] px-[16px] text-[14px] text-[#555555] transition hover:border-[#DE3A3A] hover:text-[#DE3A3A]"
                  >
                    Remove
                  </button>
                  {row.error && (
                    <p role="alert" className="text-[12px] text-red-700">
                      {row.error}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
