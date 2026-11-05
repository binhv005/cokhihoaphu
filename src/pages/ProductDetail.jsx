import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ExternalLink, Phone, PlayCircle } from 'lucide-react'
import Container from '../components/common/Container'
import Breadcrumb from '../components/common/Breadcrumb'
import Button from '../components/common/Button'
import Reveal from '../components/common/Reveal'
import CtaBand from '../components/common/CtaBand'
import ProductGallery from '../components/products/ProductGallery'
import SpecificationTable from '../components/products/SpecificationTable'
import ProductGrid from '../components/products/ProductGrid'
import NotFound from './NotFound'
import { getProductBySlug, getRelatedProducts, loadProductDetail } from '../data/products'
import { company, SITE_URL } from '../data/company'
import { useLocalized } from '../hooks/useLocalized'
import { breadcrumbLd, useSeo } from '../hooks/useSeo'
import { ROUTES } from '../constants/routes'

/** Video YouTube – chỉ tải iframe khi người dùng bấm (không tải video nặng khi mở trang). */
function Video({ id, title }) {
  const { t } = useTranslation()
  const [play, setPlay] = useState(false)
  return (
    <div className="relative aspect-video max-w-[720px] overflow-hidden bg-ink">
      {play ? (
        <iframe className="absolute inset-0 h-full w-full" src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
      ) : (
        <button type="button" onClick={() => setPlay(true)} className="group absolute inset-0 flex items-center justify-center" aria-label={`${t('detail.video')}: ${title}`}>
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" width="480" height="360" loading="lazy" className="absolute inset-0 m-auto max-h-[360px] max-w-[480px] object-cover opacity-70" />
          <PlayCircle size={64} strokeWidth={1.2} className="relative text-white transition-transform group-hover:scale-110" />
        </button>
      )}
    </div>
  )
}

function Detail({ product: base }) {
  const { t } = useTranslation()
  const { L } = useLocalized()
  // chi tiết (mô tả, thông số, video, toàn bộ ảnh) tải riêng theo từng sản phẩm
  const [detail, setDetail] = useState(null)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    let alive = true
    loadProductDetail(base.slug).then((d) => alive && setDetail(d)).catch(() => alive && setFailed(true))
    return () => { alive = false }
  }, [base.slug])
  const product = { short: '', paragraphs: [], specTable: null, video: null, source: null, ...base, ...(detail ?? {}), images: detail?.images ?? base.images }
  const loading = !detail && !failed
  const name = L(product.name)
  const related = getRelatedProducts(product)

  useSeo({
    title: `${name} – ${L(product.subcategoryName)}`,
    description: product.short || `${name} – ${L(product.categoryName)}`,
    image: product.images[0],
    type: 'product',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name,
        sku: product.code || undefined,
        image: product.images.map((i) => SITE_URL + i),
        description: product.short || undefined,
        category: L(product.categoryName),
        itemCondition: product.condition === 'used' ? 'https://schema.org/UsedCondition' : product.condition === 'new' ? 'https://schema.org/NewCondition' : undefined,
        brand: { '@type': 'Organization', name: company.name },
      },
      breadcrumbLd([
        { label: t('nav.home'), to: '/' },
        { label: t('nav.products'), to: '/products' },
        { label: L(product.categoryName), to: ROUTES.productsBy(product.categoryId) },
        { label: name, to: ROUTES.product(product.slug) },
      ]),
    ],
  })

  const rows = [
    product.code && [t('detail.code'), product.code],
    [t('detail.type'), L(product.subcategoryName)],
    [t('detail.line'), L(product.lineName)],
    product.condition && [t('detail.condition'), t(`products.${product.condition}`)],
    [t('detail.price'), t('common.contactPrice')],
  ].filter(Boolean)

  return (
    <>
      <section className="bg-ink pb-10 pt-32 text-white md:pt-40">
        <Container>
          <Breadcrumb items={[
            { label: t('nav.products'), to: ROUTES.products },
            { label: L(product.categoryName), to: ROUTES.productsBy(product.categoryId) },
            { label: L(product.subcategoryName), to: ROUTES.productsBy(product.categoryId, product.subcategoryId) },
            { label: name },
          ]} />
        </Container>
      </section>

      <section className="bg-paper pb-20 pt-10 md:pb-28">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} alt={name} placeholder={product.placeholder} />
          </div>
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h1 className="text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-ink">{name}</h1>
              {product.short && <p className="mt-5 text-[16px] text-text/80">{product.short}</p>}

              <dl className="mt-8 divide-y divide-text/10 border-y border-text/10 text-[14px]">
                {rows.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-3"><dt className="text-muted">{k}</dt><dd className="text-right font-medium text-ink">{v}</dd></div>
                ))}
              </dl>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button to={ROUTES.quote(product.slug)}>{t('common.requestQuote')}</Button>
                <Button href={`tel:${company.hotlineTel}`} variant="ghostLight" icon={Phone}>{company.hotline}</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 md:py-28">
        <Container className="max-w-[1100px]">
          {product.paragraphs.length > 0 && (
            <Reveal className="mb-16 grid gap-6 md:grid-cols-12">
              <h2 className="h2 text-ink md:col-span-4">{t('detail.intro')}</h2>
              <div className="space-y-4 text-[16px] leading-relaxed text-text/85 md:col-span-8">
                {product.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </Reveal>
          )}

          <Reveal as="h2" className="h2 mb-8 text-ink">{t('detail.specs')}</Reveal>
          {loading ? (
            <div className="space-y-2" aria-busy="true">{Array.from({ length: 5 }, (_, i) => <div key={i} className="h-10 animate-pulse bg-paper" />)}</div>
          ) : (
            <SpecificationTable table={product.specTable} />
          )}

          {product.video && (
            <div className="mt-16">
              <Reveal as="h2" className="h2 mb-8 text-ink">{t('detail.video')}</Reveal>
              <Video id={product.video} title={name} />
            </div>
          )}

          {product.source && <p className="mt-10 flex items-center gap-2 text-[13px] text-muted">
            <ExternalLink size={14} aria-hidden />
            {t('detail.source')}{' '}
            <a href={product.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-navy">hoaphuco.com.vn</a>
          </p>}
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-paper py-20 md:py-28">
          <Container>
            <Reveal as="h2" className="h2 mb-12 text-ink">{t('detail.related')}.</Reveal>
            <ProductGrid products={related} cols="sm:grid-cols-2 lg:grid-cols-4" />
          </Container>
        </section>
      )}

      <CtaBand product={product.slug} />
    </>
  )
}

export default function ProductDetail() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  if (!product) return <NotFound />
  return <Detail key={product.id} product={product} />
}
