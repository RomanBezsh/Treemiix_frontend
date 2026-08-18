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
    <div className="flex w-full items-center gap-[10px]">
      {occasions.map((occasion) => (
        <button
          key={occasion}
          type="button"
          className="flex h-[64px] shrink-0 items-center justify-center rounded-[20px] bg-[linear-gradient(90deg,#7E8CBD_0%,#CE9AD7_100%)] px-[36px] text-[20px] font-medium leading-[150%] whitespace-nowrap text-white transition-opacity duration-200 hover:opacity-90"
        >
          {occasion}
        </button>
      ))}

      <button
        type="button"
        aria-label="Show more occasions"
        className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-[20px] border border-[#E6E6E6] bg-[#F8F8F8] text-[32px] font-light leading-none text-[#7E8CBD]"
      >
        +
      </button>
    </div>
  );
}