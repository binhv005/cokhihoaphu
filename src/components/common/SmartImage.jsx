import { useState } from 'react'
import Blueprint from './Blueprint'
import { getImageSize } from '../../utils/imageSizes'

/**
 * Ảnh có lazy-loading, placeholder khi đang tải và fallback blueprint khi lỗi / không có ảnh.
 * - Khung có tỉ lệ cố định (ratio) để tránh layout shift.
 * - KHÔNG phóng ảnh lớn hơn kích thước gốc (tránh mờ): ảnh bị giới hạn bằng max-width/height
 *   theo kích thước thật và căn giữa trong khung.
 * - fit="contain" hiển thị trọn ảnh (dùng cho ảnh sản phẩm chi tiết).
 */
export default function SmartImage({ src, alt = '', ratio, className = '', imgClass = '', placeholder = 'machine', eager = false, zoom = false, fit = 'cover' }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const size = src ? getImageSize(src) : null
  const style = ratio ? { aspectRatio: ratio } : undefined
  const capStyle = size ? { maxWidth: `${size[0]}px`, maxHeight: `${size[1]}px` } : undefined

  return (
    <div className={`relative overflow-hidden bg-ink-2 ${className}`} style={style}>
      {!src || failed ? (
        <Blueprint type={placeholder} />
      ) : (
        <>
          {!loaded && <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-ink-2 to-navy/60" aria-hidden />}
          <img
            src={src}
            alt={alt}
            width={size?.[0]}
            height={size?.[1]}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            style={capStyle}
            className={`absolute inset-0 m-auto h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'} transition-[opacity,transform] duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] ${loaded ? 'opacity-100' : 'opacity-0'} ${zoom ? 'group-hover:scale-[1.04]' : ''} ${imgClass}`}
          />
        </>
      )}
    </div>
  )
}
