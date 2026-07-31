import Link from "next/link";




const HeroBanner = () => {
  return (
    <div className="flex flex-col items-center justify-center w-96.5 h-39.25 rounded-[20px] bg-[linear-gradient(56.68deg,#9EA5B8_16.11%,#CDCED0_87.2%)] py-6.75 px-13">
      <span className="text-2xl font-medium text-center bg-none text-white drop-shadow-[0px_2px_4px_0px_#00000033]">
        Sign in for the best experience
      </span>
      <Link
        className="flex mt-3.5 items-center justify-center bg-[#49516D] w-51 h-7.75 text-center text-[18px] font-medium text-white rounded-[49px]"
        href="/auth"
      >
        Sign in securely
      </Link>
    </div>
  );
}

export default HeroBanner;
