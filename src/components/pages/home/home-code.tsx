'use client'

import { PartTitle, PartTitleAction } from '@/components/project/part-title/part-title'
import { ProjectCard } from '@/components/project/project-card'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Container } from '@/components/project/container'
import CodeBannerA from '@/assets/images/code-banner/white.jpg'
import CodeBannerB from '@/assets/images/code-banner/blue.jpg'
import CodeBannerC from '@/assets/images/code-banner/pink.png'
import CodeBannerD from '@/assets/images/code-banner/black.jpg'
import { cn } from '@/lib/utils.ts'

const list = [
  {
    name: 'react-calendar',
    date: '2024/08/14',
    tip: '组件/日历',
    banner: CodeBannerA,
    git: 'https://gitee.com/yin-chunyang/react-calendar',
    preview: 'https://juejin.cn/post/7403426280940912640',
  },
  {
    name: 'online-editing-echarts',
    date: '2024/02/05',
    tip: '组件/echarts编辑器',
    banner: CodeBannerB,
    git: 'https://gitee.com/yin-chunyang/online-editing-echarts',
    preview: 'https://juejin.cn/post/7447407817684647951',
  },
  {
    name: 'mars3d-marker',
    date: '2025/05/02',
    tip: '功能/地图标注、图片标注',
    banner: CodeBannerC,
    git: 'https://gitee.com/yin-chunyang/mars3d-marker',
    preview: '',
  },
  {
    name: 'antvx6条形码信息',
    date: '2024/09/02',
    tip: '功能/组件调整、生成png',
    banner: CodeBannerD,
    git: 'https://gitee.com/yin-chunyang/vue3-antvx6-null-edge-designer',
    preview: 'https://juejin.cn/post/7418123700166361123',
  },
]
export const HomeCode = () => {
  const tabs = [
    { label: '全部', value: 'all' },
    { label: 'Vue', value: 'vue' },
    { label: 'React', value: 'react' },
    { label: 'Echarts', value: 'echarts' },
    { label: 'JavaScript', value: 'js' },
  ]
  return <Container className={'overflow-x-hidden'}>
    <PartTitle data-tip={'tip:滑动选项、卡片查看更多'} title={'一些"小挂件"'}
               description={'重复造的轮子罢了，知其然不知其所以然...'} action={
      <div className={'max-w-[100%] lg:max-w-[340px] overflow-x-hidden'}>
        <PartTitleAction tabs={tabs}></PartTitleAction>
      </div>
    }></PartTitle>
    <div className={'mt-[2px]] xl:mt-[14px] px-[6px] mx-[-16px]'}>
      <Swiper
        style={{ padding: '0 10px' }}
        slidesPerView={'auto'}
        spaceBetween={32}
        pagination={{
          clickable: true,
        }}
      >
        {
          list.map((item, index) => {
            return <SwiperSlide key={item.banner + index}
                                className={cn('w-[100%]! md:!w-[calc(50%-16px)] xl:!w-[calc(33.33%-21.33px)] py-[10px]')}>
              <ProjectCard project={item.name} date={item.date} tip={item.tip}
                           banner={item.banner} code={item.git} url={item.preview}></ProjectCard>
            </SwiperSlide>
          })
        }
      </Swiper>
    </div>
  </Container>
}