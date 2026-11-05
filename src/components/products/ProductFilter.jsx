import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'
import { categories } from '../../data/categories'
import { countByCategory, countByLine, countBySub, productLines, totalProducts } from '../../data/productMeta'
import { useLocalized } from '../../hooks/useLocalized'

/**
 * Sidebar bộ lọc: cây danh mục nhiều cấp (danh mục → loại máy) + tình trạng (chỉ khi có dữ liệu).
 * value: { category, type, condition } ; onChange(partial)
 */
export default function ProductFilter({ value, onChange, onClear }) {
  const { t } = useTranslation()
  const { L } = useLocalized()
  const [expanded, setExpanded] = useState(() => new Set(value.category ? [value.category] : [categories[0].id]))
  const toggle = (id) => setExpanded((s) => {
    const n = new Set(s)
    if (n.has(id)) n.delete(id)
    else n.add(id)
    return n
  })
  const conditions = ['new', 'used']

  return (
    <div className="space-y-10">
      <div>
        <p className="eyebrow mb-4 text-muted">{t('products.categories')}</p>
        <button
          type="button"
          onClick={() => onChange({ category: '', type: '' })}
          className={`flex w-full items-center justify-between border-b border-text/10 py-3 text-left text-[15px] font-medium transition-colors ${!value.category ? 'text-orange' : 'text-ink hover:text-navy'}`}
        >
          {t('products.all')} <span className="font-mono text-[11px] text-muted">{totalProducts}</span>
        </button>
        <ul>
          {categories.map((c) => {
            const isOpen = expanded.has(c.id)
            const isActive = value.category === c.id
            return (
              <li key={c.id} className="border-b border-text/10">
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => { onChange({ category: c.id, type: '' }); setExpanded((s) => new Set(s).add(c.id)) }}
                    aria-pressed={isActive && !value.type}
                    className={`flex flex-1 items-baseline gap-3 py-3 text-left text-[14px] font-semibold uppercase tracking-[0.04em] transition-colors ${isActive ? 'text-navy' : 'text-ink hover:text-navy'}`}
                  >
                    <span className="font-mono text-[10px] text-orange">{c.no}</span>
                    <span className="flex-1">{L(c.name)}</span>
                    <span className="font-mono text-[11px] font-normal text-muted">{countByCategory(c.id)}</span>
                  </button>
                  <button type="button" onClick={() => toggle(c.id)} aria-expanded={isOpen} aria-label={L(c.name)} className="p-2 text-muted hover:text-ink">
                    <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                {isOpen && (
                  <ul className="pb-3 pl-6">
                    {c.children.map((s) => {
                      const n = countBySub(s.id)
                      const on = value.type === s.id
                      return (
                        <li key={s.id}>
                          <button
                            type="button"
                            onClick={() => onChange({ category: c.id, type: on ? '' : s.id })}
                            aria-pressed={on}
                            className={`flex w-full items-center justify-between py-1.5 text-left text-[14px] transition-colors ${on ? 'font-medium text-orange' : n ? 'text-text/80 hover:text-navy' : 'text-muted/70 hover:text-navy'}`}
                          >
                            <span className="flex items-center gap-2"><span className={`h-1.5 w-1.5 rounded-full ${on ? 'bg-orange' : 'bg-text/20'}`} />{L(s.name)}</span>
                            <span className="font-mono text-[11px] text-muted">{n}</span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </div>

      {conditions.length > 0 && (
        <div>
          <p className="eyebrow mb-4 text-muted">{t('products.condition')}</p>
          <div className="flex flex-wrap gap-2">
            {conditions.map((c) => (
              <button key={c} type="button" onClick={() => onChange({ condition: value.condition === c ? '' : c })} aria-pressed={value.condition === c} className={`rounded-full border px-4 py-2 text-[13px] ${value.condition === c ? 'border-navy bg-navy text-white' : 'border-text/20 hover:border-navy'}`}>
                {t(`products.${c}`)}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="eyebrow mb-4 text-muted">{t('products.line')}</p>
        <div className="flex flex-col items-start gap-1.5">
          {Object.entries(productLines).map(([id, name]) => {
            const n = countByLine(id)
            const on = value.line === id
            return (
              <button key={id} type="button" onClick={() => onChange({ line: on ? '' : id })} aria-pressed={on} className={`flex w-full items-center justify-between gap-3 py-1 text-left text-[14px] ${on ? 'font-medium text-orange' : 'text-text/80 hover:text-navy'}`}>
                <span className="flex items-center gap-2"><span className={`h-1.5 w-1.5 rounded-full ${on ? 'bg-orange' : 'bg-text/20'}`} />{L(name)}</span>
                <span className="font-mono text-[11px] text-muted">{n}</span>
              </button>
            )
          })}
        </div>
      </div>

      <button type="button" onClick={onClear} className="link-arrow text-[13px] text-orange">{t('products.clear')}</button>
    </div>
  )
}
