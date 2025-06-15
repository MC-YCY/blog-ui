'use client'
import { cn } from '@/lib/utils.ts'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

const bgClassName = `bg-[linear-gradient(121deg,rgba(196,255,255,0.15)_0%,rgba(190,83,69,0.2)_100%)] bg-background`
const bgrClassName = `bg-[linear-gradient(121deg,rgba(239,184,174,0.15)_0%,rgba(127,156,76,0.15)_100%)] bg-background`
const cardStyleClassName = 'border-[#e3e8f7] dark:border-[#3d3d3f] border-solid border shadow-[0_0_10px_rgba(0,0,0,0.05)] dark:shadow-[0_0_8px_00000050]'
export const AboutIntroduce = () => {
  return <div className={'block md:flex gap-[26px]'}>
    <div
      className={cn('flex-[4_1_0%] rounded-2xl py-[20px] px-[20px] md:px-[40px] flex flex-col justify-center', bgClassName, cardStyleClassName)}>
      <div className={'text-[14px] text-foreground'}>你好,很高兴认识你👏</div>
      <div className={'text-[32px] text-foreground my-[10px] font-bold'}>我是 春秋半夏</div>
      <div className={'text-[14px] text-foreground'}>是一名 前端开发者、地球online玩家</div>
    </div>
    <div
      className={cn('mt-[26px] md:mt-0 flex-[3_1_0%] bg-background border rounded-2xl py-[20px] px-[20px] md:px-[40px] flex flex-col justify-center', bgrClassName, cardStyleClassName)}>
      <div className={'text-[14px] text-[#888]'}>深度</div>
      <div className={'text-[24px] text-foreground font-bold'}>在于</div>
      <div className={'text-[24px] text-foreground font-bold'}>知其然
        <del className={'opacity-60'}>而不</del>
        知其所以然
      </div>
      <div className={'h-[30px] mt-[10px]'}>
        <Swiper
          direction={'vertical'}
          modules={[Autoplay]}
          loop={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          className={'h-full!'}
        >
          <SwiperSlide
            className="h-[30px] flex items-center text-[18px] font-bold cursor-pointer text-[#42b883]">Vue</SwiperSlide>
          <SwiperSlide
            className="h-[30px] flex items-center text-[18px] font-bold cursor-pointer text-[#61dafb]">React</SwiperSlide>
          <SwiperSlide
            className="h-[30px] flex items-center text-[18px] font-bold cursor-pointer text-[#dd0031]">Angular</SwiperSlide>
          <SwiperSlide
            className="h-[30px] flex items-center text-[18px] font-bold cursor-pointer text-[#000000] dark:text-white">Next.js</SwiperSlide>
          <SwiperSlide
            className="h-[30px] flex items-center text-[18px] font-bold cursor-pointer text-[#e0234e]">Nest.js</SwiperSlide>
          <SwiperSlide
            className="h-[30px] flex items-center text-[18px] font-bold cursor-pointer text-[#38bdf8]">Tailwind</SwiperSlide>
          <SwiperSlide
            className="h-[30px] flex items-center text-[18px] font-bold cursor-pointer text-[#646cff]">Vite</SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
}
