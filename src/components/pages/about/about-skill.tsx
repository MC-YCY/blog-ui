'use client'
import { cn } from '@/lib/utils.ts'
import style from './style.module.css'
import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { AboutCardSkillColorMap, AboutCardSkillTimeline, skills, skillsTools } from '@/constant/about-const.tsx'
import { installChartResize } from '@/lib/resize-chart.ts'

const cardStyleClassName = 'border-[#e3e8f7] dark:border-[#3d3d3f] border-solid border shadow-[0_0_10px_rgba(0,0,0,0.05)] dark:shadow-[0_0_8px_00000050] rounded-2xl'

export const AboutSkill = () => {
  const chartRef = useRef(null)
  useEffect(() => {
    const options = AboutCardSkillTimeline.map((item) => {
      return {
        series: [
          {
            type: 'bar',
            label: {
              show: true,
              position: 'top',
              fontSize: 10,
              offset: 0,
              distance: 0,
              color: 'rgba(127,156,76,1)',
            },
            barWidth: '25%',
            barMinHeight: 2,
            itemStyle: {
              color: (param: { name: never }) => {
                return AboutCardSkillColorMap[param.name]
              },
            },
            data: item.data,
          },
        ],
      }
    })
    let option: echarts.EChartsOption = {
      baseOption: {
        color: [
          'rgba(127,156,76,1)',
        ],
        tooltip: {
          trigger: 'axis',
          padding: [2, 5],
          backgroundColor: '#effdfc',
          textStyle: {
            color: '#9eb25a',
            fontSize: 12,
          },
          borderColor: '#9eb25a',
          axisPointer: {
            z: 111,
            lineStyle: {
              color: '#9eb25a9a',
            },
          },
          formatter: (param) => {
            if (param instanceof Array) {
              let find = param[0]
              let data = find.data as { tooltip: string }
              return data?.tooltip
            }
            return ''
          },
        },
        timeline: {
          top: 228,
          left: 20,
          right: 20 + 44,
          axisType: 'category',
          autoPlay: true,
          playInterval: 3000,
          data: [
            '2019',
            '2020',
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
            itemSize: 14,
            itemGap: 30,
            showPrevBtn: false,
            showNextBtn: false,
            color: '#9eb25a',
            borderColor: '#9eb25a',
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
            controlStyle: {
              color: '#9eb25a9a',
              borderColor: '#9eb25a9a',
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
          axisLine: {
            lineStyle: {
              width: 0.5,
              color: 'rgba(127,156,76,1)',
            },
          },
          axisTick: {
            show: true,
            length: 3,
            lineStyle: {
              color: 'rgba(127,156,76,1)',
              width: 0.5,
            },
          },
          axisLabel: {
            fontSize: 12,
            color: 'rgba(127,156,76,1)',
          },
        },
        yAxis: {
          type: 'value',
          splitNumber: 5,
          axisLabel: {
            show: false,
          },
          max: 100,
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(127,156,76,.25)',
              width: 0.5,
            },
          },
        },
        grid: {
          top: 14,
          left: 0,
          right: 0,
          bottom: 35,
          containLabel: true,
        },
      },
      options: options as echarts.EChartsOption['options'],
    }
    const el = chartRef.current
    if (!el) return
    requestAnimationFrame(() => {
      const myChart = echarts.init(el)
      myChart.setOption(option)
      installChartResize(el, myChart)
    })
  }, [chartRef])
  return <div className={'mt-[26px] block md:flex gap-[26px]'}>
    <div
      className={cn('flex-[1_1_0%] py-[20px] min-h-[200px] overflow-hidden', cardStyleClassName)}>
      <div className={'px-[20px] md:px-[40px]'}>
        <div className={'text-[14px] text-[#888]'}>技能</div>
        <div className={'text-[24px] text-foreground font-bold'}>开启创造力</div>
      </div>

      <div className={'w-full mt-[10px] relative'}>
        <div
          className={'absolute bg-[linear-gradient(90deg,var(--background),rgba(0,0,0,0))] left-0 top-0 h-full w-[10%] z-10'}></div>
        <div
          className={'absolute bg-[linear-gradient(-90deg,var(--background),rgba(0,0,0,0))] right-0 top-0 h-full w-[10%] z-10'}></div>
        <div className={'w-full overflow-x-hidden'}>
          <div className={cn('inline-flex', style.aniRowLeft)}>
            {skills.map((skill, index) => {
              let ml = index > 0 ? 'ml-[10px]' : ''
              return (
                <div key={'skills-' + index}
                     className={cn(`w-[120px] rounded-3xl h-[120px] flex justify-center items-center`, ml)}
                     style={{ backgroundColor: skill.color }}>
                  {skill.icon}
                </div>
              )
            })}
            {skills.map((skill, index) => {
              return (
                <div key={'skills-s-' + index}
                     className={cn(`w-[120px] rounded-3xl h-[120px] flex justify-center items-center ml-[10px]`)}
                     style={{ backgroundColor: skill.color }}>
                  {skill.icon}
                </div>
              )
            })}
          </div>
        </div>
        <div className={'w-full overflow-x-hidden mt-[10px]'}>
          <div className={cn('inline-flex', style.aniRowLeft)} style={{ animationDelay: '-2s' }}>
            {skillsTools.map((skill, index) => {
              let ml = index > 0 ? 'ml-[10px]' : ''
              return (
                <div key={'skillsTools' + index}
                     className={cn(`w-[120px] rounded-3xl h-[120px] flex justify-center items-center`, ml)}
                     style={{ backgroundColor: skill.color }}>
                  {skill.icon}
                </div>
              )
            })}
            {skillsTools.map((skill, index) => {
              return (
                <div key={'skillsTools-s-' + index}
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
      className={cn('mt-[26px] md:mt-0 flex-[1_1_0%] py-[20px] min-h-[200px] rounded-2xl', cardStyleClassName)}>
      <div className={'px-[20px] md:px-[40px]'}>
        <div className={'text-[14px] text-[#888]'}>技能曲线</div>
        <div className={'text-[24px] text-foreground font-bold'}>无线进步</div>
      </div>
      <div className={'px-0 md:px-[20px] relative'}>
        <div className={'w-full h-[260px]'} ref={chartRef}></div>
        <div
          className={'absolute bg-[linear-gradient(90deg,var(--background),rgba(0,0,0,0))] left-0 top-0 h-full w-[10%] z-10'}></div>
        <div
          className={'absolute bg-[linear-gradient(-90deg,var(--background),rgba(0,0,0,0))] right-0 top-0 h-full w-[10%] z-10'}></div>
      </div>
    </div>
  </div>
}