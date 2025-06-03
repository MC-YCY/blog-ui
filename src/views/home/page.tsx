'use client'

import { HomeData } from '@/components/pages/home/home-data'
import { HomeCode } from '@/components/pages/home/home-code'
import { HomeHero } from '@/components/pages/home/home-hero'
import { HomeDiary } from '@/components/pages/home/home-diary'
import { HomeArticle } from '@/components/pages/home/home-article'
import { HomePicture } from '@/components/pages/home/home-picture'
import { HomeMessageBoard } from '@/components/pages/home/home-message-board'
import { HomePanel } from '@/components/pages/home/home-panel.tsx'
import { LazyContent } from '@/components/inview-lazy-content.tsx'

export default function Home() {
  return <div>
    <LazyContent>
      <HomeHero></HomeHero>
    </LazyContent>
    <LazyContent>
      <HomeData></HomeData>
    </LazyContent>
    <LazyContent>
      <HomeDiary></HomeDiary>
    </LazyContent>
    <LazyContent>
      <HomeCode></HomeCode>
    </LazyContent>
    <LazyContent>
      <HomeArticle></HomeArticle>
    </LazyContent>
    <LazyContent>
      <HomePicture></HomePicture>
    </LazyContent>
    <LazyContent>
      <HomeMessageBoard></HomeMessageBoard>
    </LazyContent>
    <LazyContent>
      <HomePanel></HomePanel>
    </LazyContent>
  </div>
}
