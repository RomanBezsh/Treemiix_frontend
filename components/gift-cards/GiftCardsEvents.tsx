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
        {events.map((event) => (
          <div
            key={event.id}
            aria-label={event.title}
            className="h-[185px] w-full rounded-[14px] bg-[#F8F8F8]"
          />
        ))}
      </div>
    </section>
  );
}