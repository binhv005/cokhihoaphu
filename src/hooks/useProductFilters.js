import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products } from '../data/products'
import { normalizeText } from '../utils/format'

/** Bộ lọc sản phẩm đồng bộ với URL query (?category=&type=&condition=&q=&sort=). */
export function useProductFilters(lang) {
  const [params, setParams] = useSearchParams()
  const value = {
    category: params.get('category') || '',
    type: params.get('type') || '',
    condition: params.get('condition') || '',
    line: params.get('line') || '',
    q: params.get('q') || '',
    sort: params.get('sort') || '',
  }
  const page = Math.max(1, parseInt(params.get('page'), 10) || 1)

  const update = useCallback(
    (partial) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          Object.entries(partial).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)))
          // đổi bộ lọc → quay về trang 1
          if (!('page' in partial)) next.delete('page')
          if (next.get('page') === '1') next.delete('page')
          return next
        },
        // chuyển trang → thêm mục lịch sử (nút Back hoạt động); đổi bộ lọc → thay thế
        { replace: !('page' in partial), preventScrollReset: true },
      )
    },
    [setParams],
  )
  const clear = useCallback(() => setParams({}, { replace: true, preventScrollReset: true }), [setParams])

  const results = useMemo(() => {
    const q = normalizeText(value.q.trim())
    let list = products.filter(
      (p) =>
        (!value.category || p.categoryId === value.category) &&
        (!value.type || p.subcategoryId === value.type) &&
        (!value.condition || p.condition === value.condition) &&
        (!value.line || p.line === value.line) &&
        (!q || normalizeText(`${p.name.vi} ${p.code ?? ''} ${p.subcategoryName?.vi} ${p.subcategoryName?.en}`).includes(q)),
    )
    if (value.sort === 'az' || value.sort === 'za') {
      list = [...list].sort((a, b) => a.name[lang].localeCompare(b.name[lang], lang))
      if (value.sort === 'za') list.reverse()
    }
    return list
  }, [value.category, value.type, value.condition, value.line, value.q, value.sort, lang])

  const activeCount = ['category', 'type', 'condition', 'line', 'q'].filter((k) => value[k]).length
  return { value, page, update, clear, results, activeCount }
}
