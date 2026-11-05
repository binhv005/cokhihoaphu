import { useTranslation } from 'react-i18next'
import { Phone } from 'lucide-react'
import { company } from '../../data/company'

/**
 * Bảng thông số kỹ thuật theo dữ liệu gốc của nhà sản xuất.
 * table: { head: string[] | null, rows: string[][] } – cột đầu là tên thông số, các cột sau là giá trị theo model.
 */
export default function SpecificationTable({ table }) {
  const { t } = useTranslation()
  if (!table?.rows?.length) {
    return (
      <div className="flex flex-col gap-4 border border-dashed border-text/25 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[15px] text-muted">{t('detail.specsEmpty')}</p>
        <a href={`tel:${company.hotlineTel}`} className="btn btn-navy shrink-0"><Phone size={16} /> {company.hotline}</a>
      </div>
    )
  }
  const cols = table.head?.length ?? table.rows[0].length
  return (
    <div className="overflow-x-auto border border-text/10 bg-white" data-lenis-prevent-wheel="">
      <table className="w-full min-w-[480px] border-collapse text-left text-[14px]">
        {table.head && (
          <thead>
            <tr className="bg-navy text-white">
              {table.head.map((h, i) => (
                <th key={i} scope="col" className={`px-4 py-3 font-semibold ${i === 0 ? 'min-w-[200px]' : 'whitespace-nowrap font-mono text-[13px]'}`}>{h}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {table.rows.map((r, i) => (
            <tr key={i} className="border-b border-text/10 even:bg-paper">
              {Array.from({ length: cols }, (_, j) =>
                j === 0 ? (
                  <th key={j} scope="row" className="min-w-[200px] px-4 py-3 font-medium text-ink">{r[j]}</th>
                ) : (
                  <td key={j} className="whitespace-nowrap px-4 py-3 font-mono text-[13px] text-text">{r[j] || '–'}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
