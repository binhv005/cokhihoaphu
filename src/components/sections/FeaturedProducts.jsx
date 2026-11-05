import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import Button from '../common/Button'
import ProductCard from '../products/ProductCard'
import { getFeaturedProducts } from '../../data/productMeta'
import { ROUTES } from '../../constants/routes'

/** Sản phẩm nổi bật – rail cuộn ngang với nút điều hướng. */
export default function FeaturedProducts() {
  const { t } = useTranslation()
  const rail = useRef(null)
  const items = getFeaturedProducts()
  const scroll = (d) => {
    const el = rail.current
    if (!el) return
    el.scrollBy({ left: d * Math.min(el.clientWidth * 0.8, 720), behavior: 'smooth' })
  }
  return (
    <section className="bg-paper py-24 md:py-36">
      <Container>
        <SectionHeading
          eyebrow={t('home.featEyebrow')}
          title={t('home.featTitle')}
          aside={
            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <button type="button" onClick={() => scroll(-1)} aria-label={t('common.prev')} className="flex h-12 w-12 items-center justify-center rounded-full border border-text/20 transition-colors hover:border-navy hover:bg-navy hover:text-white"><ArrowLeft size={18} /></button>
              <button type="button" onClick={() => scroll(1)} aria-label={t('common.next')} className="flex h-12 w-12 items-center justify-center rounded-full border border-text/20 transition-colors hover:border-navy hover:bg-navy hover:text-white"><ArrowRight size={18} /></button>
              <Button to={ROUTES.products} variant="ghostLight" className="sm:ml-2">{t('nav.allProducts')}</Button>
            </div>
          }
        />
      </Container>
      <div
        ref={rail}
        className="rail mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        data-lenis-prevent-wheel=""
      >
        {items.map((p, i) => (
          <div key={p.id} className="w-[82vw] shrink-0 snap-start xs:w-[300px] md:w-[340px]">
            <ProductCard product={p} index={i} />
          </div>
        ))}
      </div>
    </section>
  )
}
