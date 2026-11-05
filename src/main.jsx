import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LazyMotion } from 'framer-motion'
import './i18n'
import './index.css'
import App from './App.jsx'

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
