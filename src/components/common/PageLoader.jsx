export default function PageLoader() {
  return (
    <div className="flex min-h-[70svh] items-center justify-center bg-ink" role="status" aria-live="polite">
      <span className="h-px w-24 overflow-hidden bg-white/10">
        <span className="block h-full w-1/2 animate-[marquee_1s_linear_infinite] bg-orange" />
      </span>
      <span className="sr-only">Loading…</span>
    </div>
  )
}
