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
import { Autoplay, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Coc1 from '@/assets/images/games/coc1.jpg'
import Coc2 from '@/assets/images/games/coc2.jpg'
import Coc3 from '@/assets/images/games/coc3.png'
import Coc4 from '@/assets/images/games/coc4.png'
import Coc5 from '@/assets/images/games/coc5.png'
import Coc6 from '@/assets/images/games/coc6.png'
import Coc7 from '@/assets/images/games/coc7.png'
import SLG1 from '@/assets/images/games/sgz-1.png'
import SLG2 from '@/assets/images/games/sgz-2.png'
import SLG3 from '@/assets/images/games/sgz-3.png'
import SLG4 from '@/assets/images/games/sgz-4.jpg'
import SLG5 from '@/assets/images/games/sgz-5.jpg'
import SLG6 from '@/assets/images/games/sgz-6.jpg'
import SLG7 from '@/assets/images/games/sgz-7.png'

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
const people4 = [
  {
    id: 1,
    name: '许攸',
    designation: '',
    image: SLG1,
  },
  {
    id: 3,
    name: '吕布',
    designation: '',
    image: SLG3,
  },
  {
    id: 2,
    name: '左慈',
    designation: '',
    image: SLG2,
  },
]
const people5 = [
  {
    id: 1,
    name: '飞盾战神',
    designation: '',
    image: Coc3,
  },
  {
    id: 2,
    name: '大守卫者',
    designation: '',
    image: Coc4,
  },
  {
    id: 3,
    name: '亡灵王子',
    designation: '',
    image: Coc5,
  },
  {
    id: 4,
    name: '弓箭女皇',
    designation: '',
    image: Coc6,
  },
  {
    id: 5,
    name: '野蛮人之王',
    designation: '',
    image: Coc7,
  },
]


const cardStyleClassName = 'border-[#e3e8f7] dark:border-[#3d3d3f] border-solid border shadow-[0_0_10px_rgba(0,0,0,0.05)] dark:shadow-[0_0_8px_00000050] rounded-2xl'
export const AboutGames = () => {
  return <>
    <div className={'block md:flex gap-[26px] mt-[26px]'}>
      <div className={cn('flex-1 h-[350px] relative', cardStyleClassName)}>
        <img className={'w-full h-full object-cover rounded-2xl'} src={SjzBanner} alt="" />
        <div
          className={'dark:bg-[rgba(0,0,0,0.5)] absolute w-full left-0 top-0 z-2 px-[20px] md:px-[40px] py-[20px] h-full flex flex-col'}>
          <div className={'text-[14px] text-white cursor-default h-[21]'}>爱好游戏</div>
          <div className={'text-[24px] text-white font-bold cursor-default h-[36px]'}>三角洲行动</div>
          <div className={'flex w-full justify-between mt-auto'}>
            <div className={'flex flex-row items-center justify-center'}>
              <AnimatedTooltip items={people} />
            </div>
            <div className={'flex flex-row items-center justify-center mr-4'}>
              <AnimatedTooltip items={people2} />
            </div>
          </div>
        </div>
      </div>
      <div className={cn('flex-1 mt-[26px] md:mt-0 h-[350px] relative', cardStyleClassName)}>
        <img className={'w-full h-full object-cover rounded-2xl'} src={Cod20} alt="" />
        <div
          className={'dark:bg-[rgba(0,0,0,0.5)] absolute w-full left-0 top-0 z-2 px-[20px] md:px-[40px] py-[20px] h-full flex flex-col'}>
          <div className={'text-[14px] text-white cursor-default h-[21]'}>爱好游戏</div>
          <div className={'text-[24px] text-white font-bold cursor-default h-[36px]'}>使命召唤</div>
          <div className={'flex w-full justify-between mt-auto'}>
            <div className={'flex flex-row items-center justify-center'}>
              <AnimatedTooltip items={people3} />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className={'block md:flex gap-[26px] mt-[26px]'}>
      <div className={cn('flex-1 w-0 h-[350px] relative', cardStyleClassName)}>
        <Swiper
          className={'w-full h-full rounded-2xl'}
          scrollbar={{
            hide: false,
            horizontalClass: 'custom-swiper-scrollbar',
          }}
          autoplay={{
            delay: 6000,
          }}
          modules={[Scrollbar, Autoplay]}>
          <SwiperSlide className={'w-full h-full'}>
            <img className={'w-full h-full object-cover rounded-2xl'} src={Coc1} alt="" />
          </SwiperSlide>
          <SwiperSlide className={'w-full h-full'}>
            <img className={'w-full h-full object-cover rounded-2xl'} src={Coc2} alt="" />
          </SwiperSlide>
        </Swiper>
        <div
          className={'dark:bg-[rgba(0,0,0,0.5)] absolute w-full left-0 top-0 z-2 px-[20px] md:px-[40px] py-[20px] h-full flex flex-col pointer-events-none'}>
          <div className={'text-[14px] text-white cursor-default h-[21]'}>手游</div>
          <div className={'text-[24px] text-white font-bold cursor-default h-[36px]'}>部落冲突</div>
          <div className={'flex w-full justify-between mt-auto'}>
            <div className={'flex flex-row items-center justify-center pointer-events-auto'}>
              <AnimatedTooltip items={people5} />
            </div>
          </div>
        </div>
      </div>
      <div className={cn('flex-1 w-0 mt-[26px] md:mt-0 h-[350px] relative', cardStyleClassName)}>
        <Swiper
          className={'w-full h-full rounded-2xl'}
          scrollbar={{
            hide: false,
            horizontalClass: 'custom-swiper-scrollbar',
          }}
          autoplay={{
            delay: 4000,
          }}
          modules={[Scrollbar, Autoplay]}>
          <SwiperSlide className={'w-full h-full'}>
            <img className={'w-full h-full object-cover rounded-2xl'} src={SLG6} alt="" />
          </SwiperSlide>
          <SwiperSlide className={'w-full h-full'}>
            <img className={'w-full h-full object-cover rounded-2xl'} src={SLG7} alt="" />
          </SwiperSlide>
          <SwiperSlide className={'w-full h-full'}>
            <img className={'w-full h-full object-cover rounded-2xl'} src={SLG4} alt="" />
          </SwiperSlide>
          <SwiperSlide className={'w-full h-full'}>
            <img className={'w-full h-full object-cover rounded-2xl'} src={SLG5} alt="" />
          </SwiperSlide>
        </Swiper>
        <div
          className={'dark:bg-[rgba(0,0,0,0.5)] absolute w-full left-0 top-0 z-2 px-[20px] md:px-[40px] py-[20px] h-full flex flex-col pointer-events-none'}>
          <div className={'text-[14px] text-white cursor-default h-[21]'}>SLG</div>
          <div className={'text-[24px] text-white font-bold cursor-default h-[36px]'}>三国志·战略版</div>
          <div className={'flex w-full justify-between mt-auto'}>
            <div className={'flex flex-row items-center justify-center pointer-events-auto'}>
              <AnimatedTooltip items={people4} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}