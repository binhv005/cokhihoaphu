import { useTranslation } from 'react-i18next'

/**
 * Hình minh hoạ kỹ thuật dạng bản vẽ (blueprint) – dùng khi CHƯA có ảnh thực tế.
 * Luôn kèm nhãn "Hình minh hoạ" để không gây hiểu nhầm là ảnh sản phẩm thật.
 */
const S = { stroke: 'currentColor', fill: 'none', strokeWidth: 1.4, vectorEffect: 'non-scaling-stroke' }
const Thin = { ...S, strokeWidth: 0.8, opacity: 0.5 }

const Roller = ({ x, y, r = 9 }) => (
  <g>
    <circle cx={x} cy={y} r={r} {...S} />
    <circle cx={x} cy={y} r={2} {...S} />
  </g>
)

const Gear = ({ cx, cy, r, teeth = 16, inner = 0.55 }) => {
  const pts = []
  for (let i = 0; i < teeth * 2; i++) {
    const a = (i / (teeth * 2)) * Math.PI * 2
    const rr = i % 2 === 0 ? r : r * 0.86
    const a2 = a + Math.PI / (teeth * 2)
    pts.push(`${cx + rr * Math.cos(a)},${cy + rr * Math.sin(a)}`, `${cx + rr * Math.cos(a2)},${cy + rr * Math.sin(a2)}`)
  }
  return (
    <g>
      <polygon points={pts.join(' ')} {...S} />
      <circle cx={cx} cy={cy} r={r * inner} {...Thin} />
      <circle cx={cx} cy={cy} r={r * 0.18} {...S} />
    </g>
  )
}

const Dim = ({ x1, x2, y, label }) => (
  <g className="font-mono" fontSize="9" fill="currentColor">
    <line x1={x1} x2={x2} y1={y} y2={y} {...Thin} />
    <line x1={x1} x2={x1} y1={y - 5} y2={y + 5} {...Thin} />
    <line x1={x2} x2={x2} y1={y - 5} y2={y + 5} {...Thin} />
    <text x={(x1 + x2) / 2} y={y - 6} textAnchor="middle" opacity=".7">{label}</text>
  </g>
)

const drawings = {
  conveyor: (
    <g>
      <rect x="40" y="110" width="320" height="16" rx="8" {...S} />
      {Array.from({ length: 9 }, (_, i) => <Roller key={i} x={60 + i * 35} y={118} r={6} />)}
      <line x1="60" y1="126" x2="60" y2="200" {...S} /><line x1="340" y1="126" x2="340" y2="200" {...S} />
      <line x1="200" y1="126" x2="200" y2="200" {...S} />
      <line x1="40" y1="200" x2="360" y2="200" {...Thin} />
      <rect x="250" y="140" width="40" height="26" {...S} /><circle cx="270" cy="153" r="7" {...Thin} />
      <rect x="110" y="84" width="60" height="26" {...Thin} /><rect x="210" y="88" width="44" height="22" {...Thin} />
      <Dim x1={40} x2={360} y={60} label="L" />
    </g>
  ),
  gear: (
    <g>
      <Gear cx={150} cy={130} r={62} teeth={20} />
      <Gear cx={252} cy={102} r={40} teeth={14} />
      <Gear cx={262} cy={186} r={26} teeth={10} />
      <line x1="60" y1="130" x2="340" y2="130" {...Thin} strokeDasharray="6 4" />
      <line x1="150" y1="40" x2="150" y2="220" {...Thin} strokeDasharray="6 4" />
    </g>
  ),
  line: (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={30 + i * 88} y={90} width={70} height={60} {...S} />
          <rect x={40 + i * 88} y={70} width={50} height={20} {...Thin} />
          <line x1={38 + i * 88} y1={150} x2={38 + i * 88} y2={190} {...S} />
          <line x1={92 + i * 88} y1={150} x2={92 + i * 88} y2={190} {...S} />
        </g>
      ))}
      <line x1="20" y1="132" x2="380" y2="132" {...S} />
      {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={28 + i * 31} cy={136} r={3} {...Thin} />)}
      <path d="M118 120 h22 M206 120 h22 M294 120 h22" {...S} markerEnd="url(#arr)" />
      <Dim x1={30} x2={364} y={46} label="LINE" />
    </g>
  ),
  compressor: (
    <g>
      <rect x="80" y="70" width="150" height="130" rx="4" {...S} />
      <rect x="96" y="86" width="60" height="40" {...Thin} />
      {Array.from({ length: 7 }, (_, i) => <line key={i} x1="170" x2="216" y1={88 + i * 8} y2={88 + i * 8} {...Thin} />)}
      <rect x="250" y="110" width="80" height="90" rx="40" {...S} />
      <path d="M230 100 h40 v10" {...S} />
      <circle cx="290" cy="150" r="10" {...Thin} />
      <line x1="60" y1="200" x2="350" y2="200" {...Thin} />
    </g>
  ),
  machine: (
    <g>
      <rect x="50" y="150" width="300" height="20" {...S} />
      <line x1="70" y1="170" x2="70" y2="205" {...S} /><line x1="330" y1="170" x2="330" y2="205" {...S} />
      <rect x="140" y="60" width="18" height="90" {...S} /><rect x="242" y="60" width="18" height="90" {...S} />
      <rect x="132" y="50" width="136" height="20" {...S} />
      <rect x="186" y="70" width="28" height="44" {...S} /><line x1="200" y1="114" x2="200" y2="132" {...S} />
      <rect x="90" y="136" width="220" height="14" {...Thin} />
      <Dim x1={50} x2={350} y={30} label="X" />
    </g>
  ),
}

export default function Blueprint({ type = 'machine', label = true, className = '' }) {
  const { t } = useTranslation()
  return (
    <div className={`relative h-full w-full overflow-hidden bg-[#0f2540] text-[#9cc4e4] ${className}`} role="img" aria-label={t('common.illustration')}>
      <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'linear-gradient(rgba(156,196,228,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(156,196,228,.10) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      <svg viewBox="0 0 400 240" className="relative h-full w-full p-[6%]" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor" /></marker>
        </defs>
        {drawings[type] ?? drawings.machine}
      </svg>
      {label && (
        <span className="absolute bottom-2 left-2 right-2 truncate font-mono text-[10px] uppercase tracking-[0.14em] text-[#9cc4e4]/80">{t('common.illustration')}</span>
      )}
    </div>
  )
}
