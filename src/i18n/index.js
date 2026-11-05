import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import vi from '../locales/vi/translation.json'
import en from '../locales/en/translation.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { vi: { translation: vi }, en: { translation: en } },
    fallbackLng: 'vi',
    supportedLngs: ['vi', 'en'],
    nonExplicitSupportedLngs: false,
    load: 'languageOnly',
    // Mặc định Tiếng Việt; chỉ dùng ngôn ngữ đã lưu trước đó.
    detection: { order: ['localStorage'], lookupLocalStorage: 'hoaphu-lang', caches: ['localStorage'] },
    interpolation: { escapeValue: false },
    returnObjects: true,
  })

const syncHtmlLang = (lng) => {
  if (typeof document !== 'undefined') document.documentElement.lang = lng?.startsWith('en') ? 'en' : 'vi'
}
syncHtmlLang(i18n.language)
i18n.on('languageChanged', syncHtmlLang)

export default i18n
