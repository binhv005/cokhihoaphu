import { useTranslation } from 'react-i18next'
import MarqueeStrip from '../common/MarqueeStrip'

/** Lĩnh vực ứng dụng: chỉ một dải chữ lớn chạy ngang trên nền xanh. */
export default function ApplicationsSection() {
  const { t } = useTranslation()
  const apps = t('home.apps', { returnObjects: true })
  return <MarqueeStrip items={Array.isArray(apps) ? apps : []} label={t('home.appTitle')} />
}
