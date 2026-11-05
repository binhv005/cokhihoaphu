import { useTranslation } from 'react-i18next'
import Reveal from '../common/Reveal'

/** Lĩnh vực ứng dụng: một dải chữ lớn chạy ngang. */
export default function ApplicationsSection() {
  const { t } = useTranslation()
  const apps = t('home.apps', { returnObjects: true })
  const list = Array.isArray(apps) ? apps : []
  return (
    <section className="overflow-hidden bg-paper py-20 md:py-28">
      <div className="container-x">
        <Reveal as="h2" className="h2 max-w-3xl text-ink">{t('home.appTitle')}</Reveal>
      </div>
      <div className="mt-10 select-none border-y border-text/10 py-6">
        <ul className="animate-marquee flex w-max gap-12 whitespace-nowrap">
          {[...list, ...list].map((a, i) => (
            <li key={i} aria-hidden={i >= list.length} className="flex items-center gap-12 text-[clamp(2rem,5vw,4.2rem)] font-medium tracking-[-0.03em] text-ink/85">
              {a}<span className="h-3 w-3 rotate-45 bg-orange" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
