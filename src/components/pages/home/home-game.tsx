'use client'

import { PartTitle } from '@/components/project/part-title/part-title'
import { Container } from '@/components/project/container'
import Gomoku from '@/components/project/games/Gomoku.tsx'
import Chess from '@/components/project/games/Chess.tsx'

export const HomeGame = () => {
  return <Container isTransition={false} className={'overflow-x-hidden overflow-y-visible'}>
    <PartTitle title={'五子棋'}></PartTitle>
    <div className={'mt-[2px]] xl:mt-[14px]'}>
      <Gomoku></Gomoku>
      <Chess></Chess>
    </div>
  </Container>
}