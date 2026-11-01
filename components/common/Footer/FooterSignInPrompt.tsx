"use client";

import Link from "next/link";
import { useAuthUser } from "@/lib/useAuthUser";

export default function FooterSignInPrompt() {
  const user = useAuthUser();

  if (user) return null;

  return (
    <section className="hidden border-y border-[#D5D9D9] bg-white py-[26px] md:block">
      <div className="mx-auto flex flex-col items-center">
        <p className="mb-[10px] text-center text-[14px] font-normal leading-[130%] text-[#565959]">
          See personalized recommendations
        </p>

        <Link
          href="/auth"
          className="
            flex h-[48px] w-[386px] items-center justify-center
            rounded-[49px] bg-[#F5AD69]
            text-center text-[24px] font-light leading-[130%] text-white
            transition-all duration-200 ease-out
            hover:-translate-y-[2px]
            hover:scale-[1.01]
            hover:bg-[#F7B475]
            hover:shadow-[0_6px_14px_rgba(0,0,0,0.14)]
            active:translate-y-0
            active:scale-[0.97]
          "
        >
          Sign in
        </Link>

        <p className="mt-[8px] text-center text-[14px] font-medium leading-[130%] text-[#333333]">
          New Customer?{" "}
          <Link
            href="/auth"
            className="
              text-[#FFA95A]
              transition-colors duration-200
              hover:text-[#F28C35]
              hover:underline
            "
          >
            Start here.
          </Link>
        </p>
      </div>
    </section>
  );
}
