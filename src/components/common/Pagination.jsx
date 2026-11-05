import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/** Danh sách số trang rút gọn: 1 … 4 5 [6] 7 8 … 27 */
export function pageList(current, total, delta = 1) {
  const pages = new Set([1, total])
  for (let i = current - delta; i <= current + delta; i++) if (i > 1 && i < total) pages.add(i)
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)
  const out = []
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push(p - sorted[i - 1] === 2 ? p - 1 : `gap-${p}`)
    out.push(p)
  })
  return out
}

/** Phân trang: nút trước/sau + số trang (rút gọn trên mobile). */
export default function Pagination({ page, total, onChange, className = '' }) {
  const { t } = useTranslation()
  if (total <= 1) return null
  const btn = 'flex h-11 min-w-11 items-center justify-center rounded-full border px-3 font-mono text-[13px] transition-colors'
  const items = pageList(page, total)
  const mobileItems = pageList(page, total, 0)

  const render = (list, extra) =>
    list.map((p) =>
      typeof p === 'string' ? (
        <li key={p} className={`${extra} px-1 text-muted`} aria-hidden>…</li>
      ) : (
        <li key={p} className={extra}>
          <button
            type="button"
            onClick={() => onChange(p)}
            aria-current={p === page ? 'page' : undefined}
            aria-label={`${t('news.page')} ${p}`}
            className={`${btn} ${p === page ? 'border-navy bg-navy text-white' : 'border-text/20 text-ink hover:border-navy'}`}
          >
            {p}
          </button>
        </li>
      ),
    )

  return (
    <nav aria-label="Pagination" className={`flex items-center justify-center gap-2 ${className}`}>
      <button type="button" onClick={() => onChange(page - 1)} disabled={page <= 1} aria-label={t('common.prevPage')} className={`${btn} border-text/20 text-ink enabled:hover:border-navy disabled:opacity-30`}>
        <ChevronLeft size={18} />
      </button>
      <ul className="flex items-center gap-2">
        {render(items, 'hidden sm:block')}
        {render(mobileItems, 'sm:hidden')}
      </ul>
      <button type="button" onClick={() => onChange(page + 1)} disabled={page >= total} aria-label={t('common.nextPage')} className={`${btn} border-text/20 text-ink enabled:hover:border-navy disabled:opacity-30`}>
        <ChevronRight size={18} />
      </button>
    </nav>
  )
}
