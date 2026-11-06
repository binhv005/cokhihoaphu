import { useId } from 'react'
import { useTranslation } from 'react-i18next'
import { m, useReducedMotion } from 'framer-motion'
import Container from '../common/Container'
import Reveal from '../common/Reveal'

/* ---------- hình máy móc (silhouette) – gốc toạ độ ở giữa đáy, vẽ hướng lên (y âm) ---------- */

// bánh răng: dựng polygon răng cưa quanh tâm
function gearPath(cx, cy, rOut, rIn, teeth) {
  const pts = []
  for (let i = 0; i < teeth * 4; i++) {
    const a = (i / (teeth * 4)) * Math.PI * 2
    const r = i % 4 < 2 ? rOut : rIn
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`)
  }
  return `M${pts.join('L')}Z`
}

// bảng màu cho các hình – tách rõ khỏi màu nước xanh (brand-deep)
const C = {
  ink: '#101820',
  navy: '#12345a',
  yellow: '#f4b942',
  orange: '#e8833a',
  red: '#d9473b',
  teal: '#2a9d8f',
  steel: '#9aa4ae',
  steelLight: '#c9d1d9',
  wood: '#c58a52',
  hole: '#f5f7fa',
}

/** 01 – Tự chế tạo: bánh răng vàng + bánh răng cam trên bệ thép, cờ lê navy */
const Fabricate = () => (
  <g>
    <rect x="-30" y="-5" width="60" height="5" fill={C.steel} />
    <path d={gearPath(-6, -27, 21, 16, 10)} fill={C.yellow} />
    <circle cx="-6" cy="-27" r="6" fill={C.hole} />
    <circle cx="-6" cy="-27" r="2.5" fill={C.ink} />
    <path d={gearPath(19, -15, 11, 8, 7)} fill={C.orange} />
    <circle cx="19" cy="-15" r="3" fill={C.hole} />
    <path d="M-34 -5 L-31 -40 a6 6 0 1 1 3 0 L-25 -5 Z" fill={C.navy} />
  </g>
)

/** 02 – Nhập khẩu: container cam + container xanh lục, móc cẩu vàng */
const Import = () => (
  <g>
    <rect x="-32" y="-22" width="64" height="22" fill={C.orange} />
    <rect x="-24" y="-41" width="48" height="18" fill={C.teal} />
    {[-24, -16, -8, 0, 8, 16, 24].map((x) => <rect key={x} x={x} y="-19" width="2" height="16" fill="#fff" opacity=".35" />)}
    {[-16, -8, 0, 8, 16].map((x) => <rect key={x} x={x} y="-38" width="2" height="12" fill="#fff" opacity=".35" />)}
    <path d="M-12 -41 L0 -54 L12 -41" fill="none" strokeWidth="1.6" stroke={C.ink} />
    <rect x="-1" y="-70" width="2" height="16" fill={C.ink} />
    <rect x="-4" y="-56" width="8" height="4" rx="1" fill={C.yellow} />
  </g>
)

/** 03 – Máy gỗ qua sử dụng: máy cưa bàn – lưỡi thép, mặt bàn gỗ, thân navy, cữ vàng */
const TableSaw = () => (
  <g>
    <path d={gearPath(0, -24, 15, 12.5, 18)} fill={C.steelLight} />
    <circle cx="0" cy="-24" r="3" fill={C.ink} />
    <rect x="-36" y="-26" width="72" height="5" fill={C.wood} />
    <rect x="-30" y="-21" width="60" height="9" fill={C.navy} />
    <path d="M-28 -12 L-32 0 L-27 0 L-23 -12 Z M28 -12 L32 0 L27 0 L23 -12 Z" fill={C.ink} />
    <rect x="-36" y="-34" width="3" height="8" fill={C.yellow} />
  </g>
)

/** 04 – Gia công cơ khí: máy khoan đứng – đầu khoan đỏ, trụ thép, bàn vàng */
const DrillPress = () => (
  <g>
    <rect x="-24" y="-5" width="40" height="5" fill={C.ink} />
    <rect x="6" y="-62" width="5" height="57" fill={C.steel} />
    <rect x="-16" y="-30" width="30" height="4" fill={C.yellow} />
    <path d="M-20 -66 h36 v16 h-10 l-4 6 h-12 l-4 -6 h-6 Z" fill={C.red} />
    <rect x="-13" y="-44" width="4" height="8" fill={C.steelLight} />
    <path d="M-12.5 -36 L-11 -32 L-9.5 -36 Z" fill={C.ink} />
    <path d="M16 -60 L28 -52" strokeWidth="2.5" stroke={C.ink} />
    <circle cx="29" cy="-51.5" r="2.5" fill={C.red} />
  </g>
)

/** 05 – Hệ thống đồng bộ: nhà xưởng navy, mái răng cưa cam, cửa sổ sáng vàng, ống khói thép */
const Factory = () => (
  <g>
    <rect x="-30" y="-22" width="60" height="22" fill={C.navy} />
    <path d="M-30 -22 L-18 -32 V-22 L-6 -32 V-22 L6 -32 V-22 L18 -32 V-22 Z" fill={C.orange} />
    <rect x="20" y="-46" width="6" height="24" fill={C.steel} />
    <rect x="20" y="-40" width="6" height="3" fill={C.red} />
    <circle cx="27" cy="-52" r="3" fill={C.steel} opacity=".55" />
    <circle cx="32" cy="-58" r="4" fill={C.steel} opacity=".35" />
    {[-22, -10, 2, 14].map((x) => <rect key={x} x={x} y="-15" width="6" height="6" fill={C.yellow} />)}
  </g>
)

const FIGURES = [Fabricate, Import, TableSaw, DrillPress, Factory]

/* ---------- vòng tròn đổ đầy ---------- */
const CX = 100, CY = 100, R = 92

function FillCircle({ level, Figure, index }) {
  const id = useId()
  const reduce = useReducedMotion()
  const surface = CY + R - 2 * R * level // y mặt nước
  const delay = 0.15 + index * 0.15
  const viewport = { once: true, margin: '-60px' }
  return (
    <svg viewBox="0 -8 200 208" className="w-full overflow-visible" aria-hidden>
      <defs>
        <clipPath id={id}><circle cx={CX} cy={CY} r={R} /></clipPath>
      </defs>
      <circle cx={CX} cy={CY} r={R} fill="none" strokeWidth="1.5" className="stroke-brand-deep" />
      <g clipPath={`url(#${id})`}>
        <m.rect
          x="0" y={surface} width="200" height={CY + R - surface + 2}
          className="fill-brand-deep"
          initial={reduce ? false : { y: CY + R - surface }}
          whileInView={{ y: 0 }}
          viewport={viewport}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </g>
      <m.g
        className="fill-ink"
        initial={reduce ? false : { opacity: 0, y: -14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.6, delay: delay + 0.8, ease: 'easeOut' }}
      >
        <g transform={`translate(${CX} ${surface})`}><Figure /></g>
      </m.g>
    </svg>
  )
}

/** Vì sao chọn Hoà Phú – 5 vòng tròn đổ đầy dần (20% → 100%) trên một trục timeline. */
export default function WhyChooseUs() {
  const { t } = useTranslation()
  const items = t('home.why', { returnObjects: true })
  const descs = t('home.whyDesc', { returnObjects: true })
  const list = Array.isArray(items) ? items : []
  return (
    // pt nhỏ: section trước (Sản phẩm nổi bật) cùng nền bg-paper đã có khoảng đệm dưới
    <section className="bg-paper pb-16 pt-4 md:pb-24 md:pt-6">
      <Container>
        <Reveal as="h2" className="h2 max-w-2xl text-ink">{t('home.whyTitle')}</Reveal>
        <ol className="relative mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 md:mt-14 lg:grid-cols-5 lg:gap-x-8">
          {list.map((it, i) => (
            <li key={i} className="flex flex-col items-center text-center">
              <div className="w-full max-w-[220px] px-2">
                <FillCircle level={(i + 1) / list.length} Figure={FIGURES[i % FIGURES.length]} index={i} />
              </div>
              <div className="relative mt-10 flex w-full justify-center" aria-hidden>
                {/* đoạn trục timeline nối sang mốc bên cạnh (gap-x-8 → tràn 1rem mỗi bên) */}
                <span className={`absolute top-1/2 hidden h-px bg-ink/25 lg:block ${i === 0 ? 'left-1/2' : '-left-4'} ${i === list.length - 1 ? 'right-1/2' : '-right-4'}`} />
                <span className="relative block size-5 rounded-full bg-ink ring-[6px] ring-paper" />
              </div>
              <Reveal delay={i * 0.06} className="mt-8 max-w-[240px]">
                <span className="font-mono text-[12px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 text-[18px] font-semibold leading-snug text-ink">{it}</h3>
                {Array.isArray(descs) && descs[i] && <p className="mt-3 text-[14px] leading-relaxed text-muted">{descs[i]}</p>}
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
