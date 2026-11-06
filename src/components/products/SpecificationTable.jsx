import { useTranslation } from 'react-i18next'
import { Phone } from 'lucide-react'
import { company } from '../../data/company'

/**
 * Bảng thông số kỹ thuật theo dữ liệu gốc của nhà sản xuất (hoaphuco.com.vn).
 * tables: { head: string[] | null, rows: string[][] }[] – mỗi bảng một nhóm model.
 * Cột đầu là tên thông số, các cột sau là giá trị theo model; ô có thể chứa xuống dòng (\n).
 * Dòng chỉ có 1 ô (ghi chú) được trải hết chiều ngang; ô cột đầu trùng nhau liên tiếp được gộp (rowspan).
 */
function Table({ table }) {
  const cols = Math.max(table.head?.length ?? 0, ...table.rows.map((r) => r.length))
  const keyed = cols > 1
  // số dòng gộp cho ô cột đầu tại mỗi dòng (0 = đã gộp vào dòng trên)
  const span = table.rows.map((r, i) => {
    if (r.length === 1 || !keyed) return 1
    if (i > 0 && table.rows[i - 1].length > 1 && table.rows[i - 1][0] === r[0]) return 0
    let n = 1
    while (table.rows[i + n] && table.rows[i + n].length > 1 && table.rows[i + n][0] === r[0]) n++
    return n
  })
  return (
    <div className="overflow-x-auto border border-text/10 bg-white">
      <table className="w-full min-w-[480px] border-collapse text-left text-[14px]">
        {table.head && (
          <thead>
            <tr className="bg-navy text-white">
              {Array.from({ length: cols }, (_, i) => (
                <th key={i} scope="col" className={`whitespace-pre-line px-4 py-3 align-bottom font-semibold ${i === 0 ? 'min-w-[200px]' : 'font-mono text-[13px]'}`}>{table.head[i] ?? ''}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {table.rows.map((r, i) => (
            <tr key={i} className="border-b border-text/10 even:bg-paper">
              {r.length === 1 ? (
                <td colSpan={cols} className="whitespace-pre-line px-4 py-3 text-ink">{r[0]}</td>
              ) : (
                Array.from({ length: cols }, (_, j) => {
                  if (j === 0) {
                    if (!span[i]) return null
                    return <th key={j} scope="row" rowSpan={span[i] > 1 ? span[i] : undefined} className="min-w-[200px] whitespace-pre-line bg-white px-4 py-3 align-top font-medium text-ink">{r[0]}</th>
                  }
                  return <td key={j} className="whitespace-pre-line px-4 py-3 align-top font-mono text-[13px] text-text">{r[j] || '–'}</td>
                })
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function SpecificationTable({ tables }) {
  const { t } = useTranslation()
  const list = (tables ?? []).filter((x) => x?.rows?.length)
  if (!list.length) {
    return (
      <div className="flex flex-col gap-4 border border-dashed border-text/25 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[15px] text-muted">{t('detail.specsEmpty')}</p>
        <a href={`tel:${company.hotlineTel}`} className="btn btn-navy shrink-0"><Phone size={16} /> {company.hotline}</a>
      </div>
    )
  }
  return (
    <div className="space-y-6">
      {list.map((tb, i) => <Table key={i} table={tb} />)}
    </div>
  )
}
