"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import {
  createAddress,
  formatAddress,
  getDraft,
  loadAddresses,
  saveDraft,
  SignInRequiredError,
  type CheckoutCart,
  type NewAddress,
  type UserAddress,
} from "@/lib/checkout";

const EMPTY_ADDRESS: NewAddress = {
  country: "Ukraine",
  city: "",
  street: "",
  building: "",
  apartment: "",
  postalCode: "",
  isDefault: true,
};

// Same rule as the backend's [Phone]: digits with optional +, spaces, dashes and brackets
const PHONE_PATTERN = /^\+?[0-9\s\-()]{7,20}$/;

const INPUT =
  "h-[44px] w-full rounded-[10px] border border-[#D9D9D9] bg-white px-[12px] text-[15px] text-[#333333] outline-none focus:border-[#7C9BC0]";
const LABEL = "mb-[4px] block text-[13px] font-medium text-[#555555]";

/** Step 1: delivery address (saved addresses or a new one) and the receiver. */
export default function ShippingAddressForm({ cart }: { cart: CheckoutCart }) {
  const router = useRouter();
  const [draft] = useState(getDraft);
  const [addresses, setAddresses] = useState<UserAddress[] | null>(null);
  const [selectedId, setSelectedId] = useState<string | undefined>(draft.addressId);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<NewAddress>(EMPTY_ADDRESS);
  const [receiverName, setReceiverName] = useState(
    () =>
      draft.receiverName ||
      [localStorage.getItem("userFirstName"), localStorage.getItem("userLastName")].filter(Boolean).join(" "),
  );
  const [receiverPhone, setReceiverPhone] = useState(draft.receiverPhone || "");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await loadAddresses();
        if (cancelled) return;
        setAddresses(list);
        if (list.length === 0) {
          setShowForm(true);
        } else {
          setSelectedId((current) =>
            current && list.some((a) => a.id === current)
              ? current
              : (list.find((a) => a.isDefault) || list[0]).id,
          );
        }
      } catch (loadError) {
        if (cancelled) return;
        if (loadError instanceof SignInRequiredError) {
          router.push("/auth");
          return;
        }
        // Addresses are optional here: the user can still enter a new one
        setAddresses([]);
        setShowForm(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  const setField = (field: keyof NewAddress, value: string) => setForm((current) => ({ ...current, [field]: value }));

  const handleContinue = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (receiverName.trim().length < 2) {
      setError("Enter the receiver's name (at least 2 characters).");
      return;
    }
    if (!PHONE_PATTERN.test(receiverPhone.trim())) {
      setError("Enter a valid phone number, e.g. +380 50 123 45 67.");
      return;
    }

    let address = addresses?.find((a) => a.id === selectedId);
    if (showForm) {
      if (form.city.trim().length < 2 || form.street.trim().length < 2 || !form.building.trim()) {
        setError("Fill in the city, street and building of the new address.");
        return;
      }
      setSaving(true);
      try {
        address = await createAddress({
          ...form,
          apartment: form.apartment?.trim() || null,
          postalCode: form.postalCode?.trim() || null,
          isDefault: (addresses?.length ?? 0) === 0,
        });
      } catch (saveError) {
        setSaving(false);
        if (saveError instanceof SignInRequiredError) {
          router.push("/auth");
          return;
        }
        setError(saveError instanceof Error ? saveError.message : "Couldn't save the address.");
        return;
      }
    }

    if (!address) {
      setError("Choose a delivery address.");
      return;
    }

    saveDraft({
      addressId: address.id,
      shippingAddress: formatAddress(address),
      receiverName: receiverName.trim(),
      receiverPhone: receiverPhone.trim(),
    });
    router.push("/checkout/payment-method");
  };

  return (
    <form
      onSubmit={handleContinue}
      className="grid grid-cols-1 gap-[24px] lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-[32px]"
    >
      <div className="flex flex-col gap-[20px]">
        {/* Address */}
        <section className="rounded-[16px] bg-[#F8F8F8] p-[18px] shadow-[0_2px_5px_rgba(0,0,0,0.06)] sm:p-[22px]">
          <h2 className="text-[20px] font-medium text-[#333333]">Delivery address</h2>

          {addresses === null ? (
            <p className="mt-[12px] text-[14px] text-[#555555]">Loading your addresses...</p>
          ) : (
            <>
              {addresses.length > 0 && (
                <fieldset className="mt-[12px] flex flex-col gap-[8px]">
                  <legend className="sr-only">Saved addresses</legend>
                  {addresses.map((address) => (
                    <label
                      key={address.id}
                      className={`flex cursor-pointer items-start gap-[10px] rounded-[12px] border-2 bg-white px-[14px] py-[12px] text-[15px] text-[#333333] ${
                        !showForm && selectedId === address.id ? "border-[#7C9BC0]" : "border-transparent"
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        checked={!showForm && selectedId === address.id}
                        onChange={() => {
                          setSelectedId(address.id);
                          setShowForm(false);
                        }}
                        className="mt-[4px] h-[16px] w-[16px] accent-[#7C9BC0]"
                      />
                      <span>
                        {formatAddress(address)}
                        {address.isDefault && <span className="ml-[8px] text-[12px] text-[#828282]">Default</span>}
                      </span>
                    </label>
                  ))}
                </fieldset>
              )}

              {addresses.length > 0 && !showForm && (
                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className="mt-[12px] text-[15px] font-medium text-[#496B94] hover:underline"
                >
                  + Add a new address
                </button>
              )}

              {showForm && (
                <div className="mt-[14px] grid grid-cols-1 gap-[12px] sm:grid-cols-2">
                  <p className="text-[14px] text-[#555555] sm:col-span-2">
                    {addresses.length === 0 ? "You have no saved addresses yet. Add one:" : "New address:"}
                  </p>
                  <div>
                    <label htmlFor="addr-country" className={LABEL}>Country</label>
                    <input id="addr-country" className={INPUT} value={form.country} onChange={(e) => setField("country", e.target.value)} required minLength={2} />
                  </div>
                  <div>
                    <label htmlFor="addr-city" className={LABEL}>City</label>
                    <input id="addr-city" className={INPUT} value={form.city} onChange={(e) => setField("city", e.target.value)} required minLength={2} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="addr-street" className={LABEL}>Street</label>
                    <input id="addr-street" className={INPUT} value={form.street} onChange={(e) => setField("street", e.target.value)} required minLength={2} />
                  </div>
                  <div>
                    <label htmlFor="addr-building" className={LABEL}>Building</label>
                    <input id="addr-building" className={INPUT} value={form.building} onChange={(e) => setField("building", e.target.value)} required maxLength={20} />
                  </div>
                  <div>
                    <label htmlFor="addr-apartment" className={LABEL}>Apartment (optional)</label>
                    <input id="addr-apartment" className={INPUT} value={form.apartment ?? ""} onChange={(e) => setField("apartment", e.target.value)} maxLength={20} />
                  </div>
                  <div>
                    <label htmlFor="addr-postal" className={LABEL}>Postal code (optional)</label>
                    <input id="addr-postal" className={INPUT} value={form.postalCode ?? ""} onChange={(e) => setField("postalCode", e.target.value)} maxLength={20} />
                  </div>
                  {addresses.length > 0 && (
                    <div className="flex items-end">
                      <button type="button" onClick={() => setShowForm(false)} className="text-[15px] text-[#496B94] hover:underline">
                        Use a saved address
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </section>

        {/* Receiver */}
        <section className="rounded-[16px] bg-[#F8F8F8] p-[18px] shadow-[0_2px_5px_rgba(0,0,0,0.06)] sm:p-[22px]">
          <h2 className="text-[20px] font-medium text-[#333333]">Receiver</h2>
          <div className="mt-[12px] grid grid-cols-1 gap-[12px] sm:grid-cols-2">
            <div>
              <label htmlFor="receiver-name" className={LABEL}>Full name</label>
              <input id="receiver-name" className={INPUT} value={receiverName} onChange={(e) => setReceiverName(e.target.value)} required minLength={2} maxLength={100} autoComplete="name" />
            </div>
            <div>
              <label htmlFor="receiver-phone" className={LABEL}>Phone</label>
              <input id="receiver-phone" type="tel" className={INPUT} value={receiverPhone} onChange={(e) => setReceiverPhone(e.target.value)} required placeholder="+380 50 123 45 67" autoComplete="tel" />
            </div>
          </div>
        </section>

        {error && (
          <p role="alert" className="rounded-[10px] border border-red-200 bg-red-50 px-[14px] py-[10px] text-[14px] text-red-700">
            {error}
          </p>
        )}
      </div>

      <CheckoutSummary cart={cart}>
        <button
          type="submit"
          disabled={saving || addresses === null}
          className="flex min-h-[48px] w-full items-center justify-center rounded-[20px] bg-[#7C9BC0] px-[24px] text-[18px] font-medium text-white shadow-[0_2px_4px_rgba(0,0,0,0.15)] transition hover:-translate-y-[1px] hover:bg-[#6D8FB7] active:translate-y-0 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Continue to payment"}
        </button>
      </CheckoutSummary>
    </form>
  );
}
