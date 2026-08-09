/**
 * A quiet scrolling ribbon of destination names. These are drawn from the
 * confirmed catalogue on the existing site (destinations Yana Travels offers) —
 * decorative, no prices or other invented claims.
 */
const destinations = [
  "Kashmir",
  "Leh–Ladakh",
  "Kerala",
  "Goa",
  "Rajasthan",
  "Andaman",
  "Meghalaya",
  "Sikkim",
  "Dubai",
  "Singapore",
  "Bali",
  "Maldives",
  "Thailand",
  "Vietnam",
  "Nepal",
  "Bhutan",
  "Europe",
  "Mauritius",
];

export function DestinationMarquee() {
  const row = [...destinations, ...destinations];
  return (
    <div className="border-y border-border-soft bg-bg-soft py-6">
      <div
        className="group flex overflow-hidden"
        style={{ maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}
      >
        <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
          {row.map((d, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-heading text-xl font-bold text-deep/70"
            >
              {d}
              <span className="ml-10 text-primary/50">✦</span>
            </span>
          ))}
        </div>
        <div
          aria-hidden
          className="flex shrink-0 animate-marquee items-center gap-10 pr-10"
        >
          {row.map((d, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-heading text-xl font-bold text-deep/70"
            >
              {d}
              <span className="ml-10 text-primary/50">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
