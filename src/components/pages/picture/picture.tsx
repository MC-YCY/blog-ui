'use client'

import { PictureType } from '@/types/picture'
import { IconMaximize } from '@tabler/icons-react'
import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import dayjs from 'dayjs'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import { SpanButton } from '@/components/ui/button.tsx'

export interface PictureSwiperItemContentOptionsType extends PictureType {
  setStates: (arg0: PictureType) => void;
  active: string;
  activeIndex: number;
  slideIndex: number;
}

export interface PictureSwiperItemContentType extends PictureType {
  setStates: (arg0: PictureType) => void;
  activeIndex: number;
  slideIndex: number;
  showOptions: boolean;
}

export const PicturePreview = (current: PictureType) => {
  return <>
    <PhotoProvider>
      <PhotoView key={current.url} src={current.url}>
        <SpanButton tabIndex={-1} className={'w-[36px]! h-[36px] flex items-center justify-center'}>
          <IconMaximize width={24} height={24}></IconMaximize>
        </SpanButton>
      </PhotoView>
    </PhotoProvider>
  </>
}

export const PictureSwiperItemContentOptions = (props: PictureSwiperItemContentOptionsType) => {
  const swiperRef = useRef<SwiperRef | null>(null)
  useEffect(() => {
    requestAnimationFrame(() => {
      if (!(props.activeIndex === props.slideIndex)) return
      if (props.children?.length) {
        props.setStates(props.children[0])
      } else {
        props.setStates(props)
      }
      swiperRef.current?.swiper.slideTo(0)
    })
  }, [props.activeIndex])
  return <Swiper
    ref={swiperRef}
    slidesPerView={'auto'}
    spaceBetween={20}
    pagination={{
      clickable: true,
    }}>
    {
      props.children && props.children.map((item) => {
        return <SwiperSlide key={item.url} className={'!w-[calc(33.33%-14px)]'}>
          <div className={cn('h-[100px] relative bg-[rgba(0,0,0,.65)] transition-[all_0.3s_linear]')}
               onClick={() => props.setStates(item)}>
            <img
              decoding="async"
              className={cn(item.url === props.active ? 'opacity-100' : 'opacity-50', 'transition-[opacity_0.3s_linear] object-[50%_30%] w-full h-full object-cover')}
              src={item.thumbnail ?? item.url} alt="" />
          </div>
        </SwiperSlide>
      })
    }
  </Swiper>
}

export const PictureSwiperItemContent = (props: PictureSwiperItemContentType) => {
  const [current, setCurrent] = useState<PictureType>(props)

  const handleSelect = (next: PictureType) => {
    setCurrent(next)
    props.setStates(next)
  }

  return (
    <div className="w-full h-full relative overflow-hidden">
      <div
        className="absolute inset-0 z-10 bg-[linear-gradient(-125deg,#FFFFFFCC,#FFFFFF4D,#FFFFFF00,#FFFFFF00)] dark:bg-[linear-gradient(-125deg,#000000CC,#0000004D,#00000000,#00000000)] flex flex-col-reverse xl:flex-row">
        <div className="flex-1 flex-col flex p-[40px]">
          <div className="w-full xl:w-[50%] mt-auto pointer-events-auto">
            {
              props.showOptions && <PictureSwiperItemContentOptions
                {...props}
                active={current.url}
                setStates={handleSelect}
              />
            }
          </div>
        </div>
        <div className="w-full xl:w-[470px] flex flex-col p-[40px] pb-0 ml-auto">
          <h2 className="text-[32px] leading-[1.34]">{current.name}</h2>
          <p
            className="text-[16px] leading-[1.5] pt-[16px] line-clamp-2">{dayjs(current.date).format('YYYY/MM/DD')}-{current.tip}</p>
          <p
            className="pt-[16px] text-[16px] text-foreground line-clamp-4 xl:line-clamp-none md:line-clamp-none text-shadow-lg">
            {current.describe}
          </p>
        </div>
      </div>

      <AnimatePresence mode="sync">
        <motion.div
          key={current.url}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <img
            decoding="async"
            className={'object-[50%_30%] w-full h-full object-cover'}
            onLoad={(e) => e.currentTarget.classList.add('opacity-100')}
            src={current.url}
            alt={''} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}