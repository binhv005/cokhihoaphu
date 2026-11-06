// Tách danh mục sản phẩm để giảm dung lượng JavaScript:
//  - src/data/catalog.list.generated.js  : dữ liệu rút gọn cho danh sách / thẻ sản phẩm (nạp ở trang Sản phẩm)
//  - src/data/catalog.meta.generated.js  : số lượng theo danh mục + sản phẩm nổi bật (nạp ở header / trang chủ)
//  - public/data/products/<slug>.json     : mô tả, bảng thông số, video, kích thước ảnh – chỉ tải khi mở trang chi tiết
//  - src/data/imageMeta.generated.js      : kích thước gốc của ảnh trang trí
// Nguồn: data/catalog.source.json (sinh từ dữ liệu hoaphuco.com.vn). Chạy tự động trước khi build.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const catalog = JSON.parse(readFileSync(resolve(root, 'data/catalog.source.json'), 'utf8'))
const sizes = JSON.parse(readFileSync(resolve(root, 'data/imageMeta.source.json'), 'utf8'))

export const FEATURED = [
  'may-ghep-ngang-cao-quay', 'may-ghep-doc-tu-dong', 'may-phay-mong-finger-tu-dong', 'may-say-tia-cuc-tim',
  'may-cha-nham-thung-yolets', 'may-bao-4-mat-ga-gaujing', 'may-cnc-6-dau-japan-om', 'bang-tai-belt-pvc-tu-dong',
  'bang-tai-con-lan', 'may-ep-nong-4-khe-orma-italia', 'che-tao-bo-nguon-thuy-luc', 'may-nen-khi-truc-vis-may-say-khi-75-kw',
]

const card = (p) => ({
  id: p.id, slug: p.slug, name: p.name, code: p.code, categoryId: p.categoryId, subcategoryId: p.subcategoryId,
  line: p.line, condition: p.condition, image: p.images[0] ?? null, size: sizes[p.images[0]] ?? null,
})

const hdr = '// TỰ ĐỘNG SINH bởi scripts/split-catalog.mjs – không sửa tay.\n'
writeFileSync(resolve(root, 'src/data/catalog.list.generated.js'), `${hdr}export const catalogList = ${JSON.stringify(catalog.map(card))}\n`)

const count = (key) => catalog.reduce((m, p) => ((m[p[key]] = (m[p[key]] || 0) + 1), m), {})
const meta = {
  total: catalog.length,
  byCategory: count('categoryId'),
  bySub: count('subcategoryId'),
  byLine: count('line'),
  featured: FEATURED.map((s) => catalog.find((p) => p.slug === s)).filter((p) => p && p.images.length).map(card),
}
writeFileSync(resolve(root, 'src/data/catalog.meta.generated.js'), `${hdr}export const catalogMeta = ${JSON.stringify(meta)}\n`)

const dir = resolve(root, 'public/data/products')
rmSync(dir, { recursive: true, force: true })
mkdirSync(dir, { recursive: true })
for (const p of catalog) {
  const { images, short, paragraphs, specTables, video, source } = p
  const imageSizes = Object.fromEntries(images.map((i) => [i, sizes[i]]).filter(([, v]) => v))
  writeFileSync(resolve(dir, `${p.slug}.json`), JSON.stringify({ images, imageSizes, short, paragraphs, specTables, video, source }))
}

// Kích thước ảnh trang trí (không thuộc danh mục) – nạp cùng bundle chính, rất nhỏ
// + ảnh danh mục được tham chiếu cố định trong mã nguồn (categories, solutions, projects, news…)
const srcText = ['categories.js', 'solutions.js', 'projects.js', 'news.js'].map((f) => readFileSync(resolve(root, 'src/data', f), 'utf8')).join(' ')
const referenced = new Set(srcText.match(/\/images\/catalog\/[\w.-]+/g) ?? [])
const site = Object.fromEntries(Object.entries(sizes).filter(([k]) => !k.startsWith('/images/catalog/') || referenced.has(k)))
writeFileSync(resolve(root, 'src/data/imageMeta.generated.js'), `${hdr}export const imageMeta = ${JSON.stringify(site)}\n`)
console.log(`catalog: ${catalog.length} products, featured ${meta.featured.length}`)
