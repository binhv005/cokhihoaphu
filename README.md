# Hoà Phú – Website doanh nghiệp (Frontend)

Website đa trang cho **Công ty TNHH Cơ Khí Hoà Phú**: máy chế biến gỗ, dây chuyền sản xuất, băng tải công nghiệp, gia công cơ khí và thiết bị công nghiệp.

- Hero 3D (Three.js) với kể chuyện theo cuộn trang, menu toàn màn hình, bố cục editorial.
- Danh mục **317 sản phẩm thật** (tên, mã SP, mô tả, bảng thông số, ảnh gốc, video) lấy từ website chính thức hoaphuco.com.vn.
- Song ngữ VI / EN, form liên hệ & yêu cầu báo giá có validate, SEO (meta, Open Graph, JSON-LD, sitemap).

## Chạy dự án

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tách dữ liệu + sinh sitemap + build vào dist/
npm run preview    # xem bản build
```

Biến môi trường (`.env`, xem `.env.example`):

| Biến | Ý nghĩa |
|---|---|
| `VITE_SITE_URL` | Domain chính thức (canonical, Open Graph, sitemap). Mặc định `https://www.hoaphuco.com.vn` |
| `VITE_FORM_API_URL` | URL backend nhận form. Khi chưa đặt, form báo rõ là chưa kết nối – không giả vờ gửi thành công |

## Công nghệ
React 19, Vite, React Router, Tailwind CSS v4, Three.js + React Three Fiber, GSAP ScrollTrigger + Lenis, Framer Motion (LazyMotion), react-i18next, React Hook Form + Zod, Lucide.

## Cấu trúc
```
data/                      Dữ liệu nguồn: catalog.source.json, imageMeta.source.json
scripts/
  split-catalog.mjs        Tách dữ liệu sản phẩm (chạy tự động khi dev/build)
  generate-sitemap.mjs     Sinh sitemap.xml + robots.txt
public/
  images/catalog/          Ảnh sản phẩm (WebP, giữ nguyên kích thước gốc)
  data/products/<slug>.json  Mô tả, thông số, video từng sản phẩm (tải khi mở trang chi tiết)
src/
  components/ common · layout · products · sections · forms · news · three
  pages/ layouts/ routes/ hooks/ services/ utils/ constants/ i18n/ locales/
  data/                    categories, company, solutions, projects, news, faq + file *.generated.js
```

## Dữ liệu sản phẩm
`data/catalog.source.json` là nguồn duy nhất. Khi build, `scripts/split-catalog.mjs` tách thành:
- `src/data/catalog.meta.generated.js` – số lượng theo danh mục + sản phẩm nổi bật (vài KB, dùng ở header/trang chủ)
- `src/data/catalog.list.generated.js` – danh sách rút gọn (chỉ nạp ở trang sản phẩm)
- `public/data/products/<slug>.json` – chi tiết từng máy (chỉ tải khi mở trang chi tiết)
- `src/data/imageMeta.generated.js` – kích thước gốc ảnh trang trí

Không sửa tay các file `*.generated.js`.

## Hiệu suất
- JavaScript ban đầu cho mọi trang ≈ **150 KB gzip**; route, dữ liệu sản phẩm, GSAP/Lenis, framer-motion features, three.js đều tải theo nhu cầu.
- three.js chỉ tải ở trang chủ, sau khi trình duyệt rảnh; dừng render khi hero ra khỏi màn hình; chất lượng thấp hơn trên máy yếu/mobile.
- Ảnh: WebP, lazy-load, có kích thước để tránh layout shift, **không bao giờ hiển thị lớn hơn kích thước gốc** (tránh mờ).
- Cấu hình cache & SPA fallback: `vercel.json` (Vercel), `public/_redirects` + `public/_headers` (Netlify / Cloudflare Pages).

## Cần doanh nghiệp xác nhận
- Link Zalo (`zalo.me/0913813412`) và Messenger (`m.me/hoaphuco`) – suy ra từ hotline / trang Facebook.
- Tình trạng "Mới" của máy Kuboke và máy nhập khẩu được suy ra từ cách phân nhóm của website gốc.
- Tên sản phẩm ở bản tiếng Anh giữ nguyên tiếng Việt theo website gốc.
- Form liên hệ / báo giá cần backend (`VITE_FORM_API_URL`).
