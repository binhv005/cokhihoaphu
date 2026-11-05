import ProductCard from './ProductCard'

export default function ProductGrid({ products, cols = 'sm:grid-cols-2 xl:grid-cols-3', dark = false }) {
  return (
    <div className={`grid grid-cols-1 gap-x-6 gap-y-12 ${cols}`}>
      {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} dark={dark} />)}
    </div>
  )
}
