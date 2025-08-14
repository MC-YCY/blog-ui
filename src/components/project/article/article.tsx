'use client'

import { ArticleType } from '@/types/article'
import { cn } from '@/lib/utils'
import dayjs from 'dayjs'
import { Loading } from '@/components/project/loading/loading.tsx'
import LazyImage from '@/components/project/lazy-image.tsx'

interface ArticleComponentType extends ArticleType {
  onClick?: (arg0: ArticleType) => void;
  preview?: boolean;
}

export const Article = (props: ArticleComponentType) => {
  return <div className={cn('w-full pt-[28px]', props.preview && 'max-h-[70vh] overflow-y-auto max-w-[100rem] mx-auto px-2 md:px-8')}>
    <div
      onClick={() => props.onClick && props.onClick(props)}
      className={cn('bg-background w-full p-[24px]  rounded-[14px] border-[1px] border-[rgba(255,255,255,.15)]', !props.preview && 'shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_8px_rgba(255,255,255,.1)]')}>
      <div className={'h-[70px] w-full relative'}>
        <div className={'h-[120px] absolute bottom-0 w-full block md:flex xl:flex'}>
          <div
            className={'w-full xl:w-[160px] md:w-[160px] min-w-[160px] h-[120px] relative rounded-[6px] overflow-hidden shadow-[0_0_2px_rgba(0,0,0,0.5)] dark:shadow-[0_0_2px_rgba(255,255,255,.5)]'}>
            <LazyImage
              src={props.banner}
              alt="Product"
              width={'100%'}
              height={'100%'}
              loadingIndicator={<Loading className={'w-full h-full'} />}
              className={'w-full h-full object-cover block'}
            />
          </div>
          <div
            className={'ml-0 md:ml-4 xl:ml-4 flex flex-col justify-center pt-[26px] cursor-pointer flex-1 text-left'}>
            <div
              className={'font-bold text-[20px] text-foreground flex-1 max-h-[24px] flex leading-[20px]'}>
              <div className={'flex-1 w-0 text-nowrap truncate'}>
                {props.title}
              </div>
            </div>
            <div className={'mt-2 text-[14px] opacity-55'}>{dayjs(props.createdAt).format('YYYY/MM/DD')}</div>
          </div>
        </div>
      </div>
      <div
        className={cn('mt-20 xl:mt-4 md:mt-4 text-[14px] leading-[22px] mb-4 relative text-[rgba(0,0,0,.7)] dark:text-[rgba(255,255,255,.7)] cursor-pointer text-left', props.preview ? 'h-auto' : 'line-clamp-2 h-[44px]')}>
        {props.readme}
      </div>
      <div className={'flex'}>
        <span className={'h-[22px] text-[14px] text-foreground opacity-75 cursor-pointer'}>{props.tags.join('/')}</span>
      </div>
    </div>
  </div>
}