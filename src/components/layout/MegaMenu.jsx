import { useState } from 'react'
import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight } from 'lucide-react'
import { categories } from '../../data/categories'
import { countByCategory } from '../../data/productMeta'
import { useLocalized } from '../../hooks/useLocalized'
import { ROUTES } from '../../constants/routes'
import SmartImage from '../common/SmartImage'

/** Mega menu Sản phẩm: cột trái danh mục chính, cột phải danh mục con + ảnh đại diện. */
export default function MegaMenu({ onNavigate, id, onMouseEnter, onMouseLeave }) {
  const { t } = useTranslation()
  const { L } = useLocalized()
  const [active, setActive] = useState(categories[0].id)
  const cat = categories.find((c) => c.id === active)

  return (
    <m.div
      id={id}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-x-0 top-full border-t border-white/10 bg-ink/97 shadow-2xl shadow-black/40 backdrop-blur-xl"
    >
      <div className="container-x grid max-h-[calc(100svh-120px)] grid-cols-12 gap-8 overflow-y-auto py-10" data-lenis-prevent>
        <ul className="col-span-4 border-r border-white/10 pr-6" role="list">
          {categories.map((c) => (
            <li key={c.id}>
              <Link
                to={ROUTES.productsBy(c.id)}
                onMouseEnter={() => setActive(c.id)}
                onFocus={() => setActive(c.id)}
                onClick={onNavigate}
                className={`group flex items-baseline gap-4 border-b border-white/5 py-4 transition-colors ${active === c.id ? 'text-orange' : 'text-white/80 hover:text-white'}`}
              >
                <span className="font-mono text-[11px] text-white/40">{c.no}</span>
                <span className="flex-1 text-[16px] font-medium">{L(c.name)}</span>
                <span className="font-mono text-[11px] text-white/40">{countByCategory(c.id)}</span>
              </Link>
            </li>
          ))}
          <li className="pt-6">
            <Link to={ROUTES.products} onClick={onNavigate} className="link-arrow text-white">{t('nav.allProducts')} <ArrowUpRight size={15} /></Link>
          </li>
        </ul>
        <div className="col-span-5">
          <p className="eyebrow mb-5 text-white/40">{L(cat.name)}</p>
          <ul className="grid grid-cols-2 gap-x-6" role="list">
            {cat.children.map((s) => (
              <li key={s.id}>
                <Link to={ROUTES.productsBy(cat.id, s.id)} onClick={onNavigate} className="block border-b border-white/5 py-2.5 text-[14px] text-white/70 transition-colors hover:text-orange">
                  {L(s.name)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-3">
          <SmartImage key={cat.id} src={cat.image} alt={L(cat.name)} ratio="4/5" placeholder={cat.placeholder} className="rounded-sm" />
          <p className="mt-3 text-[13px] leading-snug text-white/55">{L(cat.short)}</p>
        </div>
      </div>
    </m.div>
  )
}
