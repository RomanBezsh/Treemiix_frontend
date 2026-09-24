const ReviewFilterChips = () => {
  return (
    <section
      className="
        mb-[70px] w-full max-w-[1690px]
        px-[16px]
        sm:px-[24px]
        lg:mb-[148px]
        lg:px-[40px]
      "
    >
      <h2
        className="
          mb-[24px]
          text-[21px] font-semibold leading-[130%] text-[#333333]
          sm:text-2xl
          lg:mb-[47px]
        "
      >
        Read reviews that mention
      </h2>

      <div className="flex flex-wrap gap-[12px] sm:gap-[20px] lg:gap-[32px]">
        <Chip text="Good" />
        <Chip text="Good" />
      </div>
    </section>
  );
};

interface ChipProps {
  text: string;
}

const Chip = ({ text }: ChipProps) => {
  return (
    <button
      type="button"
      className="
        min-h-[40px]
        rounded-[20px]
        bg-[#7C9BC0]
        px-[16px]
        text-[15px] font-medium text-[#F8F8F8]
        shadow-[0_2px_4px_#00000033]
        transition-all duration-200 ease-out
        hover:-translate-y-[2px]
        hover:bg-[#6F90B7]
        hover:shadow-[0_6px_14px_rgba(124,155,192,0.24)]
        active:translate-y-0
        active:scale-[0.97]
        sm:min-h-[42px]
        sm:text-lg
      "
    >
      {text}
    </button>
  );
};

export default ReviewFilterChips;