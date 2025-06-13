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
    const data = [
      {
        year: 2021,
        data: [20, 20, 30, 30, 30, 30, 20, 30],
      },
      {
        year: 2022,
        data: [30, 30, 30, 30, 30, 30, 20, 30],
      },
      {
        year: 2023,
        data: [50, 20, 30, 30, 50, 30, 20, 70],
      },
      {
        year: 2024,
        data: [50, 20, 30, 30, 50, 30, 60, 70],
      },
      {
        year: 2025,
        data: [50, 50, 50, 30, 50, 30, 60, 70],
      },
    ]
    const options = data.map((item) => {
      return {
        series: [
          {
            type: 'line',
            symbolSize:2,
            smooth: true,
            lineStyle:{
              width:1,
            },
            label:{
              show:true,
              fontSize:10,
              offset:0,
              distance:2,
              color:'rgba(127,156,76,1)'
            },
            areaStyle:{
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(127,156,76,.5)',
                }, {
                  offset: 1, color: 'rgba(196,255,255,.5)',
                }],
                global: false,
              },
            },
            data: item.data as number[],
          },
        ],
      }
    })
    let option: echarts.EChartsOption = {
      baseOption: {
        color: [
          'rgba(127,156,76,1)',
        ],
        timeline: {
          bottom: -12,
          axisType: 'category',
          autoPlay: true,
          playInterval: 3000,
          data: [
            '2021',
            '2022',
            '2023',
            '2024',
            '2025',
          ],
          symbol: 'circle',
          label: {
            position: 10,
            interval: 0,
            formatter: function(s): string {
              return new Date(s).getFullYear() + ''
            },
            color: '#9eb25a9a',
          },
          lineStyle: {
            color: '#9eb25a9a',
            width: 0.6,
          },
          itemStyle: {
            color: '#9eb25a9a',
          },
          checkpointStyle: {
            symbolSize: 10,
            color: '#9eb25a',
            borderColor: '#fffedf',
          },
          controlStyle: {
            show: false,
          },
          progress: {
            lineStyle: {
              color: '#9eb25a',
            },
            itemStyle: {
              color: '#9eb25a',
            },
            label: {
              color: '#7c984b',
            },
          },
          symbolSize: 8,
          emphasis: {
            itemStyle: {
              color: '#79673a',
            },
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
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
          axisLine: {
            lineStyle: {
              width:0.5,
              color: 'rgba(127,156,76,1)'
            }
          },
          axisTick: {
            show: true,
            length:3,
            lineStyle:{
              color:'rgba(127,156,76,1)',
              width:0.5,
            }
          },
          axisLabel: {
            fontSize: 12,
            color:'rgba(127,156,76,1)'
          },
        },
        yAxis: {
          type: 'value',
          splitNumber: 2,
          axisLabel:{
            show:false
          },
          splitLine:{
            show:true,
            lineStyle:{
              color:'#4d776d1a',
              width:0.5
            }
          }
        },
        grid: {
          top: 10,
          left: 40,
          right: 40,
          bottom: 44,
          containLabel: true,
        },
      },
      options: options as echarts.EChartsOption['options'],
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
      className={cn('mt-[26px] md:mt-0 flex-[1_1_0%] pt-[20px]  min-h-[200px] rounded-2xl', cardStyleClassName)}>
      <div className={'px-[40px]'}>
        <div className={'text-[14px] text-[#888]'}>生涯</div>
        <div className={'text-[24px] text-foreground font-bold'}>无线进步</div>
      </div>
      <div className={'w-full h-[150px]'} ref={chartRef}></div>
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