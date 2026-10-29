const events = [
  {
    id: 1,
    title: "Event 1",
  },
  {
    id: 2,
    title: "Event 2",
  },
  {
    id: 3,
    title: "Event 3",
  },
];

export default function GiftCardsEvents() {
  return (
    <section className="w-full font-[var(--font-roboto)]">
      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event, index) => (
          <div
            key={event.id}
            aria-label={event.title}
            className={`
              tm-fade-up
              ${index === 0 ? "tm-delay-1" : ""}
              ${index === 1 ? "tm-delay-2" : ""}
              ${index === 2 ? "tm-delay-3" : ""}
              h-[185px] w-full rounded-[14px] bg-[#F8F8F8]
              transition-all duration-300 ease-out
              hover:-translate-y-[4px]
              hover:shadow-[0_8px_18px_rgba(0,0,0,0.10)]
            `}
          />
        ))}
      </div>
    </section>
  );
}