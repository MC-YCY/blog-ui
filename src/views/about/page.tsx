'use client'
import { Container } from '@/components/project/container'
import { AboutUser } from '@/components/pages/about/about-user.tsx'
import { AboutCards } from '@/components/pages/about/about-cards.tsx'


const AboutPage = () => {
  return <div className={'pt-[64px]'}>
    <Container className={'max-w-[1400px]'}>
      <AboutUser></AboutUser>
      <AboutCards></AboutCards>
    </Container>
  </div>
}

export default AboutPage