import { useTranslation } from 'react-i18next'
import MarqueeStrip from '../common/MarqueeStrip'
import { categories } from '../../data/categories'
import { useLocalized } from '../../hooks/useLocalized'

/** Dải chữ chạy ngang: tên các danh mục sản phẩm. */
export default function CategoryMarquee({ reverse = false }) {
  const { t } = useTranslation()
  const { L } = useLocalized()
  return <MarqueeStrip items={categories.map((c) => L(c.name))} label={t('home.catEyebrow')} reverse={reverse} />
}
