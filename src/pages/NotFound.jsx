import { useTranslation } from 'react-i18next'
import Container from '../components/common/Container'
import Button from '../components/common/Button'
import Blueprint from '../components/common/Blueprint'
import { useSeo } from '../hooks/useSeo'
import { ROUTES } from '../constants/routes'

export default function NotFound() {
  const { t } = useTranslation()
  useSeo({ title: t('seo.notFound'), description: t('notFound.desc'), noindex: true })
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-ink pb-20 pt-36 text-white">
      <div className="grid-lines absolute inset-0 opacity-60" aria-hidden />
      <Container className="relative grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="font-mono text-[clamp(6rem,18vw,13rem)] font-medium leading-none tracking-tighter text-white/90">404</p>
          <h1 className="h2 mt-6">{t('notFound.title')}</h1>
          <p className="lead mt-4 max-w-md text-white/60">{t('notFound.desc')}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button to={ROUTES.home}>{t('notFound.home')}</Button>
            <Button to={ROUTES.products} variant="ghostDark">{t('notFound.products')}</Button>
          </div>
        </div>
        <div className="hidden aspect-[5/3] lg:col-span-6 lg:block">
          <Blueprint type="gear" label={false} className="!bg-transparent" />
        </div>
      </Container>
    </section>
  )
}
