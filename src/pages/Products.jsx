import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SlidersHorizontal, X } from 'lucide-react'
import PageHero from '../components/common/PageHero'
import Container from '../components/common/Container'
import ProductGrid from '../components/products/ProductGrid'
import ProductFilter from '../components/products/ProductFilter'
import ProductSearch from '../components/products/ProductSearch'
import Pagination from '../components/common/Pagination'
import { categories, getCategory, getSubcategory } from '../data/categories'
import { useLocalized } from '../hooks/useLocalized'
import { useProductFilters } from '../hooks/useProductFilters'
import { breadcrumbLd, useSeo } from '../hooks/useSeo'
import { getLenis } from '../hooks/useSmoothScroll'

const PER_PAGE = 12

export default function Products() {
  const { t } = useTranslation()
  const { L, lang } = useLocalized()
  const { value, page, update, clear, results, activeCount } = useProductFilters(lang)
  const [drawer, setDrawer] = useState(false)
  const cat = getCategory(value.category)
  const sub = getSubcategory(value.category, value.type)
  const listTop = useRef(null)
  const totalPages = Math.max(1, Math.ceil(results.length / PER_PAGE))
  const current = Math.min(page, totalPages)
  const from = (current - 1) * PER_PAGE
  const pageItems = results.slice(from, from + PER_PAGE)
  const goPage = (p) => {
    update({ page: p > 1 ? String(p) : '' })
    const el = listTop.current
    if (!el) return
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(el, { offset: -110, duration: 0.8 })
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: 'smooth' })
  }
  useEffect(() => {
    if (!drawer) return
    const lenis = getLenis()
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setDrawer(false)
    document.addEventListener('keydown', onKey)
    return () => { lenis?.start(); document.body.style.overflow = ''; document.removeEventListener('keydown', onKey) }
  }, [drawer])

  const crumbs = [{ label: t('nav.products'), to: cat ? '/products' : undefined }]
  if (cat) crumbs.push({ label: L(cat.name), to: sub ? `/products?category=${cat.id}` : undefined })
  if (sub) crumbs.push({ label: L(sub.name) })

  const title = sub ? L(sub.name) : cat ? L(cat.name) : t('products.title')
  useSeo({
    title: cat ? `${title} – ${t('nav.products')}` : t('seo.products'),
    description: cat ? L(cat.short) : t('products.desc'),
    jsonLd: breadcrumbLd([{ label: t('nav.home'), to: '/' }, { label: t('nav.products'), to: '/products' }]),
  })

  const typeOptions = (cat ? [cat] : categories).flatMap((c) => c.children.map((s) => ({ ...s, cat: c.id })))
  const filterProps = { value, onChange: (p) => update(p), onClear: clear }

  return (
    <>
      <PageHero eyebrow={t('products.eyebrow')} title={title} desc={cat ? L(cat.short) : t('products.desc')} breadcrumb={crumbs} image={cat?.image ?? '/images/products/p55.webp'} compact index="03">
        <div className="max-w-xl"><ProductSearch dark value={value.q} onChange={(q) => update({ q })} /></div>
      </PageHero>

      <section className="bg-paper py-14 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[270px_1fr] lg:gap-14">
          {/* Sidebar desktop */}
          <aside className="hidden lg:block" aria-label={t('products.filters')}>
            <div className="sticky top-28 max-h-[calc(100svh-8rem)] overflow-y-auto pb-6 pr-2" data-lenis-prevent>
              <ProductFilter {...filterProps} />
            </div>
          </aside>

          <div className="min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col gap-4 border-b border-text/15 pb-5 md:flex-row md:items-center md:justify-between">
              <p className="text-[14px] text-muted" aria-live="polite">
                <span className="font-semibold text-ink">{t('products.results', { count: results.length })}</span>
                {results.length > PER_PAGE && <span className="ml-2">· {t('products.showing', { from: from + 1, to: from + pageItems.length })}</span>}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button type="button" onClick={() => setDrawer(true)} className="btn btn-ghost-light px-4 py-2.5 lg:hidden">
                  <SlidersHorizontal size={16} /> {t('products.filters')} {activeCount > 0 && <span className="rounded-full bg-brand px-1.5 text-[11px] text-ink">{activeCount}</span>}
                </button>
                <label className="flex items-center gap-2 text-[13px] text-muted">
                  <span className="sr-only sm:not-sr-only">{t('products.type')}</span>
                  <select
                    value={value.type}
                    onChange={(e) => {
                      const s = typeOptions.find((o) => o.id === e.target.value)
                      update({ type: e.target.value, category: s ? s.cat : value.category })
                    }}
                    className="max-w-[200px] rounded-full border border-text/20 bg-white px-4 py-2.5 text-[13px] text-ink outline-none focus:border-navy"
                  >
                    <option value="">{t('products.allTypes')}</option>
                    {typeOptions.map((o) => <option key={o.id} value={o.id}>{L(o.name)}</option>)}
                  </select>
                </label>
                <label className="flex items-center gap-2 text-[13px] text-muted">
                  <span className="sr-only sm:not-sr-only">{t('products.sort')}</span>
                  <select value={value.sort} onChange={(e) => update({ sort: e.target.value })} className="rounded-full border border-text/20 bg-white px-4 py-2.5 text-[13px] text-ink outline-none focus:border-navy">
                    <option value="">{t('products.sortDefault')}</option>
                    <option value="az">{t('products.sortAZ')}</option>
                    <option value="za">{t('products.sortZA')}</option>
                  </select>
                </label>
              </div>
            </div>


            <div ref={listTop} className="mt-10 scroll-mt-28">
              {results.length ? (
                <ProductGrid key={current} products={pageItems} />
              ) : (
                <div className="flex flex-col items-start gap-5 border border-dashed border-text/20 p-10">
                  <p className="h3 text-ink">{t('products.noResults')}</p>
                  <button type="button" onClick={clear} className="btn btn-navy">{t('products.clear')}</button>
                </div>
              )}
              <Pagination page={current} total={totalPages} onChange={goPage} className="mt-14" />
            </div>
          </div>
        </Container>
      </section>

      {/* Drawer mobile */}
      <AnimatePresence>
        {drawer && (
          <m.div className="fixed inset-0 z-[85] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" aria-label={t('common.close')} className="absolute inset-0 bg-ink/60" onClick={() => setDrawer(false)} />
            <m.div
              role="dialog" aria-modal="true" aria-label={t('products.filters')}
              className="absolute inset-y-0 left-0 flex w-[88vw] max-w-sm flex-col bg-paper"
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between border-b border-text/10 px-5 py-4">
                <p className="font-semibold text-ink">{t('products.filters')}</p>
                <button type="button" onClick={() => setDrawer(false)} aria-label={t('common.close')} className="p-2"><X size={20} /></button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-6" data-lenis-prevent><ProductFilter {...filterProps} /></div>
              <div className="border-t border-text/10 p-4">
                <button type="button" onClick={() => setDrawer(false)} className="btn btn-navy w-full">{t('products.apply')} ({results.length})</button>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

    </>
  )
}
