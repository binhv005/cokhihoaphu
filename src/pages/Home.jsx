import { useTranslation } from 'react-i18next'
import HeroSection from '../components/sections/HeroSection'
import AboutIntroSection from '../components/sections/AboutIntroSection'
import CategoryMarquee from '../components/sections/CategoryMarquee'
import FeaturedProducts from '../components/sections/FeaturedProducts'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import SolutionsSection from '../components/sections/SolutionsSection'
import ApplicationsSection from '../components/sections/ApplicationsSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import FaqSection from '../components/sections/FaqSection'
import { organizationLd, useSeo } from '../hooks/useSeo'

export default function Home() {
  const { t } = useTranslation()
  useSeo({ title: t('seo.home'), description: t('seo.homeDesc'), jsonLd: organizationLd() })
  return (
    <>
      <HeroSection />
      <AboutIntroSection />
      <CategoryMarquee />
      <FeaturedProducts />
      <WhyChooseUs />
      <SolutionsSection />
      <ApplicationsSection />
      <ProjectsSection />
      <CategoryMarquee reverse />
      <FaqSection />
    </>
  )
}
