import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import PageLoader from '../components/common/PageLoader'

const Home = lazy(() => import('../pages/Home'))
const About = lazy(() => import('../pages/About'))
const Products = lazy(() => import('../pages/Products'))
const ProductDetail = lazy(() => import('../pages/ProductDetail'))
const Solutions = lazy(() => import('../pages/Solutions'))
const Projects = lazy(() => import('../pages/Projects'))
const News = lazy(() => import('../pages/News'))
const NewsDetail = lazy(() => import('../pages/NewsDetail'))
const Contact = lazy(() => import('../pages/Contact'))
const RequestQuote = lazy(() => import('../pages/RequestQuote'))
const NotFound = lazy(() => import('../pages/NotFound'))

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Suspense fallback={<PageLoader />}><Home /></Suspense>} />
        <Route path="about" element={<Suspense fallback={<PageLoader />}><About /></Suspense>} />
        <Route path="products" element={<Suspense fallback={<PageLoader />}><Products /></Suspense>} />
        <Route path="products/:slug" element={<Suspense fallback={<PageLoader />}><ProductDetail /></Suspense>} />
        <Route path="solutions" element={<Suspense fallback={<PageLoader />}><Solutions /></Suspense>} />
        <Route path="projects" element={<Suspense fallback={<PageLoader />}><Projects /></Suspense>} />
        <Route path="news" element={<Suspense fallback={<PageLoader />}><News /></Suspense>} />
        <Route path="news/:slug" element={<Suspense fallback={<PageLoader />}><NewsDetail /></Suspense>} />
        <Route path="contact" element={<Suspense fallback={<PageLoader />}><Contact /></Suspense>} />
        <Route path="request-quote" element={<Suspense fallback={<PageLoader />}><RequestQuote /></Suspense>} />
        <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
      </Route>
    </Routes>
  )
}
