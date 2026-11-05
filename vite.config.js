import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // three.js được tách thành chunk riêng qua lazy import (chỉ tải ở trang chủ)
    chunkSizeWarningLimit: 1200,
  },
})
