import { useTranslation } from 'react-i18next'
import { Boxes, Trees, Workflow, Wrench, MessagesSquare } from 'lucide-react'
import Container from '../common/Container'
import Reveal from '../common/Reveal'

const icons = [Boxes, Trees, Workflow, Wrench, MessagesSquare]

/** Vì sao chọn Hoà Phú – 5 điểm ngắn gọn, chỉ tiêu đề + icon. */
export default function WhyChooseUs() {
  const { t } = useTranslation()
  const items = t('home.why', { returnObjects: true })
  return (
    <section className="bg-white py-16 md:py-20">
      <Container>
        <Reveal as="h2" className="h2 max-w-2xl text-ink">{t('home.whyTitle')}</Reveal>
        <ol className="mt-14 grid border-t border-text/15 sm:grid-cols-2 lg:grid-cols-5">
          {Array.isArray(items) && items.map((it, i) => {
            const Icon = icons[i]
            return (
              <Reveal as="li" key={i} delay={i * 0.05} className="group border-b border-text/15 py-8 sm:pr-6 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[12px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                  <Icon size={26} strokeWidth={1.3} className="text-steel transition-colors group-hover:text-brand-deep" aria-hidden />
                </div>
                <h3 className="mt-10 text-[18px] font-semibold leading-snug text-ink">{it}</h3>
              </Reveal>
            )
          })}
        </ol>
      </Container>
    </section>
  )
}
