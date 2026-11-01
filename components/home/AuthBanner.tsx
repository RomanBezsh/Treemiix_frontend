'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAuthUser } from '@/lib/useAuthUser';
import HomePromoSlider from './HomePromoSlider';

const AuthBanner = () => {
  const user = useAuthUser();

  // Signed-in users see promotions instead of the sign-in call to action
  if (user) return <HomePromoSlider />;

  return (
    <>
    {/* Mobile / tablet */}
    <div className="relative w-full overflow-hidden rounded-[20px] bg-[linear-gradient(90deg,#9FA6B8_0%,#496B94_100%)] dark:bg-[linear-gradient(90deg,#2B3047_0%,#22314A_100%)] px-6 py-7 sm:py-9 2xl:hidden">
      <div className="pointer-events-none absolute -right-16 -top-24 h-[240px] w-[220px] rotate-45 rounded-[40px] bg-[rgba(216,204,208,0.5)] dark:bg-[rgba(216,204,208,0.12)] shadow-[0px_7px_4px_rgba(0,0,0,0.25)] backdrop-blur-[10px] sm:-right-10 sm:h-[300px] sm:w-[280px]" />
      <div className="pointer-events-none absolute -right-4 -top-28 h-[220px] w-[200px] rotate-45 rounded-[40px] bg-[rgba(216,204,208,0.5)] dark:bg-[rgba(216,204,208,0.12)] shadow-[0px_7px_4px_rgba(0,0,0,0.25)] backdrop-blur-[10px] sm:right-6 sm:h-[280px] sm:w-[260px]" />

      <div className="relative z-10 flex flex-col items-center gap-4 text-center sm:gap-5">
        <h2 className="max-w-[420px] text-[24px] font-medium leading-[130%] text-white [font-family:'Roboto',sans-serif] [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)] sm:text-[32px]">
          Sign in for the best experience
        </h2>
        <Link
          href="/auth"
          className="flex h-[48px] w-full max-w-[320px] items-center justify-center rounded-[61px] bg-[#FFA95A] text-[18px] font-bold text-white [box-shadow:inset_-4px_4px_6px_rgba(0,0,0,0.1)] [font-family:'Roboto',sans-serif] [text-shadow:0px_4px_4px_rgba(0,0,0,0.15)] tm-press sm:h-[60px] sm:text-[22px]"
        >
          Sign in securely
        </Link>
      </div>
    </div>

    {/* Desktop (original layout) */}
    <div className="relative hidden w-[1532px] h-[282px] overflow-hidden rounded-[24px] 2xl:block">
      <div className="absolute h-[281.6px] w-[1920px] left-[-194px] top-0 bg-[linear-gradient(90deg,#9FA6B8_0%,#496B94_100%)] dark:bg-[linear-gradient(90deg,#2B3047_0%,#22314A_100%)]" />

      <div className="absolute w-[712.91px] h-[833.69px] left-[766px] top-[-363.51px] rounded-[60px] backdrop-blur-[10px] bg-[rgba(216,204,208,0.5)] dark:bg-[rgba(216,204,208,0.12)] shadow-[0px_7px_4px_rgba(0,0,0,0.25)] rotate-45" />
      <div className="absolute w-[699.06px] h-[733.88px] left-[858px] top-[-358.93px] rounded-[60px] backdrop-blur-[10px] bg-[rgba(216,204,208,0.5)] dark:bg-[rgba(216,204,208,0.12)] shadow-[0px_7px_4px_rgba(0,0,0,0.25)] rotate-45" />
      <div className="absolute w-[695.07px] h-[706.6px] left-[881px] top-[-351.64px] rounded-[60px] backdrop-blur-[10px] bg-[rgba(216,204,208,0.5)] dark:bg-[rgba(216,204,208,0.12)] shadow-[0px_7px_4px_rgba(0,0,0,0.25)] rotate-45" />

      <h2 className="absolute w-[544px] left-[153px] top-[59px] font-medium text-white text-[40px] leading-[130%] [font-family:'Roboto',sans-serif] [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]">
        Sign in for the best experience
      </h2>

      <button
        type="button"
        className="absolute w-[480px] h-[85px] left-[185px] top-[137px] flex items-center justify-center rounded-[61px] bg-[#FFA95A] [box-shadow:inset_-4px_4px_6px_rgba(0,0,0,0.1)] transition-transform"
      >
        <span className="font-bold text-white text-center text-[30px] leading-[130%] [font-family:'Roboto',sans-serif] [text-shadow:0px_4px_4px_rgba(0,0,0,0.15)]">
          Sign in securely
        </span>
      </button>


      <Image
        className="absolute left-[1009px] top-[69px]"
        src="/home/banner_elements/auth.svg"
        alt="Auth"
        width={173}
        height={143}
      />

      <h3 className="absolute w-[168px] left-[1229px] top-[109.81px] font-medium text-white text-[48px] leading-[130%] [font-family:'Roboto',sans-serif] [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]">
        Naming
      </h3>
    </div>
    </>
  );
}


export default AuthBanner;
