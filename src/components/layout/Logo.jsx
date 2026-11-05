import { Link } from 'react-router-dom'
import { company } from '../../data/company'

/**
 * Logo trên nền tối: dùng phần biểu tượng (tam giác) cắt từ file logo chính thức
 * + chữ thương hiệu dạng typography (phần chữ trong file gốc màu navy, khó đọc trên nền tối).
 */
export default function Logo({ onClick, className = '' }) {
  return (
    <Link to="/" onClick={onClick} className={`flex shrink-0 items-center gap-3 whitespace-nowrap ${className}`} aria-label={`${company.brand} – Trang chủ`}>
      <img src="/images/logo-mark.png" alt="Logo Hoà Phú" width="102" height="88" className="h-9 w-auto md:h-10" />
      <span className="flex flex-col leading-tight">
        <span className="text-[15px] font-semibold tracking-[0.08em] text-white">HOÀ PHÚ</span>
        <span className="hidden font-mono text-[9.5px] uppercase tracking-[0.2em] text-white/50 xs:block">Machinery & Engineering</span>
      </span>
    </Link>
  )
}
