import { useTranslation } from 'react-i18next'
import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import Button from '../common/Button'
import ArticleCard from '../news/ArticleCard'
import { news } from '../../data/news'
import { ROUTES } from '../../constants/routes'

export default function NewsSection() {
  const { t } = useTranslation()
  const items = ['kien-thuc-co-ban-ve-may-che-bien-go', 'giai-phap-bang-tai-cong-nghiep', 'lua-chon-thiet-bi-cho-day-chuyen-san-xuat'].map((s) => news.find((n) => n.slug === s))
  return (
    <section className="bg-white py-16 md:py-20">
      <Container>
        <SectionHeading eyebrow={t('home.newsEyebrow')} title={t('home.newsTitle')} aside={<div className="lg:text-right"><Button to={ROUTES.news} variant="ghostLight">{t('home.newsCta')}</Button></div>} />
        <div className="mt-14 grid gap-x-6 gap-y-14 md:grid-cols-3">
          {items.map((a, i) => <ArticleCard key={a.slug} a={a} index={i} />)}
        </div>
      </Container>
    </section>
  )
}
