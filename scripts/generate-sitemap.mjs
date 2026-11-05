// Sinh public/sitemap.xml & robots.txt từ dữ liệu sản phẩm / bài viết.
// Chạy tự động trước khi build (npm run build). Domain lấy từ VITE_SITE_URL.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { news } from '../src/data/news.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const catalog = JSON.parse(readFileSync(resolve(root, 'data/catalog.source.json'), 'utf8'))
const SITE = (process.env.VITE_SITE_URL || 'https://www.hoaphuco.com.vn').replace(/\/$/, '')
const today = new Date().toISOString().slice(0, 10)

const urls = [
  ['/', '1.0'], ['/about', '0.7'], ['/products', '0.9'], ['/solutions', '0.8'], ['/projects', '0.6'],
  ['/news', '0.7'], ['/contact', '0.8'], ['/request-quote', '0.9'],
  ...catalog.map((p) => [`/products/${p.slug}`, '0.8']),
  ...news.map((n) => [`/news/${n.slug}`, '0.5']),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([u, p]) => `  <url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod><priority>${p}</priority></url>`).join('\n')}
</urlset>
`
writeFileSync(resolve(root, 'public/sitemap.xml'), xml)
writeFileSync(resolve(root, 'public/robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`)
console.log(`sitemap: ${urls.length} urls`)
