"use client";

import { useState } from "react";

type AddressForm = {
  firstName: string;
  lastName: string;
  street: string;
  apartment: string;
  city: string;
  zip: string;
  country: string;
  state: string;
  phone: string;
};

const initialForm: AddressForm = {
  firstName: "Peter",
  lastName: "Marzo",
  street: "Leverson",
  apartment: "Apt / Suite / Building",
  city: "",
  zip: "",
  country: "",
  state: "",
  phone: "976640278",
};

export default function AccountAddresses() {
  const [mode, setMode] = useState<"empty" | "form" | "saved">("empty");

  const [form, setForm] = useState<AddressForm>(initialForm);

  const handleChange = (
    field: keyof AddressForm,
    value: string,
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
        Delivery Addresses
      </h1>

      {/* Empty state */}
      {mode === "empty" && (
        <div className="relative min-h-[170px] rounded-[20px] bg-[#F8F8F8] px-[44px] py-[40px] shadow-[0_2px_5px_rgba(0,0,0,0.08)]">
          <p className="max-w-[900px] text-[14px] font-normal leading-[150%] text-[#333333]">
            You currently don&apos;t have any saved delivery addresses. Add an
            address here to be prefilled for quicker checkout.
          </p>

          <button
            type="button"
            onClick={() => setMode("form")}
            className="absolute bottom-[24px] right-[40px] flex h-[44px] min-w-[150px] items-center justify-center rounded-[22px] bg-[#7C9BC0] px-[28px] text-[14px] font-medium text-white"
          >
            Add Address
          </button>
        </div>
      )}

      {/* Address form */}
      {mode === "form" && (
        <div className="min-h-[540px] rounded-[20px] bg-[#F8F8F8] px-[44px] pb-[36px] pt-[38px] shadow-[0_2px_5px_rgba(0,0,0,0.08)]">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSave();
            }}
          >
            {/* Name */}
            <div className="grid max-w-[520px] grid-cols-1 gap-[20px] sm:grid-cols-2">
              <label className="flex flex-col gap-[7px]">
                <span className="text-[12px] font-normal text-[#333333]">
                  First Name
                </span>

                <input
                  type="text"
                  value={form.firstName}
                  onChange={(event) =>
                    handleChange("firstName", event.target.value)
                  }
                  className="h-[40px] rounded-[8px] bg-[#EEEEEE] px-[12px] text-[13px] text-[#333333] outline-none"
                />
              </label>

              <label className="flex flex-col gap-[7px]">
                <span className="text-[12px] font-normal text-[#333333]">
                  Last Name
                </span>

                <input
                  type="text"
                  value={form.lastName}
                  onChange={(event) =>
                    handleChange("lastName", event.target.value)
                  }
                  className="h-[40px] rounded-[8px] bg-[#EEEEEE] px-[12px] text-[13px] text-[#333333] outline-none"
                />
              </label>
            </div>

            {/* Street */}
            <label className="mt-[18px] flex flex-col gap-[7px]">
              <span className="text-[12px] font-normal text-[#333333]">
                Street Address
              </span>

              <input
                type="text"
                value={form.street}
                onChange={(event) =>
                  handleChange("street", event.target.value)
                }
                className="h-[40px] w-full rounded-[8px] bg-[#EEEEEE] px-[12px] text-[13px] text-[#333333] outline-none"
              />
            </label>

            {/* Apartment */}
            <label className="mt-[12px] flex flex-col gap-[7px]">
              <input
                type="text"
                value={form.apartment}
                onChange={(event) =>
                  handleChange("apartment", event.target.value)
                }
                className="h-[40px] w-full rounded-[8px] bg-[#EEEEEE] px-[12px] text-[13px] text-[#777777] outline-none"
              />
            </label>

            {/* City and ZIP */}
            <div className="mt-[18px] grid max-w-[520px] grid-cols-1 gap-[20px] sm:grid-cols-2">
              <label className="flex flex-col gap-[7px]">
                <span className="text-[12px] font-normal text-[#333333]">
                  City
                </span>

                <input
                  type="text"
                  value={form.city}
                  onChange={(event) =>
                    handleChange("city", event.target.value)
                  }
                  className="h-[40px] rounded-[8px] bg-[#EEEEEE] px-[12px] text-[13px] text-[#333333] outline-none"
                />
              </label>

              <label className="flex flex-col gap-[7px]">
                <span className="text-[12px] font-normal text-[#333333]">
                  ZIP
                </span>

                <input
                  type="text"
                  value={form.zip}
                  onChange={(event) =>
                    handleChange("zip", event.target.value)
                  }
                  className="h-[40px] rounded-[8px] bg-[#EEEEEE] px-[12px] text-[13px] text-[#333333] outline-none"
                />
              </label>
            </div>

            {/* Country and state */}
            <div className="mt-[18px] grid max-w-[520px] grid-cols-1 gap-[20px] sm:grid-cols-2">
              <label className="flex flex-col gap-[7px]">
                <span className="text-[12px] font-normal text-[#333333]">
                  Country/Region
                </span>

                <input
                  type="text"
                  value={form.country}
                  onChange={(event) =>
                    handleChange("country", event.target.value)
                  }
                  className="h-[40px] rounded-[8px] bg-[#EEEEEE] px-[12px] text-[13px] text-[#333333] outline-none"
                />
              </label>

              <label className="flex flex-col gap-[7px]">
                <span className="text-[12px] font-normal text-[#333333]">
                  State
                </span>

                <input
                  type="text"
                  value={form.state}
                  onChange={(event) =>
                    handleChange("state", event.target.value)
                  }
                  className="h-[40px] rounded-[8px] bg-[#EEEEEE] px-[12px] text-[13px] text-[#333333] outline-none"
                />
              </label>
            </div>

            {/* Phone */}
            <label className="mt-[20px] flex max-w-[260px] flex-col gap-[7px]">
              <span className="text-[12px] font-normal text-[#333333]">
                Phone number
              </span>

              <div className="flex h-[40px] items-center rounded-[8px] bg-[#EEEEEE] px-[12px]">
                <span className="mr-[8px] text-[16px]">🇺🇸</span>

                <span className="mr-[8px] text-[12px] text-[#666666]">
                  +1
                </span>

                <input
                  type="tel"
                  value={form.phone}
                  onChange={(event) =>
                    handleChange("phone", event.target.value)
                  }
                  className="min-w-0 flex-1 bg-transparent text-[12px] text-[#333333] outline-none"
                />
              </div>
            </label>

            {/* Save */}
            <div className="mt-[28px] flex justify-end">
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

      {/* Saved address */}
      {mode === "saved" && (
        <div className="relative min-h-[280px] rounded-[20px] bg-[#F8F8F8] px-[44px] py-[40px] shadow-[0_2px_5px_rgba(0,0,0,0.08)]">
          <h2 className="text-[14px] font-medium leading-[130%] text-[#333333]">
            Default Delivery Address
          </h2>

          <div className="mt-[10px] text-[12px] font-normal leading-[150%] text-[#777777]">
            <p>
              {form.firstName} {form.lastName}
            </p>

            <p>{form.street}</p>

            <p>
              {form.city || "Mesalonis"},{" "}
              {form.state || "IN"} {form.zip || "46032"}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setMode("form")}
            className="absolute left-[300px] top-[62px] flex h-[30px] min-w-[80px] items-center justify-center rounded-[15px] border border-[#D3D3D3] bg-white px-[18px] text-[11px] font-normal text-[#555555]"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => {
              setForm(initialForm);
              setMode("form");
            }}
            className="absolute bottom-[38px] right-[44px] flex h-[44px] min-w-[150px] items-center justify-center rounded-[22px] bg-[#7C9BC0] px-[28px] text-[14px] font-medium text-white"
          >
            Add Address
          </button>
        </div>
      )}
    </section>
  );
}