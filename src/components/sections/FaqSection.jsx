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
    <section className={`py-16 md:py-20 ${className}`}>
      <Container>
        <Reveal as="h2" className="h2 text-center text-ink">{t('home.faqTitle')}</Reveal>
        <Reveal className="mx-auto mt-10 max-w-4xl md:mt-12">
          <Accordion items={faqs.map((f) => ({ q: L(f.q), a: L(f.a) }))} />
        </Reveal>
      </Container>
    </section>
  )
}
