"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ShippingAddressForm() {
  const router = useRouter();
  const [isDefault, setIsDefault] = useState(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    router.push("/checkout/payment-method");
  };

  return (
    <section className="w-full rounded-[20px] bg-[#F8F8F8] px-[18px] py-[22px] shadow-[0_2px_5px_rgba(0,0,0,0.08)] sm:px-[24px] sm:py-[26px] lg:px-[28px]">
      {/* Form title */}
      <h2 className="text-[22px] font-normal leading-[150%] text-[#333333] sm:text-[25px]">
        Add a new address
      </h2>

      <form onSubmit={handleSubmit} className="mt-[18px]">
        {/* Country */}
        <label className="flex flex-col gap-[6px]">
          <span className="text-[14px] font-normal leading-[150%] text-[#333333] sm:text-[16px]">
            Country | Region
          </span>

          <select
            defaultValue="United States"
            className="h-[42px] w-full rounded-[7px] border-0 bg-[#EEEEEE] px-[12px] text-[14px] text-[#555555] outline-none sm:text-[16px]"
          >
            <option>United States</option>
            <option>Ukraine</option>
            <option>Poland</option>
            <option>Germany</option>
          </select>
        </label>

        {/* Full name */}
        <label className="mt-[14px] flex flex-col gap-[6px]">
          <span className="text-[14px] font-normal leading-[150%] text-[#333333] sm:text-[16px]">
            Full name (First and Last name)
          </span>

          <input
            type="text"
            placeholder="Name"
            required
            className="h-[42px] w-full rounded-[7px] bg-[#EEEEEE] px-[12px] text-[14px] text-[#333333] outline-none placeholder:text-[#999999] sm:text-[16px]"
          />
        </label>

        {/* Phone */}
        <label className="mt-[14px] flex flex-col gap-[6px]">
          <span className="text-[14px] font-normal leading-[150%] text-[#333333] sm:text-[16px]">
            Phone number
          </span>

          <input
            type="tel"
            placeholder="Number"
            required
            className="h-[42px] w-full rounded-[7px] bg-[#EEEEEE] px-[12px] text-[14px] text-[#333333] outline-none placeholder:text-[#999999] sm:text-[16px]"
          />
        </label>

        {/* Address */}
        <div className="mt-[14px]">
          <p className="mb-[6px] text-[14px] font-normal leading-[150%] text-[#333333] sm:text-[16px]">
            Address
          </p>

          <div className="flex flex-col gap-[8px]">
            <input
              type="text"
              placeholder="Street address or P.O. Box."
              required
              className="h-[42px] w-full rounded-[7px] bg-[#EEEEEE] px-[12px] text-[14px] text-[#333333] outline-none placeholder:text-[#999999] sm:text-[16px]"
            />

            <input
              type="text"
              placeholder="Apt, suite, unit, building, floor, etc."
              className="h-[42px] w-full rounded-[7px] bg-[#EEEEEE] px-[12px] text-[14px] text-[#333333] outline-none placeholder:text-[#999999] sm:text-[16px]"
            />
          </div>
        </div>

        {/* City, state and ZIP */}
        <div className="mt-[14px] grid grid-cols-1 gap-[12px] sm:grid-cols-3">
          <label className="flex flex-col gap-[6px]">
            <span className="text-[14px] font-normal leading-[150%] text-[#333333] sm:text-[16px]">
              City
            </span>

            <input
              type="text"
              required
              className="h-[42px] rounded-[7px] bg-[#EEEEEE] px-[12px] text-[14px] outline-none sm:text-[16px]"
            />
          </label>

          <label className="flex flex-col gap-[6px]">
            <span className="text-[14px] font-normal leading-[150%] text-[#333333] sm:text-[16px]">
              State
            </span>

            <input
              type="text"
              required
              className="h-[42px] rounded-[7px] bg-[#EEEEEE] px-[12px] text-[14px] outline-none sm:text-[16px]"
            />
          </label>

          <label className="flex flex-col gap-[6px]">
            <span className="text-[14px] font-normal leading-[150%] text-[#333333] sm:text-[16px]">
              ZIP Code
            </span>

            <input
              type="text"
              required
              className="h-[42px] rounded-[7px] bg-[#EEEEEE] px-[12px] text-[14px] outline-none sm:text-[16px]"
            />
          </label>
        </div>

        {/* Default address */}
        <label className="mt-[20px] flex cursor-pointer items-center gap-[10px]">
          <input
            type="checkbox"
            checked={isDefault}
            onChange={(event) => setIsDefault(event.target.checked)}
            className="h-[16px] w-[16px] accent-[#7C9BC0]"
          />

          <span className="text-[16px] font-normal leading-[150%] text-[#333333] sm:text-[20px]">
            Make this my default address
          </span>
        </label>

        {/* Delivery instructions */}
        <div className="mt-[18px]">
          <p className="text-[16px] font-normal leading-[150%] text-[#333333] sm:text-[20px]">
            Delivery instructions (optional)
          </p>

          <button
            type="button"
            className="mt-[8px] flex items-center gap-[6px] text-left text-[16px] font-normal leading-[150%] text-[#496B94] sm:text-[20px]"
          >
            <span className="text-[19px] leading-none">›</span>

            <span>
              Add preferences, notes, access codes and more
            </span>
          </button>
        </div>

        {/* Use address */}
        <button
          type="submit"
          className="mt-[26px] flex min-h-[48px] w-full items-center justify-center rounded-[20px] bg-[#7C9BC0] px-[24px] py-[12px] text-[16px] font-medium leading-[120%] text-white sm:w-fit sm:px-[45px] sm:text-[18px]"
        >
          Use this address
        </button>
      </form>
    </section>
  );
}