import { Outlet } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import FloatingContact from '../components/common/FloatingContact'
import { useScrollRestoration, useSmoothScroll } from '../hooks/useSmoothScroll'

export default function MainLayout() {
  useSmoothScroll()
  useScrollRestoration()
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}
