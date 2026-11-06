import { useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, m } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight, X } from 'lucide-react'
import { NAV_ITEMS, ROUTES } from '../../constants/routes'
import { categories } from '../../data/categories'
import { company } from '../../data/company'
import { useLocalized } from '../../hooks/useLocalized'
import { getLenis } from '../../hooks/useSmoothScroll'
import LanguageSwitch from './LanguageSwitch'
import Logo from './Logo'
import { FacebookIcon } from '../common/BrandIcons'

/** Menu toàn màn hình kiểu cinematic, danh sách đánh số + ảnh xem trước. */
export default function FullscreenMenu({ open, onClose }) {
  const { t } = useTranslation()
  const { L } = useLocalized()
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const lenis = getLenis()
    lenis?.stop()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      lenis?.start()
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-[80] overflow-y-auto bg-ink text-white"
          role="dialog" aria-modal="true" aria-label={t('nav.menu')}
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          data-lenis-prevent
        >
          <div className="pointer-events-none fixed inset-0 bg-[url('/images/banner-hoaphu.webp')] bg-[length:auto] bg-right-bottom bg-no-repeat opacity-[0.08] mix-blend-luminosity" aria-hidden />

          <div className="relative flex min-h-full flex-col">
            <div className="container-x flex h-20 items-center justify-between">
              <Logo onClick={onClose} />
              <div className="flex items-center gap-6">
                <LanguageSwitch className="text-white" />
                <button ref={closeRef} type="button" onClick={onClose} className="group flex items-center gap-3 text-[13px] uppercase tracking-[0.18em]">
                  <span className="hidden sm:inline">{t('nav.close')}</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-colors group-hover:border-brand group-hover:text-brand"><X size={18} /></span>
                </button>
              </div>
            </div>

            <div className="container-x grid flex-1 gap-12 py-10 lg:grid-cols-12 lg:py-14">
              <nav className="lg:col-span-7" aria-label="Main">
                <ul>
                  {NAV_ITEMS.map((it, i) => (
                    <m.li key={it.key} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                      <NavLink
                        to={it.to}
                        end={it.to === '/'}
                        onClick={onClose}
                        className={({ isActive }) => `group flex items-baseline gap-5 border-b border-white/10 py-3 transition-colors md:py-4 ${isActive ? 'text-brand' : 'hover:text-brand'}`}
                      >
                        <span className="font-mono text-[12px] text-white/40">[{String(i + 1).padStart(2, '0')}]</span>
                        <span className="text-[clamp(1.9rem,5vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.02em]">{t(`nav.${it.key}`)}</span>
                        <ArrowUpRight className="ml-auto self-center opacity-0 transition-opacity group-hover:opacity-100" size={28} strokeWidth={1.3} />
                      </NavLink>
                    </m.li>
                  ))}
                </ul>
              </nav>

              <m.aside className="flex flex-col gap-12 lg:col-span-4 lg:col-start-9" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55, duration: 0.8 }}>
                <div>
                  <p className="eyebrow mb-5 text-white/40">{t('nav.categories')}</p>
                  <ul className="space-y-1">
                    {categories.map((c) => (
                      <li key={c.id}>
                        <Link to={ROUTES.productsBy(c.id)} onClick={onClose} className="flex gap-3 py-1.5 text-[16px] text-white/75 transition-colors hover:text-brand">
                          <span className="font-mono text-[11px] leading-7 text-white/35">{c.no}</span>{L(c.name)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3 text-[14px] text-white/60">
                  <p className="eyebrow text-white/40">{t('footer.contact')}</p>
                  <p>{company.address}</p>
                  <a href={`tel:${company.hotlineTel}`} className="block font-mono text-[22px] text-white hover:text-brand">{company.hotline}</a>
                  <a href={company.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white"><FacebookIcon size={16} /> facebook.com/hoaphuco</a>
                </div>
                <Link to={ROUTES.quote()} onClick={onClose} className="btn btn-primary self-start">{t('nav.quote')} <ArrowUpRight size={17} /></Link>
              </m.aside>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
