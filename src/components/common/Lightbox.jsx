import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, m } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { getImageSize } from '../../utils/imageSizes'

/** items: [{src, alt, caption}] ; index: number | null */
export default function Lightbox({ items, index, onClose, onChange }) {
  const { t } = useTranslation()
  const open = index !== null && index !== undefined
  const go = (d) => onChange((index + d + items.length) % items.length)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onChange((index + 1) % items.length)
      if (e.key === 'ArrowLeft') onChange((index - 1 + items.length) % items.length)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, index, items.length, onClose, onChange])

  return createPortal(
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} role="dialog" aria-modal="true" aria-label={items[index]?.alt}
          data-lenis-prevent
        >
          <button type="button" onClick={onClose} aria-label={t('common.close')} className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white hover:border-orange hover:text-orange"><X size={20} /></button>
          {items.length > 1 && (
            <>
              <button type="button" onClick={(e) => { e.stopPropagation(); go(-1) }} aria-label={t('common.prev')} className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white hover:border-orange hover:text-orange sm:left-6"><ChevronLeft size={20} /></button>
              <button type="button" onClick={(e) => { e.stopPropagation(); go(1) }} aria-label={t('common.next')} className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white hover:border-orange hover:text-orange sm:right-6"><ChevronRight size={20} /></button>
            </>
          )}
          <m.figure key={index} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img src={items[index].src} alt={items[index].alt} style={getImageSize(items[index].src) ? { maxWidth: `min(100%, ${getImageSize(items[index].src)[0]}px)` } : undefined} className="mx-auto max-h-[78svh] w-auto object-contain" />
            <figcaption className="mt-4 flex justify-between gap-4 font-mono text-[12px] uppercase tracking-[0.14em] text-white/60">
              <span>{items[index].caption ?? items[index].alt}</span>
              <span>{String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
            </figcaption>
          </m.figure>
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
