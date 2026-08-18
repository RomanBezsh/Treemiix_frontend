import Image from "next/image";

export default function AccountDetails() {
  return (
    <section className="w-full">
      {/* Title */}
      <h1 className="mb-[18px] text-[28px] font-medium leading-[130%] text-[#333333]">
        Account Details
      </h1>

      {/* Details form */}
      <div className="min-h-[620px] rounded-[20px] bg-[#F8F8F8] px-[44px] pb-[36px] pt-[42px] shadow-[0_2px_5px_rgba(0,0,0,0.08)]">
        <form className="flex h-full flex-col">
          {/* Name */}
          <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2">
            <label className="flex flex-col gap-[8px]">
              <span className="text-[14px] font-normal text-[#333333]">
                First Name
              </span>

              <input
                type="text"
                name="firstName"
                defaultValue="Peter"
                className="h-[44px] rounded-[10px] bg-[#EEEEEE] px-[14px] text-[14px] text-[#333333] outline-none"
              />
            </label>

            <label className="flex flex-col gap-[8px]">
              <span className="text-[14px] font-normal text-[#333333]">
                Last Name
              </span>

              <input
                type="text"
                name="lastName"
                defaultValue="Marzo"
                className="h-[44px] rounded-[10px] bg-[#EEEEEE] px-[14px] text-[14px] text-[#333333] outline-none"
              />
            </label>
          </div>

          {/* Email */}
          <label className="mt-[22px] flex flex-col gap-[8px]">
            <span className="text-[14px] font-normal text-[#333333]">
              Email
            </span>

            <input
              type="email"
              name="email"
              defaultValue="LeiLeimai@gmail.com"
              className="h-[44px] rounded-[10px] bg-[#EEEEEE] px-[14px] text-[14px] text-[#333333] outline-none"
            />
          </label>

          {/* Password */}
          <label className="mt-[22px] flex flex-col gap-[8px]">
            <span className="text-[14px] font-normal text-[#333333]">
              Password
            </span>

            <input
              type="password"
              name="password"
              defaultValue="password12345"
              className="h-[44px] rounded-[10px] bg-[#EEEEEE] px-[14px] text-[14px] text-[#333333] outline-none"
            />
          </label>

          {/* Phone */}
          <label className="mt-[22px] flex flex-col gap-[8px]">
            <span className="text-[14px] font-normal text-[#333333]">
              Phone number
            </span>

            <div className="flex h-[44px] items-center rounded-[10px] bg-[#EEEEEE] px-[14px]">
              <span className="mr-[10px] text-[18px]">🇺🇸</span>

              <span className="mr-[10px] text-[14px] text-[#555555]">
                +1
              </span>

              <input
                type="tel"
                name="phone"
                defaultValue="976640278"
                className="min-w-0 flex-1 bg-transparent text-[14px] text-[#333333] outline-none"
              />
            </div>
          </label>

          {/* Birthday */}
          <label className="mt-[22px] flex w-full max-w-[185px] flex-col gap-[8px]">
            <span className="text-[14px] font-normal text-[#333333]">
              Date of Birth
            </span>

            <div className="relative">
              <input
                type="text"
                name="birthDate"
                defaultValue="11/08/2000"
                className="h-[44px] w-full rounded-[10px] bg-[#EEEEEE] px-[14px] pr-[44px] text-[14px] text-[#999999] outline-none"
              />

              <Image
                src="/account/account_calendar_icon.svg"
                alt=""
                width={20}
                height={20}
                aria-hidden="true"
                className="pointer-events-none absolute right-[14px] top-1/2 h-[20px] w-[20px] -translate-y-1/2 object-contain"
              />
            </div>
          </label>

          {/* Save */}
          <div className="mt-auto flex justify-end pt-[50px]">
            <button
              type="submit"
              className="flex h-[48px] min-w-[130px] items-center justify-center rounded-[24px] bg-[#7C9BC0] px-[32px] text-[16px] font-medium text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}