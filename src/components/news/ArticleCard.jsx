import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight } from 'lucide-react'
import SmartImage from '../common/SmartImage'
import Reveal from '../common/Reveal'
import { newsCategories } from '../../data/news'
import { useLocalized } from '../../hooks/useLocalized'
import { formatDate } from '../../utils/format'
import { ROUTES } from '../../constants/routes'

export default function ArticleCard({ a, index = 0, large = false }) {
  const { t } = useTranslation()
  const { L, lang } = useLocalized()
  const cat = newsCategories.find((c) => c.id === a.category)
  const title = L(a.title)
  return (
    <Reveal as="article" delay={(index % 3) * 0.07} className={`group ${large ? 'grid gap-8 md:grid-cols-12 md:items-center' : ''}`}>
      <Link to={ROUTES.article(a.slug)} className={`relative block overflow-hidden ${large ? 'md:col-span-6' : ''}`} aria-label={title}>
        <SmartImage src={a.image} alt={title} ratio={large ? '16/10' : '3/2'} placeholder={a.placeholder} zoom />
      </Link>
      <div className={large ? 'md:col-span-5 md:col-start-8' : 'pt-5'}>
        <p className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-steel">
          <span>{L(cat?.name)}</span><span className="text-muted/50">/</span><time dateTime={a.date} className="text-muted">{formatDate(a.date, lang)}</time>
        </p>
        <h3 className={`mt-3 font-semibold leading-snug tracking-[-0.01em] text-ink transition-colors group-hover:text-navy ${large ? 'h3' : 'text-[19px]'}`}>
          <Link to={ROUTES.article(a.slug)}>{title}</Link>
        </h3>
        <p className="mt-3 line-clamp-2 text-[15px] text-muted">{L(a.excerpt)}</p>
        <Link to={ROUTES.article(a.slug)} className="link-arrow mt-5 text-navy">{t('common.readMore')} <ArrowUpRight size={15} /></Link>
      </div>
    </Reveal>
  )
}
