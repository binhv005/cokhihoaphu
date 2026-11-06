import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight, CheckCircle2, Loader2, Paperclip } from 'lucide-react'
import Field, { aria } from './Field'
import FormStatus from './FormStatus'
import { quoteSchema } from '../../utils/schemas'
import { submitQuote } from '../../services/formService'
import { categories } from '../../data/categories'
import { useLocalized } from '../../hooks/useLocalized'

function Group({ no, title, children }) {
  return (
    <fieldset className="grid gap-8 border-t border-text/15 pt-8 sm:grid-cols-2">
      <legend className="float-left mb-2 flex w-full items-baseline gap-3 text-[17px] font-semibold text-ink sm:col-span-2">
        <span className="font-mono text-[12px] text-brand-deep">{no}</span>{title}
      </legend>
      {children}
    </fieldset>
  )
}

/** Form yêu cầu báo giá. `initialProduct` / `initialCategory` dùng để tự điền từ trang sản phẩm. */
export default function QuoteForm({ initialProduct = '', initialCategory = '', prefilled = false }) {
  const { t } = useTranslation()
  const { L } = useLocalized()
  const [status, setStatus] = useState(null)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(quoteSchema),
    defaultValues: { name: '', company: '', phone: '', email: '', address: '', product: initialProduct, category: initialCategory, quantity: '', usage: '', extra: '', agree: false },
    mode: 'onTouched',
  })

  const onSubmit = async (data) => {
    setStatus('submitting')
    const res = await submitQuote(data)
    if (res.ok) {
      setStatus('success')
      reset({ name: '', company: '', phone: '', email: '', address: '', product: '', category: '', quantity: '', usage: '', extra: '', agree: false })
    } else setStatus(res.reason === 'not_configured' ? 'not_configured' : 'error')
  }
  const e = (k) => errors[k]?.message

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-12">
      <Group no="01" title={t('quote.s1')}>
        <Field id="q-name" label={t('form.name')} required error={e('name')}>
          <input {...register('name')} {...aria('q-name', e('name'))} autoComplete="name" className="field" />
        </Field>
        <Field id="q-company" label={t('form.companyQ')}>
          <input {...register('company')} id="q-company" autoComplete="organization" className="field" />
        </Field>
        <Field id="q-phone" label={t('form.phone')} required error={e('phone')}>
          <input {...register('phone')} {...aria('q-phone', e('phone'))} type="tel" inputMode="tel" autoComplete="tel" placeholder="0913 813 412" className="field" />
        </Field>
        <Field id="q-email" label={t('form.email')} error={e('email')}>
          <input {...register('email')} {...aria('q-email', e('email'))} type="email" autoComplete="email" className="field" />
        </Field>
        <Field id="q-address" label={t('form.address')} className="sm:col-span-2">
          <input {...register('address')} id="q-address" autoComplete="street-address" className="field" />
        </Field>
      </Group>

      <Group no="02" title={t('quote.s2')}>
        <Field id="q-product" label={t('form.product')} required error={e('product')} className="sm:col-span-2">
          <input {...register('product')} {...aria('q-product', e('product'))} placeholder={t('form.productPh')} className="field" />
          {prefilled && <p className="mt-2 flex items-center gap-1.5 text-[12px] text-[#2f9e44]"><CheckCircle2 size={14} />{t('quote.prefilled')}</p>}
        </Field>
        <Field id="q-category" label={t('form.category')}>
          <select {...register('category')} id="q-category" className="field cursor-pointer">
            <option value="">{t('form.selectCategory')}</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{L(c.name)}</option>)}
          </select>
        </Field>
        <Field id="q-quantity" label={t('form.quantity')} error={e('quantity')}>
          <input {...register('quantity')} {...aria('q-quantity', e('quantity'))} inputMode="numeric" className="field" />
        </Field>
      </Group>

      <Group no="03" title={t('quote.s3')}>
        <Field id="q-usage" label={t('form.usage')} className="sm:col-span-2">
          <textarea {...register('usage')} id="q-usage" rows={3} placeholder={t('form.usagePh')} className="field resize-y" />
        </Field>
        <Field id="q-extra" label={t('form.extra')} className="sm:col-span-2">
          <textarea {...register('extra')} id="q-extra" rows={3} className="field resize-y" />
        </Field>
        <div className="sm:col-span-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{t('form.file')}</p>
          <div className="mt-3 flex items-center gap-3 border border-dashed border-text/25 p-4 text-[14px] text-muted">
            <Paperclip size={18} aria-hidden />
            <span>{t('form.fileDisabled')}</span>
          </div>
        </div>
      </Group>

      <div className="space-y-6 border-t border-text/15 pt-8">
        <label className="flex cursor-pointer items-start gap-3 text-[14px] text-text/80">
          <input type="checkbox" {...register('agree')} aria-invalid={e('agree') ? 'true' : 'false'} className="mt-1 h-4 w-4 shrink-0 accent-[#12345a]" />
          <span>{t('form.agree')} <span className="text-brand-deep">*</span></span>
        </label>
        {e('agree') && <p role="alert" className="-mt-3 text-[13px] text-[#d9480f]">{t(`form.err.${e('agree')}`)}</p>}
        <FormStatus status={status} />
        <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full sm:w-auto sm:min-w-[260px] disabled:cursor-wait disabled:opacity-70">
          {isSubmitting ? <><Loader2 size={17} className="animate-spin" /> {t('form.sending')}</> : <>{t('form.sendQuote')} <ArrowUpRight size={17} /></>}
        </button>
      </div>
    </form>
  )
}
