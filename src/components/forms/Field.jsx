import { useTranslation } from 'react-i18next'

/** Field có label, đánh dấu bắt buộc và lỗi hiển thị ngay dưới input. */
export default function Field({ id, label, required, error, children, className = '', dark = false }) {
  const { t } = useTranslation()
  return (
    <div className={className}>
      <label htmlFor={id} className={`block font-mono text-[11px] uppercase tracking-[0.16em] ${dark ? 'text-white/55' : 'text-muted'}`}>
        {label}
        {required && <span className="ml-1 text-orange" aria-label={t('form.required')}>*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-[13px] text-[#d9480f]">
          {t(`form.err.${error}`, { defaultValue: error })}
        </p>
      )}
    </div>
  )
}

/** Thuộc tính aria cho input theo trạng thái lỗi. */
export const aria = (id, err) => ({ id, 'aria-invalid': err ? 'true' : 'false', 'aria-describedby': err ? `${id}-error` : undefined })
