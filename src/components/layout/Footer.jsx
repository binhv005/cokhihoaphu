import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { company } from '../../data/company'
import { categories } from '../../data/categories'
import { useLocalized } from '../../hooks/useLocalized'
import { ROUTES } from '../../constants/routes'
import { FacebookIcon } from '../common/BrandIcons'

export default function Footer() {
  const { t } = useTranslation()
  const { L } = useLocalized()
  const links = [
    { to: ROUTES.about, k: 'about' },
    { to: ROUTES.solutions, k: 'solutions' },
    { to: ROUTES.projects, k: 'projects' },
    { to: ROUTES.news, k: 'news' },
    { to: ROUTES.contact, k: 'contact' },
    { to: ROUTES.quote(), k: 'quote' },
  ]
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="grid-lines absolute inset-0 opacity-40" aria-hidden />
      <div className="container-x relative">

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 md:py-20">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4">
              <span className="rounded-sm bg-white p-2"><img src={company.logo} alt="Logo Hoà Phú" width="112" height="116" className="h-14 w-auto" loading="lazy" /></span>
              <p className="text-[14px] font-semibold leading-snug tracking-wide">{company.name}</p>
            </div>
            <p className="mt-6 max-w-sm text-[14px] text-white/55">{t('footer.desc')}</p>
          </div>
          <div className="lg:col-span-3">
            <p className="eyebrow mb-5 text-white/40">{t('footer.categories')}</p>
            <ul className="space-y-2.5 text-[14px]">
              {categories.map((c) => (
                <li key={c.id}><Link to={ROUTES.productsBy(c.id)} className="text-white/70 transition-colors hover:text-brand">{L(c.name)}</Link></li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <p className="eyebrow mb-5 text-white/40">{t('footer.links')}</p>
            <ul className="space-y-2.5 text-[14px]">
              {links.map((l) => (
                <li key={l.k}><Link to={l.to} className="text-white/70 transition-colors hover:text-brand">{t(`nav.${l.k}`)}</Link></li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <p className="eyebrow mb-5 text-white/40">{t('footer.contact')}</p>
            <ul className="space-y-3.5 text-[14px] text-white/70">
              <li className="flex gap-3"><MapPin size={16} className="mt-1 shrink-0 text-brand" aria-hidden /><a href={company.mapsLink} target="_blank" rel="noopener noreferrer" className="hover:text-white">{company.address}</a></li>
              <li className="flex gap-3"><Phone size={16} className="mt-1 shrink-0 text-brand" aria-hidden /><a href={`tel:${company.hotlineTel}`} className="font-mono hover:text-white">{company.hotline}</a></li>
              <li className="flex gap-3"><Mail size={16} className="mt-1 shrink-0 text-brand" aria-hidden /><a href={`mailto:${company.email}`} className="break-all hover:text-white">{company.email}</a></li>
              <li className="flex gap-3"><FacebookIcon size={16} className="mt-1 shrink-0 text-brand" /><a href={company.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white">facebook.com/hoaphuco</a></li>
              <li><a href={company.mapsLink} target="_blank" rel="noopener noreferrer" className="link-arrow text-white">{t('common.maps')} <ArrowUpRight size={14} /></a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-7 text-[12px] text-white/45 md:flex-row md:justify-between">
          <p>{t('footer.rights')}</p>
          <p>{t('footer.privacy')}</p>
        </div>
      </div>
    </footer>
  )
}
