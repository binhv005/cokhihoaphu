import { useTranslation } from 'react-i18next'
import HeroSection from '../components/sections/HeroSection'
import AboutIntroSection from '../components/sections/AboutIntroSection'
import CategorySection from '../components/sections/CategorySection'
import FeaturedProducts from '../components/sections/FeaturedProducts'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import SolutionsSection from '../components/sections/SolutionsSection'
import ApplicationsSection from '../components/sections/ApplicationsSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import NewsSection from '../components/sections/NewsSection'
import FaqSection from '../components/sections/FaqSection'
import CtaBand from '../components/common/CtaBand'
import { organizationLd, useSeo } from '../hooks/useSeo'

export default function Home() {
  const { t } = useTranslation()
  useSeo({ title: t('seo.home'), description: t('seo.homeDesc'), jsonLd: organizationLd() })
  return (
    <>
      <HeroSection />
      <AboutIntroSection />
      <CategorySection />
      <FeaturedProducts />
      <WhyChooseUs />
      <SolutionsSection />
      <ApplicationsSection />
      <ProjectsSection />
      <NewsSection />
      <FaqSection />
      <CtaBand />
    </>
  )
}
