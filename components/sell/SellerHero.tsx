import Image from "next/image";
import Link from "next/link";

export default function SellerHero() {
  return (
    <section
      className="relative w-full bg-cover bg-center bg-no-repeat font-[var(--font-roboto)]"
      style={{
        backgroundImage: "url('/sell/seller-hero-background.png')",
      }}
    >
      <div className="relative mx-auto min-h-[650px] w-full max-w-[1440px] px-[20px] pb-[40px] pt-[50px] sm:px-[32px] lg:min-h-[520px] lg:px-[80px] lg:pb-0 lg:pt-0">
        {/* Hero content */}
        <div className="relative z-10 lg:pt-[90px]">
          <h1 className="max-w-[520px] text-[38px] font-black leading-[115%] text-[#333333] sm:text-[44px] lg:text-[48px] lg:leading-[120%]">
            Become an
            <br />
            TreeMiix seller
          </h1>

          <p className="mt-[24px] max-w-[620px] text-[16px] font-black leading-[150%] text-[#333333] sm:text-[18px] lg:mt-[40px] lg:text-[20px]">
            More than half the units sold in our stores are from independent
            sellers.
          </p>

          <p className="mt-[4px] text-[11px] font-black leading-[150%] text-[#333333] lg:text-[12px]">
            $39.99 a month + selling fees
          </p>

          <Link
            href="/register"
            className="mt-[28px] flex h-[50px] w-fit items-center justify-center rounded-[12px] bg-[linear-gradient(90deg,#FFDB5A_0%,#FF825A_100%)] px-[26px] text-[18px] font-medium leading-[120%] text-white lg:mt-[36px] lg:min-h-[64px] lg:min-w-[150px] lg:rounded-[14px] lg:px-[34px] lg:text-[26.29px]"
          >
            Sign up
          </Link>
        </div>

        {/* Parachute */}
        <div className="mt-[34px] flex w-full justify-center lg:mt-0">
          <Image
            src="/sell/parachute-box.svg"
            alt="Package descending with a parachute"
            width={351}
            height={484}
            priority
            className="
              relative
              z-20
              h-auto
              w-[220px]
              object-contain
              sm:w-[270px]
              lg:absolute
              lg:right-[80px]
              lg:top-[-65px]
              lg:w-[351px]
              xl:right-[100px]
            "
          />
        </div>
      </div>
    </section>
  );
}