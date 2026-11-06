/** Dải chữ lớn chạy ngang trên nền xanh. `reverse` → chạy ngược chiều. */
export default function MarqueeStrip({ items = [], label, reverse = false }) {
  return (
    <section aria-label={label} className="select-none overflow-hidden bg-gradient-to-r from-[#1b3566] via-[#3f6aa8] to-[#1b3566] py-6 shadow-[inset_0_1px_0_rgba(255,255,255,.15)]">
      <ul className={`animate-marquee flex w-max gap-12 whitespace-nowrap ${reverse ? '[animation-direction:reverse]' : ''}`}>
        {[...items, ...items].map((a, i) => (
          <li key={i} aria-hidden={i >= items.length} className="flex items-center gap-12 text-[clamp(2rem,5vw,4.2rem)] font-medium tracking-[-0.03em] text-white">
            {a}<span className="h-3 w-3 rotate-45 bg-white/80" />
          </li>
        ))}
      </ul>
    </section>
  )
}
