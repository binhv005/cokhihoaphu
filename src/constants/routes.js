export const ROUTES = {
  home: '/',
  about: '/about',
  products: '/products',
  productsBy: (category, type) => `/products?category=${category}${type ? `&type=${type}` : ''}`,
  product: (slug) => `/products/${slug}`,
  solutions: '/solutions',
  projects: '/projects',
  news: '/news',
  article: (slug) => `/news/${slug}`,
  contact: '/contact',
  quote: (product) => (product ? `/request-quote?product=${encodeURIComponent(product)}` : '/request-quote'),
}

export const NAV_ITEMS = [
  { key: 'home', to: ROUTES.home },
  { key: 'about', to: ROUTES.about },
  { key: 'products', to: ROUTES.products, mega: true },
  { key: 'solutions', to: ROUTES.solutions },
  { key: 'projects', to: ROUTES.projects },
  { key: 'news', to: ROUTES.news },
  { key: 'contact', to: ROUTES.contact },
]
