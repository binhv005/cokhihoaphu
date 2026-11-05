import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Expand } from 'lucide-react'
import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import Reveal from '../common/Reveal'
import SmartImage from '../common/SmartImage'
import Lightbox from '../common/Lightbox'
import Button from '../common/Button'
import { activities, partners } from '../../data/projects'
import { useLocalized } from '../../hooks/useLocalized'
import { ROUTES } from '../../constants/routes'

/** Gallery hoạt động & thiết bị (không phải dự án khách hàng) + dải logo đối tác. */
export default function ProjectsSection() {
  const { t } = useTranslation()
  const { L } = useLocalized()
  const [idx, setIdx] = useState(null)
  const items = activities.slice(0, 6)
  const lb = items.map((a) => ({ src: a.image, alt: L(a.title), caption: L(a.title) }))
  return (
    <section className="bg-ink py-24 text-white md:py-36">
      <Container>
        <SectionHeading dark eyebrow={t('home.projEyebrow')} title={t('home.projTitle')} desc={t('home.projNote')} />
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a, i) => (
            <Reveal key={a.id} delay={(i % 3) * 0.06}>
              <button type="button" onClick={() => setIdx(i)} className="group relative block h-full w-full overflow-hidden text-left" aria-label={L(a.title)}>
                <SmartImage src={a.image} alt={L(a.title)} ratio="4/3" zoom />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 md:p-5">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-orange">{t('common.photoActivity')}</p>
                    <p className="mt-1 text-balance text-[14px] font-medium md:text-[16px]">{L(a.title)}</p>
                  </div>
                  <Expand size={18} className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                </div>
              </button>
            </Reveal>
          ))}
        </div>
        <div className="mt-10"><Button to={ROUTES.projects} variant="ghostDark">{t('home.projCta')}</Button></div>
      </Container>

      <div className="mt-24 border-t border-white/10 pt-12">
        <Container><h2 className="h2 mb-10">{t('home.partnersTitle')}</h2></Container>
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <ul className="animate-marquee flex w-max gap-4" aria-label={t('home.partnersTitle')}>
            {[...partners, ...partners].map((p, i) => (
              <li key={i} className="flex h-[76px] w-[180px] shrink-0 items-center justify-center rounded-sm bg-white px-3" aria-hidden={i >= partners.length}>
                <img src={p} alt={i < partners.length ? `Đối tác ${i + 1}` : ''} width="157" height="60" loading="lazy" className="max-h-[60px] w-auto object-contain" />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Lightbox items={lb} index={idx} onClose={() => setIdx(null)} onChange={setIdx} />
    </section>
  )
}
