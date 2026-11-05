import { useTranslation } from 'react-i18next'

export default function LanguageSwitch({ className = '' }) {
  const { i18n } = useTranslation()
  const cur = i18n.language?.startsWith('en') ? 'en' : 'vi'
  return (
    <div className={`flex items-center gap-1 font-mono text-[11px] tracking-[0.18em] ${className}`} role="group" aria-label="Language">
      {['vi', 'en'].map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="opacity-30">/</span>}
          <button
            type="button"
            onClick={() => i18n.changeLanguage(l)}
            aria-pressed={cur === l}
            className={`px-1 py-0.5 uppercase transition-colors ${cur === l ? 'text-orange' : 'opacity-60 hover:opacity-100'}`}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  )
}
