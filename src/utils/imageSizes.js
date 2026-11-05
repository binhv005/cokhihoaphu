import { imageMeta } from '../data/imageMeta.generated'

/**
 * Sổ đăng ký kích thước gốc [w, h] của ảnh – dùng để KHÔNG phóng ảnh lớn hơn kích thước thật.
 * Ảnh trang trí có sẵn; ảnh sản phẩm được đăng ký khi dữ liệu sản phẩm tương ứng được nạp.
 */
const sizes = new Map(Object.entries(imageMeta))

export const registerImageSizes = (obj) => {
  for (const [src, v] of Object.entries(obj || {})) if (v) sizes.set(src, v)
}
export const getImageSize = (src) => sizes.get(src) ?? null
