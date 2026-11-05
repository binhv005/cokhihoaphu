import { useId, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Plus } from 'lucide-react'

/** items: [{q, a}] */
export default function Accordion({ items, dark = false }) {
  const [open, setOpen] = useState(0)
  const base = useId()
  return (
    <div className={`border-t ${dark ? 'border-white/15' : 'border-text/15'}`}>
      {items.map((it, i) => {
        const isOpen = open === i
        const id = `${base}-${i}`
        return (
          <div key={i} className={`border-b ${dark ? 'border-white/15' : 'border-text/15'}`}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={id}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className={`flex w-full items-center gap-6 py-6 text-left text-[17px] font-medium transition-colors md:text-[19px] ${dark ? 'text-white hover:text-orange' : 'text-ink hover:text-navy'}`}
              >
                <span className="font-mono text-[12px] text-orange">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1">{it.q}</span>
                <Plus size={20} className={`shrink-0 transition-transform duration-500 ${isOpen ? 'rotate-45 text-orange' : ''}`} aria-hidden />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div id={id} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                  <p className={`pb-7 pl-[calc(12px+1.5rem+0.75rem)] pr-10 ${dark ? 'text-white/65' : 'text-muted'}`}>{it.a}</p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
