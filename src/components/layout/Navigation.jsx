import { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'
import { NAV_ITEMS } from '../../constants/routes'
import MegaMenu from './MegaMenu'

/** Navigation desktop (xl+) với mega menu cho mục Sản phẩm. */
export default function Navigation({ wrapperRef }) {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const [mega, setMega] = useState(false)
  const timer = useRef()

  const close = useCallback(() => setMega(false), [])
  const openSoon = () => { clearTimeout(timer.current); timer.current = setTimeout(() => setMega(true), 80) }
  const closeSoon = () => { clearTimeout(timer.current); timer.current = setTimeout(() => setMega(false), 180) }

  useEffect(() => close(), [pathname, close])
  useEffect(() => {
    if (!mega) return
    const onKey = (e) => e.key === 'Escape' && setMega(false)
    const onDown = (e) => { if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setMega(false) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onDown) }
  }, [mega, wrapperRef])
  useEffect(() => () => clearTimeout(timer.current), [])

  const linkCls = ({ isActive }) =>
    `relative shrink-0 whitespace-nowrap py-2 text-[14px] font-medium tracking-wide transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-orange after:transition-all after:duration-500 ${isActive ? 'text-white after:w-full' : 'text-white/70 hover:text-white after:w-0 hover:after:w-full'}`

  return (
    <>
      <nav className="hidden items-center gap-6 whitespace-nowrap xl:flex 2xl:gap-8" aria-label="Main">
        {NAV_ITEMS.filter((it) => it.key !== 'home').map((it) =>
          it.mega ? (
            <div key={it.key} className="flex items-center gap-1" onMouseEnter={openSoon} onMouseLeave={closeSoon}>
              <NavLink to={it.to} className={linkCls}>{t(`nav.${it.key}`)}</NavLink>
              <button
                type="button"
                aria-expanded={mega}
                aria-controls="mega-menu"
                aria-label={`${t('nav.products')} – ${t('nav.categories')}`}
                onClick={() => setMega((v) => !v)}
                className="p-1 text-white/70 hover:text-white"
              >
                <ChevronDown size={15} className={`transition-transform duration-300 ${mega ? 'rotate-180' : ''}`} />
              </button>
            </div>
          ) : (
            <NavLink key={it.key} to={it.to} end={it.to === '/'} className={linkCls}>{t(`nav.${it.key}`)}</NavLink>
          ),
        )}
      </nav>
      <AnimatePresence>
        {mega && (
          <MegaMenu key="mega" id="mega-menu" onNavigate={close} onMouseEnter={() => clearTimeout(timer.current)} onMouseLeave={closeSoon} />
        )}
      </AnimatePresence>
    </>
  )
}
