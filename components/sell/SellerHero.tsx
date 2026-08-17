import Image from "next/image";
import Link from "next/link";

export default function SellerHero() {
  return (
    <section
      className="relative w-full overflow-visible bg-cover bg-center bg-no-repeat font-[var(--font-roboto)]"
      style={{
        backgroundImage: "url('/sell/seller-hero-background.png')",
      }}
    >
      <div className="relative mx-auto min-h-[520px] w-full max-w-[1440px] px-[40px] lg:px-[80px]">
        {/* Left content */}
        <div className="relative z-10 pt-[90px]">
          <h1 className="max-w-[520px] text-[48px] font-black leading-[120%] text-[#333333]">
            Become an
            <br />
            TreeMiix seller
          </h1>

          <p className="mt-[40px] max-w-[620px] text-[20px] font-black leading-[150%] text-[#333333]">
            More than half the units sold in our stores are from independent
            sellers.
          </p>

          <p className="mt-[4px] text-[12px] font-black leading-[150%] text-[#333333]">
            $39.99 a month + selling fees
          </p>

          <Link
            href="/register"
            className="mt-[36px] flex min-h-[64px] w-fit min-w-[150px] items-center justify-center rounded-[14px] bg-[linear-gradient(90deg,#FFDB5A_0%,#FF825A_100%)] px-[34px] py-[16px] text-center text-[26.29px] font-medium leading-[120%] text-white"
          >
            Sign up
          </Link>
        </div>

        {/* Parachute image */}
        <Image
          src="/sell/parachute-box.svg"
          alt="Package descending with a parachute"
          width={351}
          height={484}
          priority
          className="absolute right-[100px] top-[-65px] z-20 h-auto w-[351px] object-contain"
        />
      </div>
    </section>
  );
}