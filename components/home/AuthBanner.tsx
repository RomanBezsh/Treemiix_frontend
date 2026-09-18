
import Image from 'next/image';

const AuthBanner = () => {
  return (
    <div className="relative w-[1532px] h-[282px] overflow-hidden rounded-[24px] mb-5">
      <div className="absolute h-[281.6px] w-[1920px] left-[-194px] top-0 bg-[linear-gradient(90deg,#9FA6B8_0%,#496B94_100%)]" />

      <div className="absolute w-[712.91px] h-[833.69px] left-[766px] top-[-363.51px] rounded-[60px] backdrop-blur-[10px] bg-[rgba(216,204,208,0.5)] shadow-[0px_7px_4px_rgba(0,0,0,0.25)] rotate-45" />
      <div className="absolute w-[699.06px] h-[733.88px] left-[858px] top-[-358.93px] rounded-[60px] backdrop-blur-[10px] bg-[rgba(216,204,208,0.5)] shadow-[0px_7px_4px_rgba(0,0,0,0.25)] rotate-45" />
      <div className="absolute w-[695.07px] h-[706.6px] left-[881px] top-[-351.64px] rounded-[60px] backdrop-blur-[10px] bg-[rgba(216,204,208,0.5)] shadow-[0px_7px_4px_rgba(0,0,0,0.25)] rotate-45" />

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
  );
}


export default AuthBanner;
