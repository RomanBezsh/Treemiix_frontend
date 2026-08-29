"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-[calc(100vh-114px)] w-full justify-center bg-white px-[16px] pt-[80px] font-[var(--font-roboto)] sm:pt-[100px] lg:pt-[120px]">
      <div className="flex w-full max-w-[1000px] flex-col items-center text-center">
        {/* Error title */}
        <h1 className="text-[88px] font-black leading-[100%] text-[#D6D6D6] drop-shadow-[0_2px_1px_rgba(0,0,0,0.18)] sm:text-[130px] md:text-[180px] lg:text-[220px] xl:text-[288px]">
          SORRY
        </h1>

        {/* Error message */}
        <p className="mt-[4px] text-[20px] font-medium leading-[150%] text-[#B3B3B3] sm:text-[28px] md:text-[38px] lg:text-[48px] xl:text-[60px]">
          something went wrong on our end
        </p>

        {/* Actions */}
        <div className="mt-[42px] flex w-full max-w-[600px] flex-col items-center justify-center gap-[10px] sm:flex-row">
          {/* Home page */}
          <Link
            href="/"
            className="flex h-[46px] w-full items-center justify-center rounded-[20px] bg-[linear-gradient(90deg,#FFDB5A_0%,#FF825A_100%)] p-[2px] sm:w-[275px] md:h-[54px]"
          >
            <span className="flex h-full w-full items-center justify-center rounded-[18px] bg-white px-[30px] text-[16px] font-medium leading-[120%] text-[#FF8F55] sm:text-[20px] md:text-[24px]"
            >
              Home page
            </span>
          </Link>

          {/* Try again */}
          <button
            type="button"
            onClick={() => router.refresh()}
            className="flex h-[46px] w-full items-center justify-center rounded-[20px] bg-[linear-gradient(90deg,#FFDB5A_0%,#FF825A_100%)] px-[30px] text-[16px] font-medium leading-[120%] text-white sm:w-[275px] sm:text-[20px] md:h-[54px] md:text-[24px]"
          >
            Try again
          </button>
        </div>
      </div>
    </main>
  );
}