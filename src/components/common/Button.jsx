import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const variants = {
  primary: 'btn-primary',
  light: 'btn-light',
  ghostDark: 'btn-ghost-dark',
  ghostLight: 'btn-ghost-light',
  navy: 'btn-navy',
}

/** Button dùng chung: `to` → Link nội bộ, `href` → thẻ a, còn lại → button. */
export default function Button({ to, href, variant = 'primary', arrow = true, icon: Icon, className = '', children, ...rest }) {
  const cls = `btn group ${variants[variant]} ${className}`
  const inner = (
    <>
      {Icon && <Icon size={17} strokeWidth={1.8} aria-hidden />}
      <span>{children}</span>
      {arrow && !Icon && (
        <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </>
  )
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>
  if (href) {
    const external = /^https?:/.test(href)
    return <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>{inner}</a>
  }
  return <button type="button" className={cls} {...rest}>{inner}</button>
}
