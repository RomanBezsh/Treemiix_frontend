"use client";

interface LoadErrorProps {
  /** What failed to load, e.g. "products" → "Couldn't load products". */
  what: string;
  /** Defaults to reloading the page (for Server Components, which cannot pass functions). */
  onRetry?: () => void;
  className?: string;
}

/** Error state for a failed API request (server error, rate limit or no network) with a retry button. */
export default function LoadError({ what, onRetry = () => window.location.reload(), className = "" }: LoadErrorProps) {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center rounded-[16px] bg-[#F8F8F8] px-[20px] py-[40px] text-center ${className}`}
    >
      <p className="text-[20px] font-medium text-[#333333]">Couldn&apos;t load {what}</p>
      <p className="mt-[8px] max-w-[420px] text-[14px] text-[#555555]">
        The server may be waking up or temporarily unavailable. Please try again in a few seconds.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-[20px] flex h-[44px] items-center justify-center rounded-[12px] border-2 border-[#7C9BC0] px-[24px] text-[16px] font-medium text-[#496B94] transition hover:-translate-y-0.5 active:translate-y-0"
      >
        Try again
      </button>
    </div>
  );
}
