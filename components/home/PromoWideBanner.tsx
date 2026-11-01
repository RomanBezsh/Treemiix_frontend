import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export interface PromoWideBannerProps {
  title: string;
  description: ReactNode;
  buttonLabel: string;
  href: string;
  imageSrc: string;
  /** Solid color behind the text on narrow screens, where the photo is cropped */
  fadeColor: string;
  /** Classes for the button label (color or gradient text) */
  buttonTextClassName: string;
  priority?: boolean;
}

// Wide promo banner from Figma: photo background, text and button on the left, arrow on the right
export default function PromoWideBanner({
  title,
  description,
  buttonLabel,
  href,
  imageSrc,
  fadeColor,
  buttonTextClassName,
  priority,
}: PromoWideBannerProps) {
  return (
    <div className="relative min-h-[230px] w-full overflow-hidden rounded-[20px] shadow-[0_2px_4px_rgba(0,0,0,0.2)] sm:min-h-[260px] md:aspect-[2000/527] md:min-h-0 2xl:rounded-[24px]">
      <Image
        src={imageSrc}
        alt=""
        fill
        priority={priority}
        sizes="(max-width: 1536px) 100vw, 1534px"
        className="object-cover object-[78%_50%] md:object-center"
      />

      {/* Keeps text readable on phones, where the product sits behind it */}
      <div
        className="absolute inset-0 md:hidden"
        style={{ background: `linear-gradient(90deg, ${fadeColor} 0%, ${fadeColor}E6 45%, ${fadeColor}00 85%)` }}
      />

      <div className="relative z-10 flex h-full flex-col justify-center px-[22px] py-[26px] sm:px-[36px] md:w-[52%] md:px-[4.2%] md:py-0">
        <h2 className="max-w-[300px] text-[22px] font-medium leading-[120%] text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.2)] sm:max-w-none sm:text-[28px] lg:text-[34px] 2xl:text-[40px]">
          {title}
        </h2>

        <p className="mt-[8px] max-w-[260px] text-[14px] leading-[135%] text-white sm:max-w-[420px] sm:text-[16px] lg:mt-[12px] lg:max-w-[560px] lg:text-[20px] 2xl:text-[24px]">
          {description}
        </p>

        <Link
          href={href}
          className="tm-light tm-press mt-[18px] flex h-[44px] w-[150px] items-center justify-center rounded-[14px] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.15)] sm:h-[52px] sm:w-[200px] lg:mt-[28px] lg:h-[64px] lg:w-[260px] lg:rounded-[18px] 2xl:h-[76px] 2xl:w-[320px] 2xl:rounded-[20px]"
        >
          <span className={`text-[18px] font-medium uppercase sm:text-[22px] lg:text-[26px] 2xl:text-[30px] ${buttonTextClassName}`}>
            {buttonLabel}
          </span>
        </Link>
      </div>

      {/* Arrow */}
      <Link
        href={href}
        aria-label={`${title}: ${buttonLabel}`}
        className="tm-press absolute bottom-[18%] right-[4%] z-10 hidden md:block"
      >
        <svg viewBox="0 0 186 56" className="h-auto w-[90px] lg:w-[120px] 2xl:w-[150px]" fill="none" aria-hidden="true">
          <path d="M0 28H182M154 2L182 28L154 54" stroke="white" strokeWidth="4" />
        </svg>
      </Link>
    </div>
  );
}
