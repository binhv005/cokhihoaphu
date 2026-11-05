import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { prefersReducedMotion } from '../utils/format'

/**
 * Cuộn mượt (Lenis) đồng bộ GSAP ScrollTrigger.
 * GSAP + Lenis được tải SAU khi trang hiển thị (dynamic import) để giảm JavaScript ban đầu.
 */
let lenisInstance = null
let scrollTrigger = null
export const getLenis = () => lenisInstance

export const scrollToTop = (immediate = false) => {
  if (lenisInstance) lenisInstance.scrollTo(0, { immediate })
  else window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
}

const loadScrollLibs = () =>
  Promise.all([import('lenis'), import('gsap'), import('gsap/ScrollTrigger')]).then(([l, g, s]) => {
    g.gsap.registerPlugin(s.ScrollTrigger)
    scrollTrigger = s.ScrollTrigger
    return { Lenis: l.default, gsap: g.gsap, ScrollTrigger: s.ScrollTrigger }
  })

export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return
    let cleanup = () => {}
    let cancelled = false
    // chờ trình duyệt rảnh rồi mới khởi tạo
    const start = () =>
      loadScrollLibs().then(({ Lenis, gsap, ScrollTrigger }) => {
        if (cancelled) return
        const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
        lenisInstance = lenis
        lenis.on('scroll', ScrollTrigger.update)
        const tick = (time) => lenis.raf(time * 1000)
        gsap.ticker.add(tick)
        gsap.ticker.lagSmoothing(0)
        cleanup = () => {
          gsap.ticker.remove(tick)
          lenis.destroy()
          lenisInstance = null
        }
      })
    const idle = window.requestIdleCallback ? window.requestIdleCallback(start, { timeout: 1500 }) : setTimeout(start, 300)
    return () => {
      cancelled = true
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle)
      else clearTimeout(idle)
      cleanup()
    }
  }, [])
}

/** Cuộn lên đầu khi đổi route. */
export function useScrollRestoration() {
  const { pathname } = useLocation()
  useEffect(() => {
    scrollToTop(true)
    const id = setTimeout(() => scrollTrigger?.refresh(), 150)
    return () => clearTimeout(id)
  }, [pathname])
}
