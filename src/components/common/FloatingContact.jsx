import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowUp, MessageCircle, Phone, X } from 'lucide-react'
import { company } from '../../data/company'
import { MessengerIcon, ZaloIcon } from './BrandIcons'
import { scrollToTop } from '../../hooks/useSmoothScroll'

function Item({ href, label, children, className = '', onClick }) {
  const props = href
    ? { href, ...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}) }
    : { type: 'button', onClick }
  const Tag = href ? 'a' : 'button'
  return (
    <Tag {...props} aria-label={label} className={`group relative flex h-12 w-12 items-center justify-center rounded-full shadow-lg shadow-black/20 transition-transform duration-300 hover:-translate-y-0.5 ${className}`}>
      {children}
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-[12px] font-medium text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 translate-x-1 group-hover:translate-x-0">
        {label}
      </span>
    </Tag>
  )
}

/** Cụm liên hệ nổi: Gọi / Zalo / Messenger / Lên đầu trang. Thu gọn thành 1 nút trên mobile. */
export default function FloatingContact() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const items = (
    <>
      <Item href={`tel:${company.hotlineTel}`} label={t('floating.call')} className="bg-[#e53935] text-white">
        <Phone size={19} strokeWidth={2} />
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#e53935]/40 [animation-duration:2.4s]" aria-hidden />
      </Item>
      <Item href={company.zalo} label={t('floating.zalo')} className="bg-[#0068ff] text-white"><ZaloIcon size={30} /></Item>
      <Item href={company.messenger} label={t('floating.messenger')} className="bg-[linear-gradient(45deg,#0099ff,#a033ff_60%,#ff5280_90%,#ff7061)] text-white"><MessengerIcon size={22} /></Item>
    </>
  )

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* Desktop / tablet: luôn hiện */}
      <div className="hidden flex-col gap-3 sm:flex">{items}</div>

      {/* Mobile: thu gọn */}
      <AnimatePresence>
        {open && (
          <m.div className="flex flex-col gap-3 sm:hidden" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
            {items}
          </m.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? t('floating.close') : t('floating.open')}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e53935] text-white shadow-lg shadow-black/25 sm:hidden"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      <AnimatePresence>
        {showTop && (
          <m.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
            <Item label={t('floating.top')} onClick={() => scrollToTop()} className="h-11 w-11 border border-white/15 bg-ink/90 text-white backdrop-blur">
              <ArrowUp size={18} />
            </Item>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
