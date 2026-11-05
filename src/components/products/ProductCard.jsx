import { Link } from 'react-router-dom'
import { m, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight } from 'lucide-react'
import SmartImage from '../common/SmartImage'
import { useLocalized } from '../../hooks/useLocalized'
import { ROUTES } from '../../constants/routes'

export default function ProductCard({ product, index = 0, dark = false }) {
  const { t } = useTranslation()
  const { L } = useLocalized()
  const reduce = useReducedMotion()
  const name = L(product.name)
  return (
    <m.article
      className={`group flex h-full flex-col ${dark ? 'text-white' : 'text-ink'}`}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={ROUTES.product(product.slug)} className="relative block overflow-hidden" aria-label={name}>
        <SmartImage src={product.images[0]} alt={name} ratio="4/3" placeholder={product.placeholder} zoom />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute left-3 top-3 flex gap-2">
          {product.condition && (
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${product.condition === 'new' ? 'bg-steel text-white' : 'bg-white/90 text-ink'}`}>{t(`products.${product.condition}`)}</span>
          )}
          {product.line === 'kuboke' && <span className="rounded-full bg-orange px-2.5 py-1 text-[11px] font-semibold text-ink">Kuboke</span>}
        </div>
        <span className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-orange text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={18} />
        </span>
      </Link>
      <div className={`flex flex-1 flex-col border-b pb-5 pt-5 ${dark ? 'border-white/15' : 'border-text/15'}`}>
        <p className={`font-mono text-[11px] uppercase tracking-[0.16em] ${dark ? 'text-white/45' : 'text-steel'}`}>
          {L(product.subcategoryName)}{product.code ? ` · ${product.code}` : ''}
        </p>
        <h3 className="mt-2 text-[18px] font-semibold leading-snug tracking-[-0.01em] transition-colors group-hover:text-orange">
          <Link to={ROUTES.product(product.slug)}>{name}</Link>
        </h3>
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
          <div className="flex items-center gap-4 text-[13px] font-medium">
            <Link to={ROUTES.product(product.slug)} className="link-arrow">{t('common.viewDetail')}</Link>
            <Link to={ROUTES.quote(product.slug)} className={`link-arrow ${dark ? 'text-orange' : 'text-orange'}`}>{t('common.requestQuote')}</Link>
          </div>
        </div>
      </div>
    </m.article>
  )
}
