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
  return <div className={'pt-[64px]'}>
    <Container className={'max-w-[1400px]'}>
      <AboutUser></AboutUser>
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