import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../common/Button'
import Reveal, { LineReveal } from '../common/Reveal'
import { ROUTES } from '../../constants/routes'
import { hasWebGL } from '../../utils/format'

gsap.registerPlugin(ScrollTrigger)
const IndustrialScene = lazy(() => import('../three/IndustrialScene'))

// Nền chờ / dự phòng: bản vẽ kỹ thuật ở đúng kích thước gốc (không phóng to)
const Backdrop = ({ label }) => (
  <div role={label ? 'img' : undefined} aria-label={label} className="grid-lines h-full w-full bg-ink bg-[url('/images/banner-hoaphu.webp')] bg-[length:auto] bg-center bg-no-repeat bg-blend-luminosity opacity-60" />
)

function useQuality() {
  return useMemo(() => {
    if (typeof window === 'undefined') return 'low'
    const w = window.innerWidth
    const cores = navigator.hardwareConcurrency || 4
    return w >= 1200 && cores >= 4 ? 'high' : 'low'
  }, [])
}

export default function HeroSection() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const quality = useQuality()
  const wrap = useRef(null)
  const progress = useRef(0)
  const [webgl] = useState(() => hasWebGL())
  // Hoãn tải three.js (~230 KB gzip) đến khi trình duyệt rảnh – chữ & nút hero hiển thị trước
  const [ready3d, setReady3d] = useState(false)
  useEffect(() => {
    if (!webgl) return
    const go = () => setReady3d(true)
    const id = window.requestIdleCallback ? window.requestIdleCallback(go, { timeout: 1200 }) : setTimeout(go, 400)
    return () => (window.cancelIdleCallback ? window.cancelIdleCallback(id) : clearTimeout(id))
  }, [webgl])
  const [active, setActive] = useState(true)
  const [scene, setScene] = useState(0)
  const scenes = ['s1', 's2', 's3', 's4', 's5', 's6']
  const textRight = scene > 0 && scene < 6 && scene % 2 === 0 // scene 02/04 đặt chữ bên phải (06 bên trái)

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        progress.current = self.progress
        const idx = Math.round(self.progress * scenes.length)
        setScene((s) => (s === idx ? s : idx))
      },
    })
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: '100px' })
    io.observe(el)
    return () => { st.kill(); io.disconnect() }
  }, [scenes.length])

  const D = 0.35 // delay cơ sở cho chuỗi xuất hiện

  return (
    <section ref={wrap} className="relative bg-ink text-white" aria-label="Hoà Phú – Industrial Machinery">
      {/* ===== Sticky 3D stage ===== */}
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        <m.div className="absolute inset-0" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6 }}>
          {webgl ? (
            ready3d ? (
              <Suspense fallback={<Backdrop />}>
                <IndustrialScene progress={progress} quality={quality} animate={!reduce} intro={!reduce} active={active} />
              </Suspense>
            ) : (
              <Backdrop />
            )
          ) : (
            <Backdrop label={t('hero.webglFallback')} />
          )}
        </m.div>
        {/* overlays cho khả năng đọc chữ */}
        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/30 to-transparent transition-opacity duration-1000 max-md:bg-gradient-to-t max-md:from-ink max-md:via-ink/60 max-md:to-ink/10 ${textRight ? 'md:opacity-0' : 'opacity-100'}`} aria-hidden />
        <div className={`pointer-events-none absolute inset-0 hidden bg-gradient-to-l from-ink/90 via-ink/40 to-transparent transition-opacity duration-1000 md:block ${textRight ? 'opacity-100' : 'opacity-0'}`} aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" aria-hidden />
        <div className="grain pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      </div>

      {/* ===== Nội dung cuộn phía trên ===== */}
      <div className="relative z-[5] -mt-[100svh]">
        {/* HERO */}
        <div className="container-x flex min-h-svh flex-col justify-end pb-24 pt-40 md:justify-center md:pb-16">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h1 className="h-display">
                <LineReveal lines={[t('hero.line1'), t('hero.line2'), t('hero.line3')]} animateOnMount delay={D + 0.2} lastClass="text-accent" />
              </h1>
              <m.p className="lead mt-8 max-w-xl text-white/70" initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: D + 0.9, duration: 0.9 }}>
                {t('hero.desc')}
              </m.p>
              <m.div className="mt-10 flex flex-wrap gap-3" initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: D + 1.15, duration: 0.9 }}>
                <Button to={ROUTES.products}>{t('hero.cta1')}</Button>
                <Button to={ROUTES.quote()} variant="ghostDark">{t('hero.cta2')}</Button>
              </m.div>
            </div>
          </div>
        </div>

        {/* SCENES */}
        {scenes.map((s, i) => {
          const right = i % 2 === 1 && s !== 's6'
          return (
            <div key={s} className="container-x flex min-h-svh items-end pb-24 md:items-center md:pb-0">
              <div className={`w-full max-w-xl ${right ? 'md:ml-auto md:mr-[8%]' : ''}`}>
                <Reveal as="h2" y={0} transition={{ duration: 1.4, delay: 0.05, ease: "easeOut" }} className="h1 text-white">{t(`scenes.${s}.title`)}</Reveal>
                {s === 's6' && (
                  <Reveal y={0} transition={{ duration: 1.4, delay: 0.35, ease: "easeOut" }} className="mt-10 flex flex-wrap gap-3">
                    <Button to={ROUTES.products}>{t('scenes.s6.cta')}</Button>
                    <Button to={ROUTES.contact} variant="ghostDark">{t('nav.contact')}</Button>
                  </Reveal>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
