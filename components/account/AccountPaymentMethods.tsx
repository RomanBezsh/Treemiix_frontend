"use client";

import { useState } from "react";

type PaymentForm = {
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
  isDefault: boolean;
};

const initialForm: PaymentForm = {
  cardNumber: "",
  expirationDate: "",
  securityCode: "",
  isDefault: false,
};

export default function AccountPaymentMethods() {
  const [mode, setMode] = useState<"empty" | "form" | "saved">("empty");
  const [form, setForm] = useState<PaymentForm>(initialForm);

  const updateField = <K extends keyof PaymentForm>(
    field: K,
    value: PaymentForm[K],
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setMode("saved");
  };

  return (
    <section className="w-full">
      {/* Title */}
      <h1 className="mb-[18px] text-[28px] font-medium leading-[130%] text-[#333333]">
        {mode === "form" ? "Add Payment Method" : "Payment Methods"}
      </h1>

      {/* Empty state */}
      {mode === "empty" && (
        <div className="relative min-h-[180px] rounded-[20px] bg-[#F8F8F8] px-[44px] py-[42px] shadow-[0_2px_5px_rgba(0,0,0,0.08)]">
          <p className="max-w-[900px] text-[14px] font-normal leading-[150%] text-[#333333]">
            You currently don&apos;t have any saved payment methods. Add a
            method here to be prefilled for quicker checkout.
          </p>

          <button
            type="button"
            onClick={() => setMode("form")}
            className="absolute bottom-[24px] right-[40px] flex h-[44px] min-w-[220px] items-center justify-center rounded-[22px] bg-[#7C9BC0] px-[28px] text-[14px] font-medium text-white"
          >
            Add Payment Methods
          </button>
        </div>
      )}

      {/* Add payment form */}
      {mode === "form" && (
        <div className="min-h-[420px] rounded-[20px] bg-[#F8F8F8] px-[44px] pb-[36px] pt-[40px] shadow-[0_2px_5px_rgba(0,0,0,0.08)]">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSave();
            }}
            className="flex h-full flex-col"
          >
            {/* Card number */}
            <label className="flex w-full max-w-[280px] flex-col gap-[7px]">
              <span className="text-[12px] font-normal text-[#333333]">
                Card Number
              </span>

              <input
                type="text"
                value={form.cardNumber}
                onChange={(event) =>
                  updateField("cardNumber", event.target.value)
                }
                className="h-[40px] rounded-[8px] bg-[#EEEEEE] px-[12px] text-[13px] text-[#333333] outline-none"
              />
            </label>

            {/* Expiration */}
            <label className="mt-[18px] flex w-full max-w-[280px] flex-col gap-[7px]">
              <span className="text-[12px] font-normal text-[#333333]">
                Expiration Date
              </span>

              <input
                type="text"
                placeholder="MM/YY"
                value={form.expirationDate}
                onChange={(event) =>
                  updateField("expirationDate", event.target.value)
                }
                className="h-[40px] rounded-[8px] bg-[#EEEEEE] px-[12px] text-[13px] text-[#333333] outline-none placeholder:text-[#999999]"
              />
            </label>

            {/* Security code */}
            <label className="mt-[18px] flex w-full max-w-[280px] flex-col gap-[7px]">
              <span className="text-[12px] font-normal text-[#333333]">
                Security Code
              </span>

              <input
                type="text"
                placeholder="XXX"
                value={form.securityCode}
                onChange={(event) =>
                  updateField("securityCode", event.target.value)
                }
                className="h-[40px] rounded-[8px] bg-[#EEEEEE] px-[12px] text-[13px] text-[#333333] outline-none placeholder:text-[#999999]"
              />
            </label>

            {/* Default payment */}
            <label className="mt-[18px] flex items-center gap-[10px]">
              <input
                type="checkbox"
                checked={form.isDefault}
                onChange={(event) =>
                  updateField("isDefault", event.target.checked)
                }
                className="h-[16px] w-[16px]"
              />

              <span className="text-[12px] font-normal text-[#333333]">
                Set as default payment method
              </span>
            </label>

            {/* Save */}
            <div className="mt-auto flex justify-end pt-[40px]">
              <button
                type="submit"
                className="flex h-[44px] min-w-[120px] items-center justify-center rounded-[22px] bg-[#7C9BC0] px-[28px] text-[14px] font-medium text-white"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Saved payment method */}
      {mode === "saved" && (
        <div className="relative min-h-[260px] rounded-[20px] bg-[#F8F8F8] px-[44px] py-[40px] shadow-[0_2px_5px_rgba(0,0,0,0.08)]">
          <h2 className="text-[14px] font-medium leading-[130%] text-[#333333]">
            Default Payment Method
          </h2>

          <div className="mt-[10px] text-[12px] font-normal leading-[150%] text-[#777777]">
            <p>Peter Marzo</p>
            <p>Credit Card Visa (2949)</p>
            <p>Exp 10/2025</p>
          </div>

          <button
            type="button"
            onClick={() => setMode("form")}
            className="absolute left-[280px] top-[62px] flex h-[30px] min-w-[80px] items-center justify-center rounded-[15px] border border-[#D3D3D3] bg-white px-[18px] text-[11px] font-normal text-[#555555]"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => {
              setForm(initialForm);
              setMode("form");
            }}
            className="absolute bottom-[38px] right-[44px] flex h-[44px] min-w-[220px] items-center justify-center rounded-[22px] bg-[#7C9BC0] px-[28px] text-[14px] font-medium text-white"
          >
            Add Payment Methods
          </button>
        </div>
      )}
    </section>
  );
}