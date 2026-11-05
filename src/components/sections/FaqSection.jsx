import { useTranslation } from 'react-i18next'
import Container from '../common/Container'
import Reveal from '../common/Reveal'
import Accordion from '../common/Accordion'
import { faqs } from '../../data/faq'
import { useLocalized } from '../../hooks/useLocalized'

export default function FaqSection({ className = 'bg-paper' }) {
  const { t } = useTranslation()
  const { L } = useLocalized()
  return (
    <section className={`py-24 md:py-32 ${className}`}>
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal as="h2" className="h2 text-ink">{t('home.faqTitle')}</Reveal>
        </div>
        <Reveal className="lg:col-span-7 lg:col-start-6">
          <Accordion items={faqs.map((f) => ({ q: L(f.q), a: L(f.a) }))} />
        </Reveal>
      </Container>
    </section>
  )
}
