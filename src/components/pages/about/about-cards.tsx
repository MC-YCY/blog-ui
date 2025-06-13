import { cn } from '@/lib/utils.ts'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import style from './style.module.css'
import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { skills } from '@/components/pages/about/const.tsx'

const bgClassName = `bg-[linear-gradient(121deg,rgba(196,255,255,0.15)_0%,rgba(190,83,69,0.2)_100%)] bg-background`
const bgrClassName = `bg-[linear-gradient(121deg,rgba(239,184,174,0.15)_0%,rgba(127,156,76,0.15)_100%)] bg-background`
const cardStyleClassName = 'border-[#e3e8f7] dark:border-[#3d3d3f] border-solid border shadow-[0_0_10px_rgba(0,0,0,0.05)] dark:shadow-[0_0_8px_00000050]'
const AboutCardIntroduce = () => {
  return <div className={'block md:flex gap-[26px]'}>
    <div
      className={cn('flex-[4_1_0%] min-h-[200px] rounded-2xl py-[20px] px-[40px] flex flex-col justify-center', bgClassName, cardStyleClassName)}>
      <div className={'text-[14px] text-foreground'}>你好,很高兴认识你👏</div>
      <div className={'text-[32px] text-foreground my-[10px] font-bold'}>我是 春秋半夏</div>
      <div className={'text-[14px] text-foreground'}>是一名 前端开发者、地球online玩家</div>
    </div>
    <div
      className={cn('mt-[26px] md:mt-0 flex-[3_1_0%] bg-background border rounded-2xl py-[20px] px-[40px] flex flex-col justify-center', bgrClassName, cardStyleClassName)}>
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

const AboutCardSkill = () => {
  const chartRef = useRef(null)
  useEffect(() => {
    let option: echarts.EChartsOption = {
      baseOption: {
        timeline: {
          axisType: 'category',
          autoPlay: true,
          playInterval: 1000,
          data: [
            '2021',
            '2022',
            '2023',
            '2024',
            '2025',
          ],
          label: {
            formatter: function(s): string {
              return new Date(s).getFullYear() + ''
            },
          },
        },
        xAxis: {
          type: 'category',
          data: [
            'Vue',
            'React',
            'Angular',
            'NextJs',
            'NestJs',
            'HTML',
            'CSS',
            'JS',
          ],
        },
        yAxis: {
          type: 'value',
        },
        grid: {
          top: 10,
          left: 15,
          right: 15,
          bottom: 10,
          containLabel: true,
        },
      },
      options: [
        {
          series: [
            {
              type: 'bar',
              data: [10, 10, 20, 30, 40, 50, 60, 40],
            },
          ],
        },
        {
          series: [
            {
              type: 'bar',
              data: [10, 10, 20, 30, 40, 50, 60, 40],
            },
          ],
        },
        {
          series: [
            {
              type: 'bar',
              data: [10, 10, 20, 30, 40, 50, 60, 40],
            },
          ],
        },
        {
          series: [
            {
              type: 'bar',
              data: [10, 10, 20, 30, 40, 50, 60, 40],
            },
          ],
        },
        {
          series: [
            {
              type: 'bar',
              data: [10, 10, 20, 30, 40, 50, 60, 40],
            },
          ],
        },
      ],
    }
    const el = chartRef.current
    if (!el) return
    const myChart = echarts.init(el)
    myChart.setOption(option)
  }, [chartRef])
  return <div className={'mt-[26px] block md:flex gap-[26px]'}>
    <div
      className={cn('flex-[1_1_0%] py-[20px] min-h-[200px] rounded-2xl overflow-hidden', cardStyleClassName)}>
      <div className={'px-[40px]'}>
        <div className={'text-[14px] text-[#888]'}>技能</div>
        <div className={'text-[24px] text-foreground font-bold'}>开启创造力</div>
      </div>

      <div className={'w-full mt-[10px] relative'}>
        <div
          className={'absolute bg-[linear-gradient(90deg,var(--background),rgba(0,0,0,0))] left-0 top-0 h-full w-[5%] z-10'}></div>
        <div
          className={'absolute bg-[linear-gradient(-90deg,var(--background),rgba(0,0,0,0))] right-0 top-0 h-full w-[5%] z-10'}></div>
        <div className={'w-full overflow-x-hidden'}>
          <div className={cn('inline-flex', style.aniRowLeft)}>
            {skills.map((skill, index) => {
              let ml = index > 0 ? 'ml-[10px]' : ''
              return (
                <div key={index} className={cn(`w-[120px] rounded-3xl h-[120px] flex justify-center items-center`, ml)}
                     style={{ backgroundColor: skill.color }}>
                  {skill.icon}
                </div>
              )
            })}
            {skills.map((skill, index) => {
              return (
                <div key={index}
                     className={cn(`w-[120px] rounded-3xl h-[120px] flex justify-center items-center ml-[10px]`)}
                     style={{ backgroundColor: skill.color }}>
                  {skill.icon}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
    <div
      className={cn('mt-[26px] md:mt-0 flex-[1_1_0%] py-[20px]  min-h-[200px] rounded-2xl', cardStyleClassName)}>
      <div className={'px-[40px]'}>
        <div className={'text-[14px] text-[#888]'}>生涯</div>
        <div className={'text-[24px] text-foreground font-bold'}>无线进步</div>
      </div>
      <div className={'mt-[10px]'}>
        <div className={'w-full h-[120px]'} ref={chartRef}></div>
      </div>
    </div>
  </div>
}
export const AboutCards = () => {
  return <>
    <div className={'text-[28px] text-center mt-[20px] mb-[40px] font-bold'}>关于本站</div>
    <AboutCardIntroduce></AboutCardIntroduce>
    <AboutCardSkill></AboutCardSkill>
  </>
}