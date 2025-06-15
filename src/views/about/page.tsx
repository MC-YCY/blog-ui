'use client'
import { Container } from '@/components/project/container'
import { AboutUser } from '@/components/pages/about/about-user.tsx'
import { AboutSkill } from '@/components/pages/about/about-skill.tsx'
import { AboutIntroduce } from '@/components/pages/about/about-introduce.tsx'

const AboutPage = () => {
  return <div className={'pt-[64px]'}>
    <Container className={'max-w-[1400px]'}>
      <AboutUser></AboutUser>
      <div className={'text-[28px] text-center mt-[20px] mb-[40px] font-bold'}>关于本站</div>
      <AboutIntroduce></AboutIntroduce>
      <AboutSkill></AboutSkill>
    </Container>
  </div>
}

export default AboutPage