import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight } from 'lucide-react'
import LanguageSwitch from './LanguageSwitch'
import Logo from './Logo'
import Navigation from './Navigation'
import FullscreenMenu from './FullscreenMenu'
import { ROUTES } from '../../constants/routes'

/**
 * Header (main nav + chuyển ngôn ngữ VI/EN). Trong suốt trên hero, có nền khi cuộn. Nút Menu mở menu toàn màn hình (mọi kích thước).
 */
export default function Header() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => setMenu(false), [pathname])
  const closeMenu = useCallback(() => setMenu(false), [])

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-brand focus:px-4 focus:py-2 focus:text-ink">{t('nav.skip')}</a>
      <header
        ref={ref}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,transform] duration-500 ${scrolled ? 'bg-ink/85 backdrop-blur-xl' : 'bg-gradient-to-b from-ink/70 to-transparent'}`}
      >
        <div className={`border-b transition-colors duration-500 ${scrolled ? 'border-white/10' : 'border-transparent'}`}>
          <div className="container-x flex h-[72px] items-center justify-between gap-6 md:h-20">
            <Logo />
            <Navigation wrapperRef={ref} />
            <div className="flex items-center gap-3">
              <LanguageSwitch className="text-white/70" />
              <Link to={ROUTES.quote()} className="btn btn-primary hidden shrink-0 px-5 py-3 sm:inline-flex">
                {t('nav.quote')} <ArrowUpRight size={16} />
              </Link>
              <button
                type="button"
                onClick={() => setMenu(true)}
                aria-expanded={menu}
                aria-haspopup="dialog"
                className="group flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.2em] text-white xl:hidden"
              >
                <span className="hidden md:inline">{t('nav.menu')}</span>
                <span className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-white/25 transition-colors group-hover:border-brand">
                  <span className="h-px w-4 bg-current transition-all group-hover:w-5" />
                  <span className="h-px w-4 bg-current" />
                  <span className="h-px w-4 bg-current transition-all group-hover:w-3" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <FullscreenMenu open={menu} onClose={closeMenu} />
    </>
  )
}
