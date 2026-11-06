import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight, Loader2 } from 'lucide-react'
import Field, { aria } from './Field'
import FormStatus from './FormStatus'
import { contactSchema } from '../../utils/schemas'
import { submitContact } from '../../services/formService'

export default function ContactForm() {
  const { t } = useTranslation()
  const [status, setStatus] = useState(null)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', company: '', phone: '', email: '', message: '' },
    mode: 'onTouched',
  })

  const onSubmit = async (data) => {
    setStatus('submitting')
    const res = await submitContact(data)
    if (res.ok) {
      setStatus('success')
      reset()
    } else setStatus(res.reason === 'not_configured' ? 'not_configured' : 'error') // giữ nguyên dữ liệu
  }

  const e = (k) => errors[k]?.message
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
      <Field id="c-name" label={t('form.name')} required error={e('name')}>
        <input {...register('name')} {...aria('c-name', e('name'))} autoComplete="name" className="field-box" />
      </Field>
      <Field id="c-company" label={t('form.company')}>
        <input {...register('company')} id="c-company" autoComplete="organization" className="field-box" />
      </Field>
      <Field id="c-phone" label={t('form.phone')} required error={e('phone')}>
        <input {...register('phone')} {...aria('c-phone', e('phone'))} type="tel" inputMode="tel" autoComplete="tel" placeholder="0913 813 412" className="field-box" />
      </Field>
      <Field id="c-email" label={t('form.email')} error={e('email')}>
        <input {...register('email')} {...aria('c-email', e('email'))} type="email" autoComplete="email" className="field-box" />
      </Field>
      <Field id="c-message" label={t('form.message')} required error={e('message')} className="sm:col-span-2">
        <textarea {...register('message')} {...aria('c-message', e('message'))} rows={5} className="field-box min-h-[140px] resize-y" />
      </Field>
      <div className="space-y-5 sm:col-span-2">
        <FormStatus status={status} />
        <button type="submit" disabled={isSubmitting} className="btn btn-primary mx-auto flex w-full min-w-[200px] sm:w-fit disabled:cursor-wait disabled:opacity-70">
          {isSubmitting ? <><Loader2 size={17} className="animate-spin" /> {t('form.sending')}</> : <>{t('form.send')} <ArrowUpRight size={17} /></>}
        </button>
      </div>
    </form>
  )
}
