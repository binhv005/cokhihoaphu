import Reveal from './Reveal'

/** Heading theo phong cách editorial: tiêu đề lớn + mô tả. */
// eslint-disable-next-line no-unused-vars
export default function SectionHeading({ eyebrow, title, desc, dark = false, align = 'left', as: H = 'h2', className = '', aside }) {
  return (
    <div className={`grid gap-6 lg:grid-cols-12 lg:items-end ${className}`}>
      <div className={`min-w-0 lg:col-span-7 ${align === 'center' ? 'lg:col-start-3 lg:col-span-8 text-center' : ''}`}>
        <Reveal as={H} delay={0.05} className={`h2 ${dark ? 'text-white' : 'text-ink'}`}>{title}</Reveal>
      </div>
      {(desc || aside) && (
        <Reveal delay={0.1} className={`min-w-0 lg:col-span-4 lg:col-start-9 ${dark ? 'text-white/65' : 'text-muted'}`}>
          {desc && <p className="lead">{desc}</p>}
          {aside}
        </Reveal>
      )}
    </div>
  )
}
