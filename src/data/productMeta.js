import { catalogMeta } from './catalog.meta.generated'
import { getCategory, getSubcategory } from './categories'
import { registerImageSizes } from '../utils/imageSizes'

/**
 * Dữ liệu NHẸ về sản phẩm (vài KB): số lượng theo danh mục + sản phẩm nổi bật.
 * Dùng ở header (mega menu), trang chủ… để không phải nạp toàn bộ danh mục.
 */
export const productLines = {
  kuboke: { vi: 'Hoà Phú – Kuboke (tự sản xuất)', en: 'Hoa Phu – Kuboke (own manufacturing)' },
  import: { vi: 'Nhập khẩu Taiwan – EU – Japan', en: 'Imported Taiwan – EU – Japan' },
  china: { vi: 'Máy gỗ Trung Quốc', en: 'Chinese machinery' },
  used: { vi: 'Máy qua sử dụng', en: 'Used machinery' },
  hoaphu: { vi: 'Hoà Phú', en: 'Hoa Phu' },
}

/** Chuẩn hoá bản ghi rút gọn thành dạng component sử dụng. */
export const toProduct = (p) => {
  if (p.image && p.size) registerImageSizes({ [p.image]: p.size })
  const cat = getCategory(p.categoryId)
  return {
    ...p,
    name: { vi: p.name, en: p.name }, // tên riêng của máy giữ nguyên theo website gốc
    images: p.image ? [p.image] : [],
    categoryName: cat?.name,
    subcategoryName: getSubcategory(p.categoryId, p.subcategoryId)?.name,
    lineName: productLines[p.line],
    placeholder: cat?.placeholder ?? 'machine',
  }
}

export const totalProducts = catalogMeta.total
export const countByCategory = (id) => catalogMeta.byCategory[id] ?? 0
export const countBySub = (id) => catalogMeta.bySub[id] ?? 0
export const countByLine = (id) => catalogMeta.byLine[id] ?? 0
export const getFeaturedProducts = () => catalogMeta.featured.map(toProduct)
