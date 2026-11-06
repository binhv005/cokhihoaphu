import { useTranslation } from 'react-i18next'
import { Mail, MapPin, Navigation, Phone } from 'lucide-react'
import PageHero from '../components/common/PageHero'
import Container from '../components/common/Container'
import Reveal from '../components/common/Reveal'
import Button from '../components/common/Button'
import ContactForm from '../components/forms/ContactForm'
import { FacebookIcon } from '../components/common/BrandIcons'
import { company } from '../data/company'
import { breadcrumbLd, organizationLd, useSeo } from '../hooks/useSeo'

export default function Contact() {
  const { t } = useTranslation()
  useSeo({ title: t('seo.contact'), description: t('contact.desc'), jsonLd: [organizationLd(), breadcrumbLd([{ label: t('nav.home'), to: '/' }, { label: t('nav.contact'), to: '/contact' }])] })

  // thông tin liên hệ chính hiển thị trên panel ảnh bên trái form
  const info = [
    { icon: Phone, value: company.hotline, href: `tel:${company.hotlineTel}`, mono: true },
    { icon: Mail, value: company.email, href: `mailto:${company.email}` },
    { icon: MapPin, value: company.address, href: company.mapsLink },
    { icon: FacebookIcon, value: 'facebook.com/hoaphuco', href: company.facebook },
  ]

  return (
    <>
      <PageHero eyebrow={t('contact.eyebrow')} title={t('contact.title')} desc={t('contact.desc')} breadcrumb={[{ label: t('nav.contact') }]} image={['/images/products/p49.webp', '/images/products/p07.webp', '/images/products/p58.webp', '/images/products/p00.webp', '/images/products/p65.webp']} index="07" />

      <section className="bg-paper py-16 md:py-20">
        <Container>
          <Reveal className="grid overflow-hidden bg-white shadow-[0_30px_80px_-30px_rgba(18,52,90,.35)] lg:grid-cols-12">
            {/* Panel trái: ảnh xưởng thực tế phủ lớp xanh logo */}
            <div className="relative isolate flex flex-col justify-between gap-12 overflow-hidden p-8 text-white sm:p-10 lg:col-span-5 lg:p-12">
              <img src="/images/products/p00.webp" alt="" aria-hidden loading="lazy" decoding="async" className="absolute inset-0 -z-20 h-full w-full object-cover" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0b2647]/95 via-[#12345a]/88 to-[#3b6bb0]/75" aria-hidden />
              <div className="grid-lines absolute inset-0 -z-10 opacity-40" aria-hidden />
              <div>
                <h2 className="h2">{t('contact.formTitle')}</h2>
                <p className="mt-5 max-w-sm text-[16px] leading-relaxed text-white/75">{t('home.ctaDesc')}</p>
              </div>
              <ul className="space-y-4">
                {info.map(({ icon: Icon, value, href, mono }) => (
                  <li key={value}>
                    <a href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="group flex items-start gap-4 text-[15px] text-white/85 transition-colors hover:text-white">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-brand transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-logo-ink"><Icon size={17} aria-hidden /></span>
                      <span className={`self-center break-words ${mono ? 'font-mono text-[20px] text-white' : ''}`}>{value}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Form */}
            <div className="p-8 sm:p-10 lg:col-span-7 lg:p-12">
              <ContactForm />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-20">
        <Container>
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal as="h2" className="h2 text-ink">{t('contact.mapTitle')}</Reveal>
            <Button href={company.mapsLink} icon={Navigation}>{t('common.directions')}</Button>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-line md:aspect-[21/9]">
            <iframe
              title={`${t('common.maps')} – ${company.address}`}
              src={company.mapsEmbed}
              className="absolute inset-0 h-full w-full border-0 grayscale-[0.3]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <p className="mt-4 text-[14px] text-muted">{company.address}</p>
        </Container>
      </section>
    </>
  )
}
