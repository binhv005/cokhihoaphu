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
      <PageHero eyebrow={t('about.eyebrow')} title={t('about.title')} breadcrumb={[{ label: t('nav.about') }]} image="/images/products/p00.webp" index="02" />

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
          <ol className="mt-12 border-t border-text/15">
            {fields.map((f, i) => (
              <Reveal as="li" key={f.id} delay={i * 0.04}>
                <Link to={ROUTES.productsBy(f.id)} className="group flex items-baseline gap-6 border-b border-text/15 py-6 md:py-8">
                  <span className="font-mono text-[12px] text-brand-deep">{f.no}</span>
                  <span className="flex-1 text-[clamp(1.3rem,2.4vw,2rem)] font-medium tracking-[-0.02em] text-ink transition-colors group-hover:text-navy">{L(f.title)}</span>
                  <ArrowUpRight size={22} strokeWidth={1.4} className="self-center text-muted transition-colors group-hover:text-brand-deep" />
                </Link>
              </Reveal>
            ))}
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
