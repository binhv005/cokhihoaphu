import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight, Info } from 'lucide-react'
import PageHero from '../components/common/PageHero'
import Container from '../components/common/Container'
import Reveal from '../components/common/Reveal'
import SmartImage from '../components/common/SmartImage'
import Button from '../components/common/Button'
import { solutions } from '../data/solutions'
import { getProductBySlug } from '../data/products'
import { useLocalized } from '../hooks/useLocalized'
import { breadcrumbLd, useSeo } from '../hooks/useSeo'
import { ROUTES } from '../constants/routes'

export default function Solutions() {
  const { t } = useTranslation()
  const { L } = useLocalized()
  useSeo({ title: t('seo.solutions'), description: t('solutions.desc'), jsonLd: breadcrumbLd([{ label: t('nav.home'), to: '/' }, { label: t('nav.solutions'), to: '/solutions' }]) })

  return (
    <>
      <PageHero eyebrow={t('solutions.eyebrow')} title={t('solutions.title')} desc={t('solutions.desc')} breadcrumb={[{ label: t('nav.solutions') }]} image={['/images/products/p58.webp', '/images/products/p34.webp', '/images/products/p12.webp', '/images/products/p65.webp', '/images/products/p07.webp']} index="04" />

      <div className="bg-paper">
        {solutions.map((s, i) => {
          const flip = i % 2 === 1
          const related = s.products.map(getProductBySlug).filter(Boolean)
          return (
            <section key={s.id} id={s.id} className="scroll-mt-24 border-b border-text/10 py-16 md:py-20">
              <Container className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
                <Reveal className={`lg:col-span-6 ${flip ? 'lg:order-2 lg:col-start-7 lg:row-start-1' : ''}`}>
                  <div className="relative max-w-[600px]">
                    <SmartImage src={s.image} alt={L(s.title)} ratio="4/3" placeholder={s.placeholder} />
                    <span className="absolute -top-5 left-5 bg-brand px-3 py-1.5 font-mono text-[12px] font-semibold tracking-[0.18em] text-ink">{s.no} / 0{solutions.length}</span>
                  </div>
                </Reveal>
                <div className={`lg:col-span-5 ${flip ? 'lg:order-1 lg:col-start-1 lg:row-start-1' : 'lg:col-start-8'}`}>
                  <Reveal as="h2" className="h2 text-ink">{L(s.title)}.</Reveal>
                  <Reveal as="p" delay={0.05} className="lead mt-6 text-muted">{L(s.desc)}</Reveal>


                  <Reveal delay={0.14} className="mt-8">
                    <p className="eyebrow mb-3 text-steel">{t('solutions.related')}</p>
                    <ul className="border-t border-text/15">
                      {related.map((p) => (
                        <li key={p.id}>
                          <Link to={ROUTES.product(p.slug)} className="group flex items-center gap-4 border-b border-text/15 py-3">
                            <SmartImage src={p.images[0]} alt="" ratio="4/3" placeholder={p.placeholder} className="w-16 shrink-0" />
                            <span className="flex-1 text-balance text-[15px] font-medium text-ink group-hover:text-navy">{L(p.name)}</span>
                            <ArrowUpRight size={16} className="text-muted group-hover:text-brand-deep" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                  <Reveal delay={0.18} className="mt-8">
                    <Button to={ROUTES.quote(L(s.title))} variant="navy">{t('solutions.cta')}</Button>
                  </Reveal>
                </div>
              </Container>
            </section>
          )
        })}
        <Container className="py-10">
          <p className="flex items-start gap-2 text-[13px] text-muted"><Info size={15} className="mt-0.5 shrink-0" aria-hidden />{t('solutions.note')}</p>
        </Container>
      </div>
    </>
  )
}
