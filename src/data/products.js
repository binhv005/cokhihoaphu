import { catalogList } from './catalog.list.generated'
import { toProduct } from './productMeta'
import { registerImageSizes } from '../utils/imageSizes'

/**
 * Danh sách sản phẩm THỰC TẾ (rút gọn) từ hoaphuco.com.vn – chỉ nạp ở các trang cần tra cứu.
 * Mô tả / thông số / video của từng máy nằm ở public/data/products/<slug>.json (tải khi mở trang chi tiết).
 * Sinh lại: cập nhật data/catalog.source.json rồi chạy `npm run build` (tự tách dữ liệu).
 */
export const products = catalogList.map(toProduct)

const bySlug = new Map(products.map((p) => [p.slug, p]))
export const getProductBySlug = (slug) => bySlug.get(slug)

/** Tải chi tiết sản phẩm (mô tả, bảng thông số, video, toàn bộ ảnh). */
const cache = new Map()
export function loadProductDetail(slug) {
  if (!cache.has(slug)) {
    cache.set(
      slug,
      fetch(`/data/products/${encodeURIComponent(slug)}.json`).then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      }).then((d) => {
        registerImageSizes(d.imageSizes)
        return d
      }).catch((e) => {
        cache.delete(slug)
        throw e
      }),
    )
  }
  return cache.get(slug)
}

export const getRelatedProducts = (product, limit = 4) => {
  const sameSub = products.filter((p) => p.id !== product.id && p.subcategoryId === product.subcategoryId && p.images.length)
  const sameCat = products.filter((p) => p.id !== product.id && p.categoryId === product.categoryId && p.subcategoryId !== product.subcategoryId && p.images.length)
  return [...sameSub, ...sameCat].slice(0, limit)
}

export { productLines, countByCategory, countBySub, countByLine, getFeaturedProducts } from './productMeta'
