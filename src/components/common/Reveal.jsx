import { m, useReducedMotion } from 'framer-motion'

/** Fade / slide-up khi phần tử xuất hiện trong viewport. */
export default function Reveal({ as = 'div', delay = 0, y = 28, className = '', children, ...rest }) {
  const reduce = useReducedMotion()
  const M = m[as] ?? m.div
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </M>
  )
}

/** Tiêu đề hiện theo từng dòng (mask reveal). */
export function LineReveal({ lines, className = '', lineClass = '', lastClass = '', delay = 0, animateOnMount = false }) {
  const reduce = useReducedMotion()
  return (
    // Theo dõi viewport trên phần tử cha (dòng chữ con bị overflow-hidden cắt nên không tự "in view" được)
    <m.span
      className={`block ${className}`}
      initial={reduce ? false : 'hidden'}
      {...(animateOnMount ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, margin: '-40px' } })}
    >
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <m.span
            className={`block ${lineClass} ${i === lines.length - 1 ? lastClass : ''}`}
            variants={{ hidden: { y: '110%' }, show: { y: 0, transition: { duration: 1.1, delay: delay + i * 0.12, ease: [0.16, 1, 0.3, 1] } } }}
          >
            {l}
          </m.span>
        </span>
      ))}
    </m.span>
  )
}
