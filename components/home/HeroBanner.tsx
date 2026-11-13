"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const HeroBanner = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAuthenticated(Boolean(localStorage.getItem("token")));
    }
  }, []);

  if (isAuthenticated) return null;

  return (
    <div className="flex w-full flex-col items-center justify-center rounded-[20px] bg-[linear-gradient(56.68deg,#9EA5B8_16.11%,#CDCED0_87.2%)] px-6 py-6 2xl:h-39.25 2xl:w-92 2xl:px-13 2xl:py-6.75">
      <span className="max-w-full truncate text-xl font-medium text-center 2xl:text-2xl bg-none text-white drop-shadow-[0px_2px_4px_0px_#00000033]">
        Sign in for the best experience
      </span>
      <Link
        className="transition-[translate,scale,box-shadow,background-color,border-color,color,opacity] duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] flex mt-3.5 items-center justify-center bg-[#49516D] w-full max-w-51 h-7.75 text-center text-[18px] font-medium text-white rounded-[49px]"
        href="/auth"
      >
        Sign in securely
      </Link>
    </div>
  );
};

export default HeroBanner;
