import { useTranslation } from 'react-i18next'

/** Lĩnh vực ứng dụng: chỉ một dải chữ lớn chạy ngang trên nền xanh. */
export default function ApplicationsSection() {
  const { t } = useTranslation()
  const apps = t('home.apps', { returnObjects: true })
  const list = Array.isArray(apps) ? apps : []
  return (
    <section aria-label={t('home.appTitle')} className="select-none overflow-hidden bg-gradient-to-r from-[#1b3566] via-[#3f6aa8] to-[#1b3566] py-6 shadow-[inset_0_1px_0_rgba(255,255,255,.15)]">
      <ul className="animate-marquee flex w-max gap-12 whitespace-nowrap">
        {[...list, ...list].map((a, i) => (
          <li key={i} aria-hidden={i >= list.length} className="flex items-center gap-12 text-[clamp(2rem,5vw,4.2rem)] font-medium tracking-[-0.03em] text-white">
            {a}<span className="h-3 w-3 rotate-45 bg-white/80" />
          </li>
        ))}
      </ul>
    </section>
  )
}
