import { useTranslation } from 'react-i18next'
import { AlertTriangle, CheckCircle2, Phone } from 'lucide-react'
import { company } from '../../data/company'

/** Thông báo kết quả gửi form – trung thực theo phản hồi của service. */
export default function FormStatus({ status }) {
  const { t } = useTranslation()
  if (!status || status === 'submitting') return null
  if (status === 'success') {
    return (
      <div role="status" className="flex items-start gap-3 border-l-2 border-[#2f9e44] bg-[#2f9e44]/10 p-4 text-[14px] text-text">
        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#2f9e44]" aria-hidden />{t('form.success')}
      </div>
    )
  }
  return (
    <div role="alert" className="flex flex-col gap-3 border-l-2 border-orange bg-orange/10 p-4 text-[14px] text-text sm:flex-row sm:items-start">
      <AlertTriangle size={18} className="mt-0.5 shrink-0 text-orange" aria-hidden />
      <p className="flex-1">{status === 'not_configured' ? t('form.notConfigured') : t('form.error')}</p>
      <a href={`tel:${company.hotlineTel}`} className="btn btn-navy shrink-0 px-4 py-2.5"><Phone size={15} />{company.hotline}</a>
    </div>
  )
}
