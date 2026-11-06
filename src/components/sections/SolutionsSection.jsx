import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Container from '../common/Container'
import Reveal from '../common/Reveal'
import SmartImage from '../common/SmartImage'
import { solutions } from '../../data/solutions'
import { getCategory } from '../../data/categories'
import { useLocalized } from '../../hooks/useLocalized'
import { ROUTES } from '../../constants/routes'
import { hasWebGL } from '../../utils/format'

const SolutionModel = lazy(() => import('../three/SolutionModels'))

// ảnh nền cho giải pháp băng tải (chưa có ảnh riêng) – dùng ảnh danh mục Băng tải công nghiệp
const CONVEYOR_BG = getCategory('industrial-conveyors')?.image

// màu tên giải pháp – mỗi thẻ một màu nhấn
const NAME_COLORS = ['text-[#3b6bb0]', 'text-[#c0702f]', 'text-[#7c3aed]', 'text-[#1f8a7e]', 'text-[#c2410c]']

/**
 * Giải pháp: tiêu đề lớn trái + mô tả phải; hàng thẻ trắng nhỏ – thẻ đang hover/chọn phóng to,
 * model 3D trồi khỏi mép trên, hiện mô tả + "Xem thêm".
 */
export default function SolutionsSection() {
  const { t } = useTranslation()
  const { L } = useLocalized()
  const list = solutions.filter((s) => s.id !== 'panel-coating')
  // thẻ đang mở – null khi con trỏ ở ngoài hàng thẻ (không thẻ nào mở)
  const [active, setActive] = useState(null)
  const track = useRef(null)

  // model 3D (tĩnh): chỉ tải three.js khi section sắp vào màn hình; canvas render 1 lần, không chạy vòng lặp
  const section = useRef(null)
  const [webgl] = useState(() => hasWebGL())
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const el = section.current
    if (!el || !webgl) return
    const near = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setMounted(true); near.disconnect() } }, { rootMargin: '600px' })
    near.observe(el)
    return () => near.disconnect()
  }, [webgl])

  const go = (d) => {
    const from = active ?? (d > 0 ? -1 : list.length)
    const next = Math.min(list.length - 1, Math.max(0, from + d))
    setActive(next)
    track.current?.children[next]?.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' })
  }

  return (
    <section ref={section} className="relative overflow-hidden bg-gradient-to-b from-[#dde9f7] from-55% to-[#eef1f5] to-55% py-16 md:py-24">
      <Container className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
        <div>
          <Reveal as="p" className="text-[15px] font-semibold text-brand-deep">{t('home.solEyebrow')}</Reveal>
          <Reveal as="h2" delay={0.05} className="h2 mt-2 text-ink">{t('home.solTitle')}</Reveal>
        </div>
        <Reveal as="p" delay={0.1} className="max-w-xl text-[15px] leading-relaxed text-text/70">{t('home.solDesc')}</Reveal>
      </Container>

      {/* track: lề trái căn theo container, phải tràn ra mép màn hình (thẻ cuối bị cắt như mẫu) */}
      <ul
        ref={track}
        onPointerLeave={() => setActive(null)}
        onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setActive(null) }}
        className="flex gap-5 overflow-x-auto pb-8 pl-4 pr-10 pt-24 [scrollbar-width:none] sm:pl-6 lg:pl-[max(2.5rem,calc((100vw-1400px)/2+2.5rem))] [&::-webkit-scrollbar]:hidden"
        aria-label={t('home.solTitle')}
      >
        {list.map((s, i) => {
          const on = active === i
          return (
            // khe cao cố định 330px, thẻ căn giữa theo chiều dọc → hover to ra đều trên/dưới, không đẩy layout
            <li
              key={s.id}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="flex h-[330px] shrink-0 items-center"
            >
            <div
              className={`relative rounded-2xl bg-white shadow-[0_18px_40px_-18px_rgba(18,52,90,.35)] transition-[width,height,box-shadow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${on ? 'h-[320px] w-[280px] shadow-[0_30px_60px_-20px_rgba(18,52,90,.5)]' : 'h-[260px] w-[230px]'}`}
            >
              {/* ảnh thực tế làm nền mờ – lớp trắng phủ dần từ dưới lên để chữ dễ đọc; thẻ đang chọn ảnh rõ hơn */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl" aria-hidden>
                <img
                  src={s.image ?? CONVEYOR_BG}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full object-cover transition-[opacity,scale] duration-700 ${on ? 'scale-105 opacity-40' : 'opacity-20 grayscale-[.4]'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white from-35% via-white/80 to-white/20" />
              </div>

              {/* model / ảnh: thẻ thường → to, lấp phần trên thẻ; thẻ đang chọn → trồi khỏi mép trên */}
              <div
                className={`pointer-events-none absolute left-1/2 h-[250px] w-[320px] -translate-x-1/2 transition-[top,scale] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${on ? '-top-[100px] scale-[1.08]' : '-top-[28px] scale-[.88]'}`}
                aria-hidden
              >
                {webgl ? (
                  mounted && (
                    <Suspense fallback={null}>
                      <SolutionModel kind={s.id} animate={false} />
                    </Suspense>
                  )
                ) : (
                  <div className="absolute inset-x-6 top-1/4 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black/5">
                    <SmartImage src={s.image} alt="" placeholder={s.placeholder} ratio="4/3" fit="contain" />
                  </div>
                )}
              </div>

              <Link to={`${ROUTES.solutions}#${s.id}`} className="absolute inset-0 flex flex-col justify-end rounded-2xl p-5 text-center outline-offset-4">
                <h3 className={`font-semibold leading-tight transition-[font-size] duration-500 ${NAME_COLORS[i % NAME_COLORS.length]} ${on ? 'text-[21px]' : 'text-[16px]'}`}>{L(s.title)}</h3>
                {/* mô tả + Xem thêm: chỉ hiện ở thẻ đang chọn */}
                <div className={`grid transition-[grid-template-rows,opacity] duration-500 ${on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="mt-2 line-clamp-3 text-[12.5px] leading-relaxed text-muted">{L(s.desc)}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-ink">
                      {t('common.learnMore')} <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            </li>
          )
        })}
      </ul>

      <Container className="flex items-center justify-between gap-6">
        <Link to={ROUTES.solutions} className="link-arrow text-[15px] text-ink">
          {t('home.solCta')} <ArrowUpRight size={14} />
        </Link>
        <div className="flex items-center gap-8 text-[15px] text-ink">
          <button type="button" onClick={() => go(-1)} disabled={active === 0} className="inline-flex items-center gap-1.5 transition-opacity hover:text-brand-deep disabled:opacity-30">
            <ChevronLeft size={18} /> {t('common.prevShort')}
          </button>
          <button type="button" onClick={() => go(1)} disabled={active === list.length - 1} className="inline-flex items-center gap-1.5 transition-opacity hover:text-brand-deep disabled:opacity-30">
            {t('common.nextShort')} <ChevronRight size={18} />
          </button>
        </div>
      </Container>
    </section>
  )
}
