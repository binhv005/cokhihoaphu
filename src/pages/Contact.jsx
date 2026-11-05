import { useTranslation } from 'react-i18next'
import { Building2, Factory, Mail, MapPin, Navigation, Phone, User } from 'lucide-react'
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

  const cards = [
    { icon: Phone, label: t('common.hotline'), value: company.hotline, href: `tel:${company.hotlineTel}`, mono: true },
    { icon: Mail, label: t('common.email'), value: company.email, href: `mailto:${company.email}` },
    { icon: User, label: t('common.contactPerson'), value: company.contactPerson },
    { icon: FacebookIcon, label: t('common.facebook'), value: 'facebook.com/hoaphuco', href: company.facebook },
    { icon: MapPin, label: t('common.office'), value: company.address, href: company.mapsLink },
    { icon: Building2, label: t('common.business'), value: company.businessAddress },
    { icon: Factory, label: t('common.factory'), value: company.factoryAddress },
    { icon: Navigation, label: 'Website', value: company.websites },
  ]

  return (
    <>
      <PageHero eyebrow={t('contact.eyebrow')} title={t('contact.title')} desc={t('contact.desc')} breadcrumb={[{ label: t('nav.contact') }]} image="/images/products/p49.webp" index="07" />

      <section className="bg-ink pb-20 text-white">
        <Container>
          <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c, i) => {
              const Icon = c.icon
              const inner = (
                <>
                  <Icon size={22} className="text-orange" aria-hidden />
                  <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">{c.label}</p>
                  {Array.isArray(c.value) ? (
                    <ul className="mt-2 space-y-1 text-[15px] text-white">{c.value.map((v) => <li key={v} className="break-all">{v}</li>)}</ul>
                  ) : (
                    <p className={`mt-2 break-words text-[16px] leading-snug text-white ${c.mono ? 'font-mono text-[22px]' : ''}`}>{c.value}</p>
                  )}
                </>
              )
              return (
                <Reveal key={c.label} delay={i * 0.05} className="bg-ink">
                  {c.href ? (
                    <a href={c.href} {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="block h-full p-7 transition-colors hover:bg-navy">{inner}</a>
                  ) : (
                    <div className="h-full p-7">{inner}</div>
                  )}
                </Reveal>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal as="h2" className="h2 text-ink">{t('contact.formTitle')}</Reveal>
            <Reveal as="p" delay={0.05} className="mt-6 text-muted">{t('home.ctaDesc')}</Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6"><ContactForm /></Reveal>
        </Container>
      </section>

      <section className="bg-white py-20 md:py-28">
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
