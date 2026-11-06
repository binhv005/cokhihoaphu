import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Phone } from 'lucide-react'
import PageHero from '../components/common/PageHero'
import Container from '../components/common/Container'
import Reveal from '../components/common/Reveal'
import SmartImage from '../components/common/SmartImage'
import QuoteForm from '../components/forms/QuoteForm'
import { getProductBySlug } from '../data/products'
import { company } from '../data/company'
import { useLocalized } from '../hooks/useLocalized'
import { breadcrumbLd, useSeo } from '../hooks/useSeo'

export default function RequestQuote() {
  const { t } = useTranslation()
  const { L } = useLocalized()
  const [params] = useSearchParams()
  const raw = params.get('product') || ''
  // ?product=<slug> → tự điền tên sản phẩm; nếu không khớp slug thì dùng nguyên văn
  const product = getProductBySlug(raw)
  const initialProduct = product ? L(product.name) : raw
  const steps = t('quote.steps', { returnObjects: true })

  useSeo({ title: t('seo.quote'), description: t('quote.desc'), jsonLd: breadcrumbLd([{ label: t('nav.home'), to: '/' }, { label: t('nav.quote'), to: '/request-quote' }]) })

  return (
    <>
      <PageHero eyebrow={t('quote.eyebrow')} title={t('quote.title')} desc={t('quote.desc')} breadcrumb={[{ label: t('nav.quote') }]} image={['/images/products/p55.webp', '/images/products/p28.webp', '/images/products/p14.webp', '/images/products/p58.webp', '/images/products/p49.webp']} compact />
      <section className="bg-paper py-16 md:py-20">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {/* key để form khởi tạo lại khi đổi sản phẩm / ngôn ngữ */}
            <QuoteForm key={`${raw}|${initialProduct}`} initialProduct={initialProduct} initialCategory={product?.categoryId ?? ''} prefilled={Boolean(raw)} />
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="space-y-8 lg:sticky lg:top-28">
              {product && (
                <Reveal className="bg-white p-5">
                  <SmartImage src={product.images[0]} alt={L(product.name)} ratio="4/3" placeholder={product.placeholder} />
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-steel">{L(product.subcategoryName)}</p>
                  <p className="mt-1 text-[17px] font-semibold text-ink">{L(product.name)}</p>
                </Reveal>
              )}
              <Reveal className="bg-navy p-7 text-white">
                <p className="eyebrow text-brand">{t('quote.process')}</p>
                <ol className="mt-6 space-y-5">
                  {Array.isArray(steps) && steps.map((s, i) => (
                    <li key={i} className="flex gap-4"><span className="font-mono text-[12px] text-brand">0{i + 1}</span><span className="text-[15px] text-white/85">{s}</span></li>
                  ))}
                </ol>
                <div className="mt-8 border-t border-white/15 pt-6">
                  <p className="text-[13px] text-white/55">{t('common.contactPerson')}: {company.contactPerson}</p>
                  <a href={`tel:${company.hotlineTel}`} className="mt-2 flex items-center gap-3 font-mono text-[24px] hover:text-brand"><Phone size={20} className="text-brand" />{company.hotline}</a>
                </div>
              </Reveal>
            </div>
          </aside>
        </Container>
      </section>
    </>
  )
}
