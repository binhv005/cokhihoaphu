import { Search, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function ProductSearch({ value, onChange, placeholder, dark = false }) {
  const { t } = useTranslation()
  return (
    <div className={`relative flex items-center border-b ${dark ? 'border-white/25 focus-within:border-orange' : 'border-text/20 focus-within:border-navy'}`}>
      <Search size={18} className={`pointer-events-none absolute left-0 ${dark ? 'text-white/50' : 'text-muted'}`} aria-hidden />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? t('products.search')}
        aria-label={placeholder ?? t('products.search')}
        className={`w-full bg-transparent py-3.5 pl-8 pr-8 text-[15px] outline-none [&::-webkit-search-cancel-button]:hidden ${dark ? 'text-white placeholder:text-white/40' : 'text-ink placeholder:text-muted/70'}`}
      />
      {value && (
        <button type="button" onClick={() => onChange('')} aria-label={t('products.clear')} className={`absolute right-0 p-1 ${dark ? 'text-white/60 hover:text-white' : 'text-muted hover:text-ink'}`}>
          <X size={16} />
        </button>
      )}
    </div>
  )
}
