const occasions = [
  "Birthday",
  "Thank you",
  "Valentine's Day",
  "Wedding",
  "Congrats",
  "Just because",
];

export default function GiftCardsOccasionList() {
  return (
    <div className="grid w-full grid-cols-2 gap-[10px] sm:grid-cols-3 lg:flex lg:items-center">
      {occasions.map((occasion, index) => (
        <div
          key={occasion}
          className={`
            gift-fade-up
            ${
              index === 0
                ? "gift-delay-1"
                : index === 1
                  ? "gift-delay-2"
                  : index === 2
                    ? "gift-delay-3"
                    : index === 3
                      ? "gift-delay-4"
                      : "gift-delay-5"
            }
            lg:flex-1
          `}
        >
          <button
            type="button"
            className="
              flex h-[54px] w-full min-w-0 items-center justify-center
              rounded-[16px]
              bg-[linear-gradient(90deg,#7E8CBD_0%,#CE9AD7_100%)]
              px-[14px]
              text-center text-[16px] font-medium leading-[130%] text-white
              transition-all duration-200 ease-out
              hover:-translate-y-[3px]
              hover:scale-[1.02]
              hover:shadow-[0_7px_16px_rgba(126,140,189,0.22)]
              active:translate-y-0
              active:scale-[0.97]
              sm:h-[58px]
              sm:text-[18px]
              lg:h-[64px]
              lg:rounded-[20px]
              lg:px-[20px]
              lg:text-[20px]
              lg:leading-[150%]
            "
          >
            {occasion}
          </button>
        </div>
      ))}

      <div className="gift-fade-up gift-delay-5">
        <button
          type="button"
          aria-label="Show more occasions"
          className="
            flex h-[54px] w-full items-center justify-center
            rounded-[16px]
            border border-[#E6E6E6] bg-[#F8F8F8]
            text-[28px] font-light leading-none text-[#7E8CBD]
            transition-all duration-200 ease-out
            hover:-translate-y-[3px]
            hover:rotate-90
            hover:bg-[#F1F1F5]
            hover:shadow-[0_6px_14px_rgba(0,0,0,0.10)]
            active:translate-y-0
            active:scale-[0.95]
            sm:h-[58px]
            lg:h-[64px]
            lg:w-[64px]
            lg:shrink-0
            lg:rounded-[20px]
            lg:text-[32px]
          "
        >
          +
        </button>
      </div>
    </div>
  );
}