'use client'

import { cn } from '@/lib/utils.ts'
import SjzBanner from '@/assets/images/games/sjz.jpg'
import { AnimatedTooltip } from '@/components/ui/animated-tooltip.tsx'
import SjzFy from '@/assets/images/games/sjz_fy.jpg'
import SjzHl from '@/assets/images/games/sjz_hl.jpg'
import SjzWll from '@/assets/images/games/sjz_wll.jpg'
import SjzM7 from '@/assets/images/games/sjz_m7.webp'
import SjzVector from '@/assets/images/games/sjz_vector.webp'
import SjzM870 from '@/assets/images/games/sjz_m870.webp'

import Cod20 from '@/assets/images/games/cod-20.avif'
import Cod19 from '@/assets/images/games/cod-19.jpg'
import Cod6 from '@/assets/images/games/cod_6.jpg'

const people = [
  {
    id: 1,
    name: '蜂医',
    designation: '',
    image: SjzFy,
  },
  {
    id: 2,
    name: '红狼',
    designation: '',
    image: SjzHl,
  },
  {
    id: 3,
    name: '乌鲁鲁',
    designation: '',
    image: SjzWll,
  },
]

const people2 = [
  {
    id: 1,
    name: 'M7战斗步枪',
    designation: '',
    image: SjzM7,
  },
  {
    id: 2,
    name: 'Vector冲锋枪',
    designation: '',
    image: SjzVector,
  },
  {
    id: 3,
    name: 'M870霰弹枪',
    designation: '',
    image: SjzM870,
  },
]

const people3 = [
  {
    id: 1,
    name: '现代战争Ⅲ',
    designation: '',
    image: Cod20,
  },
  {
    id: 2,
    name: '现代战争Ⅱ',
    designation: '',
    image: Cod19,
  },
  {
    id: 3,
    name: '黑色行动Ⅵ',
    designation: '',
    image: Cod6,
  },
]


const cardStyleClassName = 'border-[#e3e8f7] dark:border-[#3d3d3f] border-solid border shadow-[0_0_10px_rgba(0,0,0,0.05)] dark:shadow-[0_0_8px_00000050] rounded-2xl'
export const AboutGames = () => {
  return <div className={'block md:flex gap-[26px] mt-[26px]'}>
    <div className={cn('flex-1 h-[350px] relative', cardStyleClassName)}>
      <img className={'w-full h-full object-cover rounded-2xl'} src={SjzBanner} alt="" />
      <div className={'absolute w-full left-0 top-0 z-2 px-[20px] md:px-[40px] py-[20px] h-full flex flex-col'}>
        <div className={'text-[14px] text-background cursor-default h-[21]'}>爱好游戏</div>
        <div className={'text-[24px] text-background font-bold cursor-default h-[36px]'}>三角洲行动</div>
        <div className={'flex w-full justify-between mt-auto'}>
          <div className={'flex flex-row items-center justify-center'}>
            <AnimatedTooltip items={people} />
          </div>
          <div className={'flex flex-row items-center justify-center'}>
            <AnimatedTooltip items={people2} />
          </div>
        </div>
      </div>
    </div>
    <div className={cn('flex-1 mt-[26px] md:mt-0 h-[350px] relative',cardStyleClassName)}>
      <img className={'w-full h-full object-cover rounded-2xl'} src={Cod20} alt="" />
      <div className={'absolute w-full left-0 top-0 z-2 px-[20px] md:px-[40px] py-[20px] h-full flex flex-col'}>
        <div className={'text-[14px] text-background cursor-default h-[21]'}>爱好游戏</div>
        <div className={'text-[24px] text-background font-bold cursor-default h-[36px]'}>使命召唤</div>
        <div className={'flex w-full justify-between mt-auto'}>
          <div className={'flex flex-row items-center justify-center'}>
            <AnimatedTooltip items={people3} />
          </div>
        </div>
      </div>
    </div>
  </div>
}