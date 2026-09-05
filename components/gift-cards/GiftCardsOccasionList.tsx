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
      {occasions.map((occasion) => (
        <button
          key={occasion}
          type="button"
          className="flex h-[54px] min-w-0 items-center justify-center rounded-[16px] bg-[linear-gradient(90deg,#7E8CBD_0%,#CE9AD7_100%)] px-[14px] text-center text-[16px] font-medium leading-[130%] text-white sm:h-[58px] sm:text-[18px] lg:h-[64px] lg:shrink-0 lg:rounded-[20px] lg:px-[36px] lg:text-[20px] lg:leading-[150%]"
        >
          {occasion}
        </button>
      ))}

      <button
        type="button"
        aria-label="Show more occasions"
        className="flex h-[54px] items-center justify-center rounded-[16px] border border-[#E6E6E6] bg-[#F8F8F8] text-[28px] font-light leading-none text-[#7E8CBD] sm:h-[58px] lg:h-[64px] lg:w-[64px] lg:shrink-0 lg:rounded-[20px] lg:text-[32px]"
      >
        +
      </button>
    </div>
  );
}