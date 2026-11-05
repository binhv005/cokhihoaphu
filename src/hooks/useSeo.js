import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_URL, company } from '../data/company'

const setMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const setLink = (rel, href) => {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * SEO per page: title, description, canonical, Open Graph, JSON-LD.
 * jsonLd: object | object[]
 */
export function useSeo({ title, description, image, type = 'website', jsonLd, noindex = false }) {
  const { pathname } = useLocation()
  const ldString = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    const fullTitle = title ? `${title} | Hoà Phú` : 'Hoà Phú'
    const url = SITE_URL + pathname
    const img = SITE_URL + (image || '/images/products/p00.webp')
    document.title = fullTitle
    if (description) setMeta('name', 'description', description)
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow')
    setLink('canonical', url)
    setMeta('property', 'og:title', fullTitle)
    if (description) setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', img)
    setMeta('property', 'og:site_name', company.brand)
    setMeta('name', 'twitter:card', 'summary_large_image')

    let script = document.getElementById('page-jsonld')
    if (ldString) {
      if (!script) {
        script = document.createElement('script')
        script.type = 'application/ld+json'
        script.id = 'page-jsonld'
        document.head.appendChild(script)
      }
      script.textContent = ldString
    } else if (script) script.remove()
  }, [title, description, image, type, ldString, noindex, pathname])
}

export const organizationLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: company.name,
  url: SITE_URL,
  logo: SITE_URL + company.logo,
  telephone: '+84913813412',
  address: { '@type': 'PostalAddress', streetAddress: '49/6 Đường số 14, Khu phố 3', addressLocality: 'Thành phố Thủ Đức', addressRegion: 'TP. Hồ Chí Minh', addressCountry: 'VN' },
  sameAs: [company.facebook],
})

export const breadcrumbLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.label, item: SITE_URL + it.to })),
})
