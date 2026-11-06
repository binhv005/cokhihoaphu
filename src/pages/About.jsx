import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight } from 'lucide-react'
import PageHero from '../components/common/PageHero'
import Container from '../components/common/Container'
import Reveal from '../components/common/Reveal'
import SmartImage from '../components/common/SmartImage'
import Lightbox from '../components/common/Lightbox'
import { fields } from '../data/company'
import { getCategory } from '../data/categories'
import { useLocalized } from '../hooks/useLocalized'
import { breadcrumbLd, organizationLd, useSeo } from '../hooks/useSeo'
import { ROUTES } from '../constants/routes'

const gallery = [0, 12, 55, 2, 49, 21, 39, 28].map((n) => `/images/products/p${String(n).padStart(2, '0')}.webp`)

export default function About() {
  const { t } = useTranslation()
  const { L } = useLocalized()
  const [idx, setIdx] = useState(null)
  useSeo({ title: t('seo.about'), description: t('about.desc'), jsonLd: [organizationLd(), breadcrumbLd([{ label: t('nav.home'), to: '/' }, { label: t('nav.about'), to: '/about' }])] })

  return (
    <>
      <PageHero eyebrow={t('about.eyebrow')} title={t('about.title')} breadcrumb={[{ label: t('nav.about') }]} image={['/images/products/p00.webp', '/images/products/p14.webp', '/images/products/p39.webp', '/images/products/p51.webp', '/images/products/p28.webp']} index="02" />

      {/* Tổng quan */}
      <section className="bg-paper py-16 md:py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal as="h2" className="h2 text-ink">{t('about.overviewTitle')}</Reveal>
            <Reveal as="p" delay={0.06} className="lead mt-6 text-muted">{t('about.desc')}</Reveal>
            <Reveal as="p" delay={0.08} className="mt-4 text-muted">{t('about.p2')}</Reveal>
            <Reveal as="p" delay={0.1} className="mt-4 text-muted">{t('about.p3')}</Reveal>
          </div>
          <Reveal delay={0.08} className="lg:col-span-5 lg:col-start-8">
            <SmartImage src="/images/products/p12.webp" alt="Gian hàng triển lãm Hoà Phú" ratio="4/3" />
          </Reveal>
        </Container>
      </section>

      {/* Lĩnh vực hoạt động */}
      <section className="bg-white py-16 md:py-20">
        <Container>
          <Reveal as="h2" className="h2 text-ink">{t('about.fieldsTitle')}</Reveal>
          {/* lưới thẻ ảnh: thẻ 01 lớn (2 hàng), 4 thẻ còn lại xếp 2×2 */}
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
            {fields.map((f, i) => {
              const big = i === 0
              return (
                <Reveal as="li" key={f.id} delay={i * 0.05} className={big ? 'sm:col-span-2 lg:col-span-1 lg:row-span-2' : ''}>
                  <Link
                    to={ROUTES.productsBy(f.id)}
                    className={`group relative isolate flex h-full flex-col justify-end overflow-hidden bg-ink p-6 text-white md:p-7 ${big ? 'min-h-[340px] lg:min-h-[560px]' : 'min-h-[260px]'}`}
                  >
                    {getCategory(f.id)?.image && (
                      <img src={getCategory(f.id).image} alt="" loading="lazy" decoding="async" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-75 transition-transform duration-700 ease-out group-hover:scale-105" />
                    )}
                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/5 transition-colors duration-500 group-hover:from-navy group-hover:via-navy/70" aria-hidden />
                    <div className="absolute inset-x-6 top-6 flex items-center justify-between md:inset-x-7 md:top-7">
                      <span className="font-mono text-[12px] tracking-[0.15em] text-brand-light">{f.no}</span>
                      <span className="grid size-10 place-items-center rounded-full border border-white/30 transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-logo-ink">
                        <ArrowUpRight size={18} strokeWidth={1.6} />
                      </span>
                    </div>
                    <h3 className={`font-medium tracking-[-0.02em] ${big ? 'text-[clamp(1.6rem,2.6vw,2.2rem)]' : 'text-[clamp(1.25rem,1.8vw,1.5rem)]'} leading-tight`}>{L(f.title)}</h3>
                    <p className={`mt-3 max-w-md text-[14px] leading-relaxed text-white/70 ${big ? 'md:text-[15px]' : ''}`}>{L(f.desc)}</p>
                  </Link>
                </Reveal>
              )
            })}
          </ol>
        </Container>
      </section>

      {/* Gallery */}
      <section className="bg-paper py-16 md:py-20">
        <Container>
          <Reveal as="h2" className="h2 text-ink">{t('about.galleryTitle')}</Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {gallery.map((g, i) => (
              <button key={g} type="button" onClick={() => setIdx(i)} className="group block overflow-hidden" aria-label={`${t('about.galleryTitle')} ${i + 1}`}>
                <SmartImage src={g} alt={`Hình ảnh thiết bị Hoà Phú ${i + 1}`} ratio="4/3" zoom />
              </button>
            ))}
          </div>
        </Container>
        <Lightbox items={gallery.map((g, i) => ({ src: g, alt: `Hoà Phú ${i + 1}` }))} index={idx} onClose={() => setIdx(null)} onChange={setIdx} />
      </section>

    </>
  )
}
