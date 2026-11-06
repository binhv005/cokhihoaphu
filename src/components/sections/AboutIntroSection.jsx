import { useTranslation } from 'react-i18next'
import Container from '../common/Container'
import Reveal, { LineReveal } from '../common/Reveal'
import Button from '../common/Button'
import SmartImage from '../common/SmartImage'
import { ROUTES } from '../../constants/routes'

/** Giới thiệu ngắn: tiêu đề lớn + 1 đoạn + 2 ảnh thực tế (giữ ảnh ở kích thước vừa với độ phân giải gốc). */
export default function AboutIntroSection() {
  const { t } = useTranslation()
  return (
    <section className="bg-paper py-16 md:py-20">
      <Container className="grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 className="h1 whitespace-nowrap text-ink text-[clamp(1.6rem,3.2vw,2.9rem)]"><LineReveal lines={[t('home.aboutTitle')]} /></h2>
          <Reveal as="p" delay={0.06} className="lead mt-6 max-w-md text-muted">{t('home.aboutP2')}</Reveal>
          <Reveal delay={0.12} className="mt-8"><Button to={ROUTES.about} variant="navy">{t('common.learnMore')}</Button></Reveal>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:col-span-6 lg:col-start-7">
          <Reveal><SmartImage src="/images/products/p00.webp" alt="Nhà xưởng máy móc Hoà Phú" ratio="4/5" /></Reveal>
          <Reveal delay={0.08} className="mt-12"><SmartImage src="/images/products/p12.webp" alt="Gian hàng triển lãm Hoà Phú" ratio="4/5" /></Reveal>
        </div>
      </Container>
    </section>
  )
}
