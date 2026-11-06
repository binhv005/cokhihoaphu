import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight } from 'lucide-react'
import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import SmartImage from '../common/SmartImage'
import Reveal from '../common/Reveal'
import { categories } from '../../data/categories'
import { countByCategory } from '../../data/productMeta'
import { useLocalized } from '../../hooks/useLocalized'
import { ROUTES } from '../../constants/routes'

/** Danh mục sản phẩm: panel ảnh + số thứ tự + tên – không kèm đoạn mô tả. */
export default function CategorySection() {
  const { t } = useTranslation()
  const { L } = useLocalized()
  return (
    <section className="bg-ink py-16 text-white md:py-20">
      <Container>
        <SectionHeading dark eyebrow={t('home.catEyebrow')} title={t('home.catTitle')} />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
          {categories.map((c, i) => (
            <Reveal key={c.id} delay={(i % 3) * 0.06}>
              <Link to={ROUTES.productsBy(c.id)} className="group relative block overflow-hidden">
                <SmartImage src={c.image} alt={L(c.name)} ratio="4/3" placeholder={c.placeholder} zoom />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent transition-colors duration-500 group-hover:from-navy" />
                <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6">
                  <div className="flex justify-between font-mono text-[11px] tracking-[0.16em] text-white/60">
                    <span>[{c.no}]</span><span>{countByCategory(c.id)}</span>
                  </div>
                  <div className="flex items-end justify-between gap-4">
                    <h3 className="text-[clamp(1.25rem,1.9vw,1.7rem)] font-medium leading-tight tracking-[-0.02em] transition-colors duration-500 group-hover:text-brand">{L(c.name)}</h3>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 transition-all duration-500 group-hover:border-brand group-hover:bg-brand group-hover:text-ink"><ArrowUpRight size={15} /></span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
