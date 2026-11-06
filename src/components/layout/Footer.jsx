import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight } from 'lucide-react'
import { company } from '../../data/company'
import { ROUTES } from '../../constants/routes'
import Button from '../common/Button'

const YEAR = new Date().getFullYear()

/**
 * Footer dạng "thẻ" tối bo góc trên: logo đè lên mép trên, tên thương hiệu + 2 nút ở giữa,
 * cột Liên hệ + mạng xã hội bên trái, Truy cập nhanh (2 cột) bên phải, dải chính sách dạng pill ở đáy.
 */
export default function Footer() {
  const { t } = useTranslation()
  const links = [
    { to: ROUTES.about, k: 'about' },
    { to: ROUTES.products, k: 'products' },
    { to: ROUTES.solutions, k: 'solutions' },
    { to: ROUTES.projects, k: 'projects' },
    { to: ROUTES.news, k: 'news' },
    { to: ROUTES.contact, k: 'contact' },
  ]
  const socials = [
    { href: company.facebook, label: 'Facebook' },
    { href: company.zalo, label: 'Zalo' },
    { href: company.mapsLink, label: 'Google Maps' },
  ]
  return (
    <footer className="bg-paper px-2 pt-20 md:px-4 md:pt-24">
      <div className="relative isolate rounded-t-[2rem] bg-ink text-white md:rounded-t-[3rem]">
        {/* nền bản vẽ kỹ thuật mờ – thay cho hoạ tiết đường đồng mức của mẫu */}
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-t-[inherit]" aria-hidden>
          <div className="absolute inset-0 bg-[url('/images/banner-hoaphu.webp')] bg-cover bg-center opacity-[0.07] mix-blend-luminosity" />
          <div className="grid-lines absolute inset-0 opacity-30" />
        </div>

        {/* logo đè lên mép trên */}
        <Link to="/" aria-label={`${company.brand} – ${t('nav.home')}`} className="absolute left-1/2 top-0 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink ring-8 ring-paper transition-transform duration-500 hover:-translate-y-[55%] md:size-32">
          <img src="/images/logo-mark.png" alt="" width="102" height="88" loading="lazy" className="h-11 w-auto md:h-14" />
        </Link>

        <div className="container-x pt-20 md:pt-24">
          <div className="grid gap-12 pb-10 lg:grid-cols-[1fr_auto_1fr] lg:items-end lg:gap-10">
            {/* giữa: thương hiệu + CTA (lên đầu trên mobile) */}
            <div className="text-center lg:order-2">
              <p className="h1 metal leading-none">HOÀ PHÚ</p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.3em] text-white/50">Machinery & Engineering</p>
              <p className="mt-4 font-display text-[17px] italic text-brand-light">{t('footer.tagline')}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button to={ROUTES.quote()}>{t('nav.quote')}</Button>
                <Button to={ROUTES.products} variant="ghostDark">{t('hero.cta1')}</Button>
              </div>
            </div>

            {/* trái: liên hệ + mạng xã hội */}
            <div className="grid grid-cols-[1fr_auto] gap-8 lg:order-1">
              <div>
                <p className="text-[20px] font-semibold">{t('footer.contact')}</p>
                <address className="mt-3 space-y-1.5 text-[14px] not-italic leading-relaxed text-white/65">
                  <a href={company.mapsLink} target="_blank" rel="noopener noreferrer" className="block max-w-[240px] hover:text-white">{company.address}</a>
                  <a href={`tel:${company.hotlineTel}`} className="block font-mono hover:text-white">{company.hotline}</a>
                  <a href={`mailto:${company.email}`} className="block break-all underline decoration-white/30 underline-offset-4 hover:text-white">{company.email}</a>
                </address>
              </div>
              <ul className="space-y-1.5 self-end text-[14px]">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-white/80 hover:text-white">
                      {s.label}
                      <ArrowUpRight size={14} className="text-brand transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* phải: truy cập nhanh */}
            <div className="lg:order-3 lg:justify-self-end">
              <p className="text-[20px] font-semibold">{t('footer.quick')}</p>
              <ul className="mt-3 grid grid-cols-2 gap-x-10 gap-y-1.5 text-[14px]">
                {links.map((l) => (
                  <li key={l.k}><Link to={l.to} className="text-white/65 transition-colors hover:text-brand">{t(`nav.${l.k}`)}</Link></li>
                ))}
              </ul>
            </div>
          </div>

          {/* đáy */}
          <div className="flex flex-col items-center gap-4 pb-8 pt-4 text-[12px] md:flex-row md:justify-between">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-white/60">
              <span className="size-1.5 rounded-full bg-brand" aria-hidden />
              {company.name}
            </span>
            <p className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-1 rounded-full bg-paper px-4 py-1.5 text-ink">
              <span>{t('footer.privacy')}</span>
              <span>© {YEAR}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
