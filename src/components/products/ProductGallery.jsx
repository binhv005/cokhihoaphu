import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Expand } from 'lucide-react'
import SmartImage from '../common/SmartImage'
import Lightbox from '../common/Lightbox'

/** Gallery sản phẩm – ảnh hiển thị trọn vẹn ở kích thước gốc (không phóng to gây mờ). */
export default function ProductGallery({ images, alt, placeholder }) {
  const { t } = useTranslation()
  const [cur, setCur] = useState(0)
  const [lb, setLb] = useState(null)

  if (!images.length) {
    return <SmartImage src={null} alt={alt} ratio="4/3" placeholder={placeholder} />
  }
  return (
    <div>
      <button type="button" onClick={() => setLb(cur)} className="group relative block w-full overflow-hidden bg-white" aria-label={`${alt} – ${t('common.explore')}`}>
        <SmartImage key={images[cur]} src={images[cur]} alt={alt} ratio="4/3" fit="contain" eager className="!bg-white" />
        <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-ink/70 text-white backdrop-blur transition-colors group-hover:bg-brand group-hover:text-ink"><Expand size={18} /></span>
      </button>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-6">
          {images.map((src, i) => (
            <button key={src} type="button" onClick={() => setCur(i)} aria-label={`${alt} ${i + 1}`} aria-current={cur === i} className={`overflow-hidden bg-white outline-offset-2 transition-opacity ${cur === i ? 'ring-2 ring-brand' : 'opacity-60 hover:opacity-100'}`}>
              <SmartImage src={src} alt="" ratio="1/1" className="!bg-white" />
            </button>
          ))}
        </div>
      )}
      <Lightbox items={images.map((src, i) => ({ src, alt: `${alt} ${i + 1}` }))} index={lb} onClose={() => setLb(null)} onChange={setLb} />
    </div>
  )
}
