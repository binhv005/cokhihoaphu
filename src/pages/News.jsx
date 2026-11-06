import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageHero from '../components/common/PageHero'
import Container from '../components/common/Container'
import ArticleCard from '../components/news/ArticleCard'
import ProductSearch from '../components/products/ProductSearch'
import Pagination from '../components/common/Pagination'
import { news, newsCategories } from '../data/news'
import { useLocalized } from '../hooks/useLocalized'
import { breadcrumbLd, useSeo } from '../hooks/useSeo'
import { normalizeText } from '../utils/format'

const PER_PAGE = 4

export default function News() {
  const { t } = useTranslation()
  const { L } = useLocalized()
  const [params, setParams] = useSearchParams()
  const [q, setQ] = useState('')
  const cat = params.get('category') || ''
  const page = Math.max(1, Number(params.get('page')) || 1)
  useSeo({ title: t('seo.news'), description: t('news.desc'), jsonLd: breadcrumbLd([{ label: t('nav.home'), to: '/' }, { label: t('nav.news'), to: '/news' }]) })

  const featured = news.find((n) => n.featured)
  const filtered = useMemo(() => {
    const nq = normalizeText(q.trim())
    return news
      .filter((n) => (cat || nq ? true : n !== featured))
      .filter((n) => (!cat || n.category === cat) && (!nq || normalizeText(`${n.title.vi} ${n.title.en} ${n.excerpt.vi} ${n.excerpt.en}`).includes(nq)))
      .sort((a, b) => b.date.localeCompare(a.date))
  }, [cat, q, featured])
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const cur = Math.min(page, pages)
  const shown = filtered.slice((cur - 1) * PER_PAGE, cur * PER_PAGE)

  const setCat = (c) => setParams(c ? { category: c } : {}, { preventScrollReset: true })
  const setPage = (p) => setParams((prev) => {
    const n = new URLSearchParams(prev)
    if (p > 1) n.set('page', p)
    else n.delete('page')
    return n
  }, { preventScrollReset: true })

  return (
    <>
      <PageHero eyebrow={t('news.eyebrow')} title={t('news.title')} desc={t('news.desc')} breadcrumb={[{ label: t('nav.news') }]} image="/images/products/p21.webp" compact index="06" />

      {!cat && !q && featured && (
        <section className="bg-white py-16 md:py-20">
          <Container>
            <ArticleCard a={featured} large />
          </Container>
        </section>
      )}

      <section className="bg-paper py-16 md:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_300px] lg:gap-16">
          <div className="order-2 lg:order-1">
            {shown.length ? (
              <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2">
                {shown.map((a, i) => <ArticleCard key={a.slug} a={a} index={i} />)}
              </div>
            ) : (
              <p className="text-muted">{t('news.empty')}</p>
            )}
            <Pagination page={cur} total={pages} onChange={setPage} className="mt-14 !justify-start" />
          </div>

          <aside className="order-1 space-y-10 lg:order-2">
            <ProductSearch value={q} onChange={(v) => { setQ(v); setPage(1) }} placeholder={t('news.search')} />
            <div>
              <p className="eyebrow mb-4 text-muted">{t('news.categories')}</p>
              <ul className="flex flex-wrap gap-2 lg:block lg:space-y-0">
                {[{ id: '', name: null }, ...newsCategories].map((c) => {
                  const n = c.id ? news.filter((a) => a.category === c.id).length : news.length
                  return (
                    <li key={c.id || 'all'}>
                      <button type="button" onClick={() => setCat(c.id)} aria-pressed={cat === c.id}
                        className={`flex w-full items-center justify-between gap-4 rounded-full border px-4 py-2 text-[14px] transition-colors lg:rounded-none lg:border-0 lg:border-b lg:border-text/10 lg:px-0 lg:py-3 ${cat === c.id ? 'border-navy text-brand-deep' : 'border-text/20 text-ink hover:text-navy'}`}>
                        {c.name ? L(c.name) : t('news.all')}<span className="font-mono text-[11px] text-muted">{n}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </aside>
        </Container>
      </section>
    </>
  )
}
