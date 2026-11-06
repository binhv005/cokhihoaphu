import Container from './Container'
import Breadcrumb from './Breadcrumb'
import { LineReveal } from './Reveal'

/**
 * Hero trang con: nền tối có ảnh mờ + lưới kỹ thuật, tiêu đề lớn, breadcrumb.
 * `children` hiển thị dưới tiêu đề (CTA, tìm kiếm...).
 */
// eslint-disable-next-line no-unused-vars
export default function PageHero({ eyebrow, title, desc, breadcrumb = [], image, children, compact = false, index }) {
  // `eyebrow`, `desc`, `index` được giữ để tương thích – tag trang trí và dòng mô tả đã bỏ theo yêu cầu; `image` là ảnh nền nửa phải
  return (
    <section className={`relative isolate overflow-hidden bg-ink text-white ${compact ? 'pt-36 pb-14 md:pt-44 md:pb-20' : 'pt-36 pb-16 md:pt-48 md:pb-28'}`}>
      {/* nền bản vẽ kỹ thuật (banner gốc hoaphuco.com.vn) – hiển thị đúng kích thước thật, không phóng to */}
      <div className="absolute inset-0 -z-30 bg-[url('/images/banner-hoaphu.webp')] bg-[length:auto] bg-right-top bg-no-repeat opacity-[0.18] mix-blend-luminosity" aria-hidden />
      {/* ảnh thực tế của từng trang ở nửa phải, phủ xanh logo */}
      {image && (
        <div className="absolute inset-y-0 right-0 -z-20 w-full md:w-[62%]" aria-hidden>
          <img key={image} src={image} alt="" decoding="async" className="h-full w-full object-cover opacity-70 saturate-[.85]" />
          <div className="absolute inset-0 bg-[#3b6bb0]/30 mix-blend-multiply" />
        </div>
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/20 max-md:bg-gradient-to-b max-md:from-ink/80 max-md:via-ink/75 max-md:to-ink" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-b from-transparent to-ink/70" aria-hidden />
      <div className="grid-lines absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
      <Container>
        <Breadcrumb items={breadcrumb} />
        <div className="mt-10 lg:mt-14">
          <h1 className="h1 max-w-5xl"><LineReveal lines={Array.isArray(title) ? title : [title]} animateOnMount /></h1>
        </div>
        {children && <div className="mt-10">{children}</div>}
      </Container>
    </section>
  )
}
