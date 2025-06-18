'use client'

import { cn } from '@/lib/utils.ts'
import MbtiBanner from '@/assets/images/me/architect-desktop2.svg'
import MeBanner from '@/assets/images/me/me1.jpg'
import UserImg from '@/assets/images/me/user.jpg'

const cardStyleClassName = 'border-[#e3e8f7] dark:border-[#3d3d3f] border-solid border shadow-[0_0_10px_rgba(0,0,0,0.05)] dark:shadow-[0_0_8px_00000050] rounded-2xl'
export const AboutPersonality = () => {
  return <div className={'block md:flex gap-[26px] mt-[26px]'}>
    <div className={cn('w-full md:w-[60%] bg-[rgba(224,214,228,0.1)]', cardStyleClassName)}>
      <div className={cn('relative h-[180px]')}>
        <div
          className={'pl-[20px] w-full rounded-2xl md:pl-[40px] py-[20px] flex flex-col bg-[linear-gradient(90deg,rgba(255,255,255,0.5),rgba(0,0,0,0))] dark:bg-[linear-gradient(90deg,rgba(0,0,0,0.5),rgba(0,0,0,0))] h-full absolute left-0 top-0 z-[2]'}>
          <div className={'text-[14px] text-[#888] cursor-default h-[21]'}>性格</div>
          <div className={'text-[24px] text-foreground font-bold cursor-default h-[36px]'}>架构师</div>
          <div className={'text-[24px] text-[#88619a] font-bold cursor-default h-[36px]'}>INTJ-T</div>
          <div className={'mt-auto'}>
            <a className={'text-foreground opacity-75 text-[12px]'}
               href="https://mbti1.jxyans.cn/?bd_vid=8360626127902673809#/home" target={'_blank'}>了解,测试一下</a>
          </div>
        </div>
        <div className={'h-full absolute bottom-0 right-0 z-[1] overflow-hidden'}>
          <img className={'h-full'} src={MbtiBanner} alt="" />
        </div>
      </div>
    </div>
    <div className={'flex-1 mt-[26px] md:mt-0 h-[180px] relative'}>
      <img src={MeBanner} className={cn(cardStyleClassName, 'px-0! py-0! w-full h-full object-cover')} alt="" />
      <div className={'w-[42px] h-[42px] border rounded-[50%] overflow-hidden absolute right-[10px] bottom-[10px]'}>
        <img src={UserImg} className={'w-full h-full object-cover'} alt="" />
      </div>
    </div>
  </div>
}