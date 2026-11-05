import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Expand, Info } from 'lucide-react'
import PageHero from '../components/common/PageHero'
import Container from '../components/common/Container'
import Reveal from '../components/common/Reveal'
import SmartImage from '../components/common/SmartImage'
import Lightbox from '../components/common/Lightbox'
import CtaBand from '../components/common/CtaBand'
import { activities, projectFields } from '../data/projects'
import { useLocalized } from '../hooks/useLocalized'
import { breadcrumbLd, useSeo } from '../hooks/useSeo'


export default function Projects() {
  const { t } = useTranslation()
  const { L } = useLocalized()
  const [field, setField] = useState('')
  const [idx, setIdx] = useState(null)
  useSeo({ title: t('seo.projects'), description: t('projects.desc'), jsonLd: breadcrumbLd([{ label: t('nav.home'), to: '/' }, { label: t('nav.projects'), to: '/projects' }]) })

  const list = activities.filter((a) => !field || a.field === field)
  const lb = list.map((a) => ({ src: a.image, alt: L(a.title), caption: `${L(a.title)} — ${L(a.desc)}` }))

  return (
    <>
      <PageHero eyebrow={t('projects.eyebrow')} title={t('projects.title')} desc={t('projects.desc')} breadcrumb={[{ label: t('nav.projects') }]} image="/images/products/p02.webp" index="05" />

      <section className="bg-paper py-16 md:py-24">
        <Container>
          <Reveal className="flex max-w-3xl items-start gap-3 border-l-2 border-orange bg-white p-5 text-[15px] text-text/80">
            <Info size={18} className="mt-0.5 shrink-0 text-orange" aria-hidden />{t('projects.intro')}
          </Reveal>

          <div className="mt-12 flex flex-wrap gap-2" role="toolbar" aria-label="Filter">
            {[{ id: '', name: null }, ...projectFields.filter((f) => activities.some((a) => a.field === f.id))].map((f) => (
              <button
                key={f.id || 'all'}
                type="button"
                onClick={() => setField(f.id)}
                aria-pressed={field === f.id}
                className={`rounded-full border px-5 py-2.5 text-[14px] transition-colors ${field === f.id ? 'border-navy bg-navy text-white' : 'border-text/20 text-ink hover:border-navy'}`}
              >
                {f.name ? L(f.name) : t('projects.all')}
                <span className="ml-2 font-mono text-[11px] opacity-60">{f.id ? activities.filter((a) => a.field === f.id).length : activities.length}</span>
              </button>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {list.map((a, i) => (
                <m.article
                  key={a.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.45 }}
                  className="group relative overflow-hidden"
                >
                  <button type="button" onClick={() => setIdx(i)} className="block h-full w-full text-left" aria-label={L(a.title)}>
                    <SmartImage src={a.image} alt={L(a.title)} ratio="4/3" zoom />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-orange">{L(projectFields.find((f) => f.id === a.field)?.name)}</p>
                      <h3 className="mt-1.5 text-[17px] font-semibold">{L(a.title)}</h3>
                      <p className="mt-1 text-[13px] text-white/65">{L(a.desc)}</p>
                    </div>
                    <Expand size={18} className="absolute right-4 top-4 text-white opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                  </button>
                </m.article>
              ))}
            </AnimatePresence>
          </div>
          {!list.length && <p className="mt-10 text-muted">{t('projects.empty')}</p>}
        </Container>
        <Lightbox items={lb} index={idx} onClose={() => setIdx(null)} onChange={setIdx} />
      </section>
      <CtaBand />
    </>
  )
}
