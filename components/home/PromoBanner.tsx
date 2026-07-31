const PromoBanner = () => {
  return (
    <div className="relative overflow-hidden flex flex-col items-center justify-center w-96.5 h-73 rounded-[20px] bg-[linear-gradient(50.68deg,#496B94_24.23%,#8195AD_81.32%)] p-6 shadow-[0_7px_4px_rgba(0,0,0,0.25)]">

      <div
        className="absolute w-[214.77px] h-[349.25px] top-[-57.24px] left-[-101.79px] rotate-45 bg-[#D8CCD0]/50 backdrop-blur-[10px] shadow-[0_7px_4px_rgba(0,0,0,0.25)] pointer-events-none
        rounded-[50px]"
      />

      <div
        className="absolute w-[396.31px] h-[357.65px] top-[-76.98px] left-24.75 rotate-45 bg-[#D8CCD0]/50 backdrop-blur-[10px] shadow-[0_7px_4px_rgba(0,0,0,0.25)] pointer-events-none rounded-[50px]"
      />

      <p className="relative z-10 w-65.75 text-[24px] leading-[130%] font-medium text-center text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
        We ship over 45 million<br />
        products around<br />
        the world
      </p>

    </div>
  );
};

export default PromoBanner;
