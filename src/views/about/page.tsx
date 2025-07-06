'use client'
import { Container } from '@/components/project/container'
import { AboutUser } from '@/components/pages/about/about-user.tsx'
import { AboutSkill } from '@/components/pages/about/about-skill.tsx'
import { AboutIntroduce } from '@/components/pages/about/about-introduce.tsx'
import { AboutPersonality } from '@/components/pages/about/about-personality.tsx'
import { AboutGames } from '@/components/pages/about/about-games.tsx'
import { AboutMessage } from '@/components/pages/about/about-message.tsx'
import {AboutComment} from '@/components/pages/about/about-comment/about-comment.tsx'

const AboutPage = () => {
  return <div>
    <div className={'xl:pt-[128px] pt-[88px] bg-[linear-gradient(180deg,rgba(196,255,255,0.3)_0%,rgba(0,0,0,0)_100%)] dark:bg-[linear-gradient(180deg,rgba(196,255,255,0.1)_0%,rgba(0,0,0,0)_100%)] xl:pb-[64px]! pb-[24px]!'}>
      <AboutUser></AboutUser>
    </div>
    <Container className={'pt-0! cursor-default'}>
      <div className={'text-[36px] text-foreground opacity-90 mb-[40px] font-bold text-center cursor-default'}>关于本站</div>
      <AboutIntroduce></AboutIntroduce>
      <AboutSkill></AboutSkill>
      <AboutPersonality></AboutPersonality>
      <AboutGames></AboutGames>
      <AboutMessage></AboutMessage>
      <AboutComment></AboutComment>
    </Container>
  </div>
}

export default AboutPage