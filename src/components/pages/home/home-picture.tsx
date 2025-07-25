'use client'

import { PartTitle } from '@/components/project/part-title/part-title'
import { Container } from '@/components/project/container'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar } from 'swiper/modules'
import { PictureType } from '@/types/picture'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  PictureSwiperItemContent,
  PicturePreview,
} from '@/components/pages/picture/picture'
import {
  LinQiTingA,
  LinQiTingAthumbnail,
  LiShengXuanA,
  LiShengXuanAthumbnail,
  XingNuanG,
  XingNuanGthumbnail,
  CityA,
  CityAthumbnail,
  CityB,
  CityBthumbnail,
  CityC,
  CityCthumbnail,
  CityD,
  CityDthumbnail,
} from '@/constant/picture.url.ts'
import { LazyContent } from '@/components/inview-lazy-content.tsx'
import { cn } from '@/lib/utils.ts'

const PictureSwiper = ({ setPreview }: { setPreview: (arg0: PictureType) => void }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const onSlideChange = (swiper: { activeIndex: number }) => {
    setActiveIndex(swiper.activeIndex)
  }
  const setStates = (state: PictureType) => {
    setPreview(state)
  }
  const [list] = useState<PictureType[]>([
    {
      name: '赛博苍穹下的都市霓虹',
      tip: '科幻幻想中的城市风景、暗黑、植被、科技、落幕...',
      describe: `夜幕垂落，赛博都市在迷雾与霓虹中苏醒。林立的摩天楼如钢铁巨兽，流转的光影似血管搏动，每束刺破黑暗的光，都在书写科技与未来交织的狂想，这是属于赛博时代的城市肖像，藏着人类对未知的野心与向往 。`,
      date: new Date(2025, 7, 2),
      url: CityA,
      children: [
        {
          name: '赛博苍穹下的都市霓虹',
          tip: '科幻幻想中的城市风景、暗黑、植被、科技、落幕...',
          describe: `夜幕垂落，赛博都市在迷雾与霓虹中苏醒。林立的摩天楼如钢铁巨兽，流转的光影似血管搏动，每束刺破黑暗的光，都在书写科技与未来交织的狂想，这是属于赛博时代的城市肖像，藏着人类对未知的野心与向往 。`,
          date: new Date(2025, 7, 2),
          url: CityA,
          thumbnail: CityAthumbnail,
        },
        {
          name: '落日与霓虹的狂想',
          tip: '科幻幻想中的城市风景、暗黑、植被、科技、落幕...',
          describe: `当落日余晖漫过星际都市，霓虹与霞光共舞。摩天楼刺破云层，飞船穿梭天际，河流串起璀璨灯火，远方行星悬于苍穹，这是人类将科幻梦照进现实的舞台，每束光、每座建筑，都在书写宇宙时代的浪漫序章 。`,
          date: new Date(2025, 7, 2),
          url: CityB,
          thumbnail: CityBthumbnail,
        },
        {
          name: '未来之城：天地之锚',
          tip: '科幻幻想中的城市风景、暗黑、植被、科技、落幕...',
          describe: `云雾缭绕间，岛屿之上，螺旋建筑如天地锚点。直耸天际的线条，串联起现实与遐想，是科技与自然共织的未来剪影，每一圈回旋，都在诉说对人居新形态的探索，于山海环抱中，勾勒城市进化的梦幻轮廓 。`,
          date: new Date(2025, 7, 2),
          url: CityC,
          thumbnail: CityCthumbnail,
        },
        {
          name: '寻迹未来',
          tip: '科幻幻想中的城市风景、暗黑、植被、科技、落幕...',
          describe: `踏入云雾弥漫的绿野，眼前是科技与自然共生的奇迹都市。藤蔓爬上摩天楼，瀑布从建筑间倾泻，人类不再是自然的征服者，而是共生的探索者。在这片觉醒的土地上，每一寸绿意、每一缕科技之光，都在诉说未来人居的诗意答案，引我们寻迹生态与文明交融的远方 。`,
          date: new Date(2025, 7, 2),
          url: CityD,
          thumbnail: CityDthumbnail,
        },
      ],
    },
    {
      name: '林琦婷（琦琦小霸王🧸）',
      tip: '是简简单单的欣赏',
      describe: `演员 林琦婷 努力加油 尽力而为
新剧：《穿成女配后 公主她不伺候了》姜玥 《开局遇到高冷校花》叶弥月 《归期未有期》颜朝舞《我的电子女友咋修成剑仙》李清然 《学姐我的心被你偷啦》苏白粥《锦绣繁华》谢静姝《偷听有戏》林清寒《悔不当初》柳如烟《年下弟弟又野又凶》林夕 《我家宝匣通古今 女帝认我做老公》独孤月 《订婚被抛弃 我转身娶了京圈大小姐》凌若潇 《听见你的声音》程清禾 《步步沉沦》林知夏`,
      date: new Date(),
      url: LinQiTingA,
      children: [
        {
          name: '林琦婷（琦琦小霸王🧸）',
          tip: '是简简单单的欣赏',
          describe: `演员 林琦婷 努力加油 尽力而为
新剧：《穿成女配后 公主她不伺候了》姜玥 《开局遇到高冷校花》叶弥月 《归期未有期》颜朝舞《我的电子女友咋修成剑仙》李清然 《学姐我的心被你偷啦》苏白粥《锦绣繁华》谢静姝《偷听有戏》林清寒《悔不当初》柳如烟《年下弟弟又野又凶》林夕 《我家宝匣通古今 女帝认我做老公》独孤月 《订婚被抛弃 我转身娶了京圈大小姐》凌若潇 《听见你的声音》程清禾 《步步沉沦》林知夏`,
          date: '2025/5/22',
          url: LinQiTingA,
          thumbnail: LinQiTingAthumbnail,
        },
        {
          name: '黎晟萱',
          tip: '是简简单单的欣赏',
          describe: '一个理科生（应该算正在努力当演员）的养成系演员！短剧《开局女帝盯上了我的彩礼》《练气3000层，开局收女帝为徒》《犹为离人照落花》《厉总，江秘书她离职了》《你竟然是我的前妻》《爱上你的心脏》《上岸吧人鱼殿下》《婚姻的温度》《肥妻逆袭，冷酷厂长追疯了》《原谅他99次》《沈总，你养的金丝雀变凤凰了》《丑妃倾天下：禁欲王爷宠疯了》',
          date: '2025/5/22',
          url: LiShengXuanA,
          thumbnail: LiShengXuanAthumbnail,
        },
        {
          name: '邢暖',
          tip: '是简简单单的欣赏',
          describe: '',
          date: '2025/5/26',
          url: XingNuanG,
          thumbnail: XingNuanGthumbnail,
        },
      ],
    },
  ])
  return <div
    className={cn('w-full h-full home-picture')}>
    <Swiper
      onSlideChange={(swiper) => onSlideChange(swiper)}
      className={'w-full h-full'}
      scrollbar={{
        hide: false,
        horizontalClass: 'custom-swiper-scrollbar',
      }}
      modules={[Scrollbar]}>
      {
        list.map((item, index) => {
          return <SwiperSlide key={item.url} className={'home-picture-swiper-slide'}>
            <LazyContent>
              <PictureSwiperItemContent activeIndex={activeIndex}
                                        showOptions={true}
                                        slideIndex={index}
                                        setStates={(state) => setStates(state)} {...item}></PictureSwiperItemContent>
            </LazyContent>
          </SwiperSlide>
        })
      }
    </Swiper>
  </div>
}

export const HomePicture = () => {
  const navigate = useNavigate()
  const goPicture = () => {
    navigate('/picture')
  }
  const [previewState, setPreviewState] = useState<PictureType>({
    name: '',
    tip: '',
    describe: '',
    date: '',
    url: '',
  })
  return <Container>
    <PartTitle title={'图库'} description={'信我都是在群里收藏的，我想你们知道我是个收藏仔...'} action={
      <div className={'w-[36px]'}>
        <PicturePreview {...previewState}></PicturePreview>
      </div>
    }></PartTitle>
    <div className={'w-full flex mt-3 xl:mt-6 select-none'}>
      <div
        className={'w-full h-[76vh] max-h-[768px] bg-background shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_8px_rgba(255,255,255,.1)] rounded-[14px] overflow-hidden'}>
        <PictureSwiper setPreview={(state) => setPreviewState(state)}></PictureSwiper>
      </div>
    </div>
    <div className={'flex justify-center mt-[20px]'}>
      <div onClick={goPicture}
           className={'cursor-pointer opacity-55 w-[120px] h-[36px] flex justify-center items-center text-foreground border-[1px] border-foreground rounded-[36px] text-[14px]'}>查看更多
      </div>
    </div>
  </Container>
}