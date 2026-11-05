import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import Button from '../common/Button'
import SmartImage from '../common/SmartImage'
import { solutions } from '../../data/solutions'
import { useLocalized } from '../../hooks/useLocalized'
import { ROUTES } from '../../constants/routes'

/** Giải pháp: danh sách đánh số + ảnh thay đổi theo mục đang chọn. */
export default function SolutionsSection() {
  const { t } = useTranslation()
  const { L } = useLocalized()
  const list = solutions.filter((s) => s.id !== 'panel-coating')
  const [active, setActive] = useState(0)
  const s = list[active]
  return (
    <section className="relative overflow-hidden bg-ink-2 py-24 text-white md:py-32">
      <Container>
        <SectionHeading dark eyebrow={t('home.solEyebrow')} title={t('home.solTitle')} />
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <ol className="lg:col-span-6" role="tablist" aria-label={t('home.solTitle')}>
            {list.map((it, i) => (
              <li key={it.id}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`flex w-full items-baseline gap-5 border-b border-white/10 py-5 text-left transition-colors ${active === i ? 'text-white' : 'text-white/45 hover:text-white/80'}`}
                >
                  <span className={`font-mono text-[12px] ${active === i ? 'text-orange' : ''}`}>{it.no}</span>
                  <span className="text-[clamp(1.15rem,1.8vw,1.5rem)] font-medium tracking-[-0.01em]">{L(it.title)}</span>
                  <span className={`ml-auto h-px self-center transition-all duration-500 ${active === i ? 'w-10 bg-orange' : 'w-0'}`} />
                </button>
              </li>
            ))}
            <li className="pt-8">
              <Button to={`${ROUTES.solutions}#${s.id}`} variant="ghostDark">{t('home.solCta')}</Button>
            </li>
          </ol>
          <div className="lg:col-span-5 lg:col-start-8" role="tabpanel">
            <div className="relative aspect-[4/3] overflow-hidden bg-ink">
              <AnimatePresence mode="popLayout">
                <m.div
                  key={s.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SmartImage src={s.image} alt={L(s.title)} placeholder={s.placeholder} className="h-full" />
                </m.div>
              </AnimatePresence>
              <span className="absolute left-4 top-4 font-mono text-[12px] tracking-[0.18em] text-white/80">[{s.no}]</span>
            </div>
            <p className="mt-6 text-[15px] text-white/65">{L(s.desc)}</p>
          </div>
        </div>
      </Container>
    </section>
  )
}
