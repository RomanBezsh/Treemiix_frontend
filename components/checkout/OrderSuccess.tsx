import Image from "next/image";
import Link from "next/link";

export default function OrderSuccess() {
  return (
    <section className="relative flex min-h-[620px] w-full items-center justify-center overflow-hidden bg-white px-[16px] py-[80px] sm:min-h-[700px] sm:px-[24px] lg:min-h-[760px]">
      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Gradient title */}
        <h1 className="bg-[linear-gradient(90deg,#7E8CBD_0%,#CE9AD7_100%)] bg-clip-text text-[38px] font-medium leading-[120%] tracking-[0] text-transparent sm:text-[54px] lg:text-[72px] xl:text-[87.25px]">
          Thank you for your order
        </h1>

        {/* Actions */}
<div className="mt-[28px] flex w-full flex-col items-center justify-center gap-[13.42px] sm:flex-row">
  {/* My Orders */}
  <Link
    href="/account/orders"
    className="
      flex h-[56px] w-full items-center justify-center
      rounded-[26.85px] bg-[#7C9BC0]
      text-[18px] font-medium leading-[120%] text-white
      sm:w-[220px]
      lg:h-[64.43px] lg:w-[288.6px] lg:text-[26.85px]
    "
  >
    My Orders
  </Link>

  {/* Continue shopping */}
  <Link
    href="/"
    className="
      flex h-[56px] w-full items-center justify-center
      rounded-[26.85px] bg-[#EEEEEE]
      text-[18px] font-medium leading-[120%] text-[#828282]/50
      sm:w-[220px]
      lg:h-[64.43px] lg:w-[273.84px] lg:text-[26.85px]
    "
  >
    Continue shopping
  </Link>
</div>
      </div>

      {/* Left plant */}
      <Image
        src="/checkout/success/plant-left.png"
        alt=""
        width={190}
        height={310}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[35px] left-[3%] hidden h-auto w-[110px] object-contain sm:block md:w-[140px] lg:bottom-[45px] lg:w-[180px]"
      />

      {/* Small right plant */}
      <Image
        src="/checkout/success/plant-right-small.png"
        alt=""
        width={100}
        height={130}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[40px] right-[22%] hidden h-auto w-[70px] object-contain md:block lg:bottom-[55px] lg:w-[95px]"
      />

      {/* Large right plant */}
      <Image
        src="/checkout/success/plant-right-large.png"
        alt=""
        width={180}
        height={250}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[35px] right-[4%] hidden h-auto w-[115px] object-contain sm:block md:w-[140px] lg:bottom-[45px] lg:w-[175px]"
      />
    </section>
  );
}