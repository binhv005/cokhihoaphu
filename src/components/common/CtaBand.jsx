import { useTranslation } from 'react-i18next'
import { Phone } from 'lucide-react'
import Container from './Container'
import Button from './Button'
import Reveal, { LineReveal } from './Reveal'
import { company } from '../../data/company'
import { ROUTES } from '../../constants/routes'

/** CTA cinematic nền navy/tối với ánh sáng cam – dùng cuối các trang. */
export default function CtaBand({ title, desc, product }) {
  const { t } = useTranslation()
  const lines = title ? (Array.isArray(title) ? title : [title]) : [t('home.ctaTitle1'), t('home.ctaTitle2')]
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      <div className="absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-orange/20 blur-[120px]" aria-hidden />
      <div className="absolute -bottom-52 -left-40 -z-10 h-[520px] w-[520px] rounded-full bg-steel/40 blur-[120px]" aria-hidden />
      <div className="grid-lines absolute inset-0 -z-10 opacity-50" aria-hidden />
      <Container className="py-20 md:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="h-display"><LineReveal lines={lines} /></h2>
          </div>
          <Reveal delay={0.15} className="lg:col-span-4">
            <p className="lead mb-8 text-white/70">{desc ?? t('home.ctaDesc')}</p>
            <div className="flex flex-wrap gap-3">
              <Button to={ROUTES.quote(product)}>{t('home.ctaBtn')}</Button>
              <Button href={`tel:${company.hotlineTel}`} variant="ghostDark" icon={Phone}>{t('common.callNow')}: {company.hotline}</Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
