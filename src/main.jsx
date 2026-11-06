import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LazyMotion } from 'framer-motion'
import './i18n'
import './index.css'
import App from './App.jsx'

// Reload luôn về đầu trang: tắt khôi phục vị trí cuộn của trình duyệt
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
window.scrollTo(0, 0)
window.addEventListener('beforeunload', () => window.scrollTo(0, 0))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* framer-motion: chỉ nạp phần lõi nhỏ, tính năng animation tải sau */}
      <LazyMotion features={() => import('./utils/motionFeatures').then((r) => r.default)} strict>
        <App />
      </LazyMotion>
    </BrowserRouter>
  </StrictMode>,
)
