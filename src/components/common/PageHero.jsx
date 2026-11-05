import { m, useReducedMotion } from 'framer-motion'
import Container from './Container'
import Breadcrumb from './Breadcrumb'
import { LineReveal } from './Reveal'

/**
 * Hero trang con: nền tối có ảnh mờ + lưới kỹ thuật, tiêu đề lớn, breadcrumb.
 * `children` hiển thị dưới mô tả (CTA, tìm kiếm...).
 */
// eslint-disable-next-line no-unused-vars
export default function PageHero({ eyebrow, title, desc, breadcrumb = [], image, children, compact = false, index }) {
  // `eyebrow`, `index`, `image` được giữ để tương thích – tag trang trí đã bỏ theo yêu cầu
  const reduce = useReducedMotion()
  return (
    <section className={`relative isolate overflow-hidden bg-ink text-white ${compact ? 'pt-36 pb-14 md:pt-44 md:pb-20' : 'pt-36 pb-16 md:pt-48 md:pb-28'}`}>
      {/* nền bản vẽ kỹ thuật (banner gốc hoaphuco.com.vn) – hiển thị đúng kích thước thật, không phóng to */}
      <div className="absolute inset-0 -z-20 bg-[url('/images/banner-hoaphu.webp')] bg-[length:auto] bg-right-top bg-no-repeat opacity-[0.18] mix-blend-luminosity" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-ink/80 to-ink" aria-hidden />
      <div className="grid-lines absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
      <Container>
        <Breadcrumb items={breadcrumb} />
        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h1 className="h1"><LineReveal lines={Array.isArray(title) ? title : [title]} animateOnMount /></h1>
          </div>
          {desc && (
            <m.p
              className="lead text-white/65 lg:col-span-4"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35 }}
            >
              {desc}
            </m.p>
          )}
        </div>
        {children && <div className="mt-10">{children}</div>}
      </Container>
    </section>
  )
}
