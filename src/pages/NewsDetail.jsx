import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Check, Info, Link2 } from 'lucide-react'
import Container from '../components/common/Container'
import Breadcrumb from '../components/common/Breadcrumb'
import SmartImage from '../components/common/SmartImage'
import Reveal, { LineReveal } from '../components/common/Reveal'
import ArticleCard from '../components/news/ArticleCard'
import CtaBand from '../components/common/CtaBand'
import { FacebookIcon } from '../components/common/BrandIcons'
import NotFound from './NotFound'
import { getArticle, news, newsCategories } from '../data/news'
import { company, SITE_URL } from '../data/company'
import { useLocalized } from '../hooks/useLocalized'
import { breadcrumbLd, useSeo } from '../hooks/useSeo'
import { formatDate } from '../utils/format'
import { ROUTES } from '../constants/routes'

function Body({ blocks }) {
  const { L } = useLocalized()
  return (
    <div className="space-y-6 text-[17px] leading-[1.8] text-text/85">
      {blocks.map((b, i) => {
        if (b.t === 'h2') return <h2 key={i} className="!mt-12 text-[28px] font-semibold leading-tight tracking-[-0.01em] text-ink">{L(b)}</h2>
        if (b.t === 'h3') return <h3 key={i} className="!mt-9 text-[21px] font-semibold text-ink">{L(b)}</h3>
        if (b.t === 'ul') return <ul key={i} className="space-y-2">{L(b).map((x) => <li key={x} className="flex gap-3"><Check size={18} className="mt-1.5 shrink-0 text-orange" aria-hidden />{x}</li>)}</ul>
        if (b.t === 'img') return (
          <figure key={i} className="!my-10">
            <SmartImage src={b.src} alt={L(b)} ratio="16/10" />
            <figcaption className="mt-3 font-mono text-[12px] uppercase tracking-[0.12em] text-muted">{L(b)}</figcaption>
          </figure>
        )
        return <p key={i}>{L(b)}</p>
      })}
    </div>
  )
}

function Article({ a }) {
  const { t } = useTranslation()
  const { L, lang } = useLocalized()
  const [copied, setCopied] = useState(false)
  const cat = newsCategories.find((c) => c.id === a.category)
  const title = L(a.title)
  const url = SITE_URL + ROUTES.article(a.slug)
  const related = news.filter((n) => n.slug !== a.slug).sort((x, y) => (y.category === a.category) - (x.category === a.category)).slice(0, 3)

  useSeo({
    title,
    description: L(a.excerpt),
    image: a.image,
    type: 'article',
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'Article', headline: title, image: a.image ? SITE_URL + a.image : undefined, datePublished: a.date, author: { '@type': 'Organization', name: company.name }, publisher: { '@type': 'Organization', name: company.name, logo: { '@type': 'ImageObject', url: SITE_URL + company.logo } } },
      breadcrumbLd([{ label: t('nav.home'), to: '/' }, { label: t('nav.news'), to: '/news' }, { label: title, to: ROUTES.article(a.slug) }]),
    ],
  })

  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* clipboard không khả dụng */ }
  }

  return (
    <>
      <section className="bg-ink pb-16 pt-32 text-white md:pb-20 md:pt-40">
        <Container>
          <Breadcrumb items={[{ label: t('nav.news'), to: ROUTES.news }, { label: title }]} />
          <div className="mt-10 max-w-4xl">
            <p className="flex flex-wrap items-center gap-3 font-mono text-[12px] uppercase tracking-[0.16em]">
              <span className="text-orange">{L(cat?.name)}</span><span className="text-white/30">/</span>
              <time dateTime={a.date} className="text-white/60">{formatDate(a.date, lang)}</time>
              {a.isDemo && <span className="rounded-full bg-yellow px-2.5 py-0.5 text-[10px] font-semibold text-ink">{t('common.sample')}</span>}
            </p>
            <h1 className="h1 mt-6"><LineReveal lines={[title]} animateOnMount /></h1>
          </div>
        </Container>
      </section>
      <section className="bg-white pb-20 md:pb-28">
        <Container>
          <div className="-mt-px">
            <SmartImage src={a.image} alt={title} ratio="16/9" eager placeholder={a.placeholder} className="mx-auto max-w-4xl" />
          </div>
          <div className="mt-14 grid gap-12 lg:grid-cols-12">
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow mb-4 text-muted">{t('news.share')}</p>
                <div className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light px-4 py-2.5"><FacebookIcon size={16} /> Facebook</a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light px-4 py-2.5">LinkedIn</a>
                  <button type="button" onClick={copy} className="btn btn-ghost-light px-4 py-2.5"><Link2 size={16} /> {copied ? t('news.copied') : t('news.copy')}</button>
                </div>
              </div>
            </aside>
            <article className="lg:col-span-7">
              {a.isDemo && (
                <p className="mb-8 flex items-start gap-2 rounded-sm bg-yellow/20 p-4 text-[14px] text-text"><Info size={16} className="mt-0.5 shrink-0" aria-hidden />{t('news.sampleNote')}</p>
              )}
              <p className="mb-8 text-[20px] font-medium leading-relaxed text-ink">{L(a.excerpt)}</p>
              <Body blocks={a.body} />
            </article>
          </div>
        </Container>
      </section>
      <section className="bg-paper py-20 md:py-28">
        <Container>
          <Reveal as="h2" className="h2 mb-12 text-ink">{t('news.related')}.</Reveal>
          <div className="grid gap-x-6 gap-y-14 md:grid-cols-3">{related.map((r, i) => <ArticleCard key={r.slug} a={r} index={i} />)}</div>
        </Container>
      </section>
      <CtaBand />
    </>
  )
}

export default function NewsDetail() {
  const { slug } = useParams()
  const a = getArticle(slug)
  if (!a) return <NotFound />
  return <Article key={a.slug} a={a} />
}
