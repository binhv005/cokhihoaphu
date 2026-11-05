import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

/** items: [{label, to?}] – mục cuối là trang hiện tại. */
export default function Breadcrumb({ items, dark = true }) {
  const { t } = useTranslation()
  const all = [{ label: t('nav.home'), to: '/' }, ...items]
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-[12px] uppercase tracking-[0.16em]">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {all.map((it, i) => {
          const last = i === all.length - 1
          return (
            <li key={i} className="flex items-center gap-2">
              {last || !it.to ? (
                <span aria-current={last ? 'page' : undefined} className={dark ? 'text-white' : 'text-ink'}>{it.label}</span>
              ) : (
                <Link to={it.to} className={`transition-colors ${dark ? 'text-white/50 hover:text-orange' : 'text-muted hover:text-navy'}`}>{it.label}</Link>
              )}
              {!last && <span className={dark ? 'text-white/30' : 'text-muted/50'}>/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
