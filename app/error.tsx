"use client"; // Error boundaries must be Client Components

import Link from "next/link";
import { useEffect } from "react";

// Fallback for unexpected errors in any page (the header and footer from the root layout stay).
export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex w-full max-w-[700px] flex-col items-center px-[16px] py-[80px] text-center">
      <h1 className="text-[28px] font-black text-[#333333]">Something went wrong</h1>
      <p className="mt-[10px] text-[15px] text-[#555555]">
        This page couldn&apos;t be loaded. The server may be waking up — please try again in a few seconds.
      </p>
      <div className="mt-[24px] flex flex-wrap items-center justify-center gap-[12px]">
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="flex h-[46px] items-center justify-center rounded-[12px] border-2 border-[#7C9BC0] px-[22px] text-[16px] font-medium text-[#496B94] transition hover:-translate-y-0.5 active:translate-y-0"
        >
          Try again
        </button>
        <Link
          href="/"
          className="flex h-[46px] items-center justify-center rounded-[12px] bg-[linear-gradient(90deg,#FFDB5A_0%,#FF825A_100%)] px-[26px] text-[16px] font-medium text-white transition hover:-translate-y-0.5 active:translate-y-0"
        >
          Go to home page
        </Link>
      </div>
    </main>
  );
}
