/**
 * Service gửi biểu mẫu (Liên hệ / Yêu cầu báo giá).
 *
 * Giao diện (interface):
 *   submitContact(data)  -> Promise<{ ok: true } | { ok: false, reason: 'not_configured' | 'network' | 'server' }>
 *   submitQuote(data)    -> như trên
 *
 * - Khi có backend: đặt biến môi trường VITE_FORM_API_URL (ví dụ https://api.hoaphuco.com.vn)
 *   → service gọi POST {URL}/contact và {URL}/quote với JSON body.
 * - Khi CHƯA có backend: dùng mockAdapter – KHÔNG giả vờ gửi thành công,
 *   trả về { ok:false, reason:'not_configured' } để giao diện thông báo trung thực.
 */
const API_URL = import.meta.env.VITE_FORM_API_URL

const httpAdapter = {
  async post(path, data) {
    try {
      const res = await fetch(`${API_URL.replace(/\/$/, '')}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      return res.ok ? { ok: true } : { ok: false, reason: 'server' }
    } catch {
      return { ok: false, reason: 'network' }
    }
  },
}

const mockAdapter = {
  async post() {
    await new Promise((r) => setTimeout(r, 700)) // mô phỏng độ trễ mạng để thể hiện trạng thái loading
    return { ok: false, reason: 'not_configured' }
  },
}

const adapter = API_URL ? httpAdapter : mockAdapter

export const isFormBackendConfigured = Boolean(API_URL)
export const submitContact = (data) => adapter.post('/contact', { ...data, source: 'website-contact' })
export const submitQuote = (data) => adapter.post('/quote', { ...data, source: 'website-quote' })
