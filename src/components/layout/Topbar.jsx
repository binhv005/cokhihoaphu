import { Mail, MapPin, Phone } from 'lucide-react'
import { company } from '../../data/company'
import LanguageSwitch from './LanguageSwitch'

export default function Topbar() {
  return (
    <div className="border-b border-white/10 text-white/70">
      <div className="container-x flex h-9 items-center justify-between gap-4 text-[12px]">
        <a href={company.mapsLink} target="_blank" rel="noopener noreferrer" className="flex min-w-0 items-center gap-2 transition-colors hover:text-white">
          <MapPin size={13} className="shrink-0 text-orange" aria-hidden />
          <span className="truncate">{company.address}</span>
        </a>
        <div className="flex shrink-0 items-center gap-5">
          <a href={`mailto:${company.email}`} className="hidden items-center gap-2 transition-colors hover:text-white lg:flex">
            <Mail size={13} className="text-orange" aria-hidden /> {company.email}
          </a>
          <a href={`tel:${company.hotlineTel}`} className="hidden items-center gap-2 font-mono tracking-wide transition-colors hover:text-white sm:flex">
            <Phone size={13} className="text-orange" aria-hidden /> {company.hotline}
          </a>
          <LanguageSwitch />
        </div>
      </div>
    </div>
  )
}
