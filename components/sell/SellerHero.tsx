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
          <h1 className="sell-fade-left sell-delay-1 max-w-[520px] text-[38px] font-black leading-[115%] text-[#333333] sm:text-[44px] lg:text-[48px] lg:leading-[120%]">
            Become an
            <br />
            TreeMiix seller
          </h1>

          <p className="sell-fade-left sell-delay-2 mt-[24px] max-w-[620px] text-[16px] font-black leading-[150%] text-[#333333] sm:text-[18px] lg:mt-[40px] lg:text-[20px]">
            More than half the units sold in our stores are from independent
            sellers.
          </p>

          <p className="sell-fade-left sell-delay-3 mt-[4px] text-[11px] font-black leading-[150%] text-[#333333] lg:text-[12px]">
            $39.99 a month + selling fees
          </p>

          {/* Animated wrapper */}
          <div className="sell-fade-left sell-delay-4 w-fit">
            <Link
              href="/register"
              className="
                mt-[28px] flex h-[50px] w-fit items-center justify-center
                rounded-[12px]
                bg-[linear-gradient(90deg,#FFDB5A_0%,#FF825A_100%)]
                px-[26px]
                text-[18px] font-medium leading-[120%] text-white
                transition-all duration-200 ease-out
                hover:-translate-y-[3px]
                hover:scale-[1.025]
                hover:shadow-[0_8px_18px_rgba(255,130,90,0.28)]
                active:translate-y-0
                active:scale-[0.97]
                lg:mt-[36px]
                lg:min-h-[64px]
                lg:min-w-[150px]
                lg:rounded-[14px]
                lg:px-[34px]
                lg:text-[26.29px]
              "
            >
              Sign up
            </Link>
          </div>
        </div>

        {/* Parachute */}
        <div className="sell-parachute-enter sell-delay-2 group mt-[34px] flex w-full justify-center lg:mt-0">
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
              transition-all duration-500 ease-out
              group-hover:-translate-y-[8px]
              group-hover:scale-[1.025]
              group-hover:drop-shadow-[0_12px_16px_rgba(0,0,0,0.08)]
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