import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

/** Trả về hàm L(obj) chọn giá trị {vi, en} theo ngôn ngữ hiện tại. */
export function useLocalized() {
  const { i18n } = useTranslation()
  const lang = i18n.language?.startsWith('en') ? 'en' : 'vi'
  const L = useCallback((v) => (v && typeof v === 'object' && !Array.isArray(v) ? v[lang] ?? v.vi : v), [lang])
  return { L, lang }
}
