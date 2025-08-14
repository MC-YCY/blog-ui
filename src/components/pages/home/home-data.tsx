'use client'
import { PartTitle } from '@/components/project/part-title/part-title'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Scrollbar } from 'swiper/modules'
import { Container } from '@/components/project/container'
import { cn } from '@/lib/utils'
import IsqqwBanner from '@/assets/images/data-slide/webp/isqqw-banner.webp'
import SaBlogBanner from '@/assets/images/data-slide/webp/sa-blog-banner.webp'
import { useVisitStore } from '@/stores/visitStore.ts'
import { useEffect } from 'react'

const list = [
  {
    title: 'ISQQW',
    tip: 'Echarts示例最佳网站、这里有你想象不到的效果图',
    describe: 'ECharts是一款强大的数据可视化工具，提供丰富的图表类型和交互体验。我们的社区是ECharts用户交流、学习和分享的平台，您可以在这里：无论您是初学者还是专业人士，这里都是您学习和成长的最佳选择！欢迎加入，共同推动数据可视化的发展。',
    banner: IsqqwBanner,
    buttons: [
      {
        text: '官方网址',
        href: 'https://www.isqqw.com/',
        opacity: 'opacity-100',
      },
    ],
  },
  {
    title: 'SA-BLOG',
    tip: 'React、NestJs打造',
    describe: `用来尝试NestJs框架搭建的博客，前端用来尝试一种只提供逻辑的ui组件库，使用到了React、Tailwindcss、Radix UI、Aceternity UI、Vite、TypeScript、Socket.Io`,
    banner: SaBlogBanner,
    buttons: [
      {
        text: '预览',
        href: 'https://www.sa-blog.online/home',
        opacity: 'opacity-100',
      },
      {
        text: 'BLOG-Ui',
        href: 'https://gitee.com/yin-chunyang/blog-ui',
        opacity: 'opacity-60',
      },
      {
        text: 'BLOG-Service',
        href: 'https://gitee.com/yin-chunyang/blog-service',
        opacity: 'opacity-60',
      },
    ],
  },
]
const HomeDataSwiper = () => {
  return <div
    className={'w-full h-full'}>
    <Swiper
      className={'w-full h-full'}
      scrollbar={{
        hide: false,
        horizontalClass: 'custom-swiper-scrollbar',
      }}
      autoplay={{
        delay: 6000,
      }}
      modules={[Scrollbar, Autoplay]}>
      {
        list.map((item, index) => {
          return <SwiperSlide key={item.banner + index}>
            <div className={'w-full h-full relative'}>
              <div
                className={'h-full w-full absolute left-0 top-0 z-[2] bg-[linear-gradient(90deg,var(--background),rgba(255,255,255,0))]'}>
                <div className={'w-[100%] flex flex-col md:p-[40px] p-[20px] h-full xl:w-[470px]'}>
                  <div className={'text-[32px] line-[1.34]'}>{item.title}</div>
                  <div className={'text-[16px] line-[1.5] pt-[16px]'}>
                    {item.tip}
                  </div>
                  <div className={'pt-[16px] text-[16px] text-foreground opacity-60 line-clamp-3'}>
                    {item.describe}
                  </div>
                  <div className={'flex mt-auto gap-4'}>
                    {
                      item.buttons.map((btn) => {
                        return <a key={btn.href} target={'_blank'} href={btn.href}
                                  className={cn('px-[10px] md:px-5 h-[34px] md:h-[48px] rounded-[8px] bg-foreground text-background flex justify-center items-center text-[14px]', btn.opacity)}>{btn.text}</a>
                      })
                    }
                  </div>

                </div>
              </div>
              <img
                className={'w-full h-full object-cover block'}
                src={item.banner} alt="" />
            </div>
          </SwiperSlide>
        })
      }
    </Swiper>
  </div>
}
const HomeDataCardCount = () => {
  const { total } = useVisitStore()
  return <div
    className={'h-full flex flex-col justify-center xl:py-[32px] xl:px-[40px] pl-4 pt-2 bg-[linear-gradient(121deg,rgba(196,255,255,0.15)_0%,rgba(190,83,69,0.15)_100%)] rounded-[14px] cursor-pointer  bg-background shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_8px_rgba(255,255,255,.1)]'}>
    <div className={'text-[24px] xl:text-[64px] h-[24px] xl:h-[64px] flex items-center text-primary'}>{total}</div>
    <div className={'text-[16px] h-[16px] flex items-center my-[10px] text-foreground'}>总访问量</div>
  </div>
}
const HomeDataCardDate = () => {
  const { today, updateCount } = useVisitStore()
  useEffect(() => {
    updateCount()
  }, [])
  return <div
    className={'h-full flex flex-col justify-center xl:py-[32px] xl:px-[40px] pl-4 pt-2 bg-[linear-gradient(121deg,rgba(239,184,174,0.15)_0%,rgba(127,156,76,0.1)_100%)] rounded-[14px] cursor-pointer  bg-background shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_8px_rgba(255,255,255,.1)]'}>
    <div className={'text-[24px] xl:text-[64px] h-[24px] xl:h-[64px] flex items-center text-primary'}>{today}</div>
    <div className={'text-[16px] h-[16px] flex items-center my-[10px] text-foreground'}>今日访问</div>
  </div>
}
export const HomeData = () => {
  return <Container>
    <PartTitle title={'一些"小破站"'} description={'想捞一波,因站长心太善没了下文'}></PartTitle>
    <div className={'w-full flex flex-col-reverse xl:flex-row mt-3 xl:mt-6'}>
      <div
        className={'xl:min-w-[320px] flex justify-between xl:flex-col md:flex-row xl:w-[320px] w-full mt-[20px] xl:mt-0'}>
        <div className={'w-full h-[100px] xl:h-[194px]'}>
          <HomeDataCardCount></HomeDataCardCount>
        </div>
        <div className={'w-full h-[100px] xl:h-[194px] ml-[20px] xl:ml-0'}>
          <HomeDataCardDate></HomeDataCardDate>
        </div>
      </div>
      <div
        className={'h-[420px] xl:flex-1 xl:w-auto w-full xl:ml-[32px] bg-background shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_8px_rgba(255,255,255,.1)] rounded-[14px] overflow-hidden'}>
        <HomeDataSwiper></HomeDataSwiper>
      </div>
    </div>
  </Container>
}