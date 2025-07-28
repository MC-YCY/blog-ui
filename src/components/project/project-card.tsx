'use client'

import { IconCode } from '@tabler/icons-react'
import React from 'react'
import LazyImage from '@/components/project/lazy-image.tsx'
import { Loading } from '@/components/project/loading/loading.tsx'

interface ProjectCardProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  project: string;
  banner: string;
  date: string;
  tip: string;
  code?: string;
  url?: string;
}

export const ProjectCard = (props: ProjectCardProps) => {
  return <div
    className="rounded-[10px] bg-background shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_8px_rgba(255,255,255,.3)] lg:mt-0"
    {...props}>
    <div>
      <div className={'relative w-full h-[246px]'}>
        <LazyImage
          src={props.banner}
          alt="Product"
          width={'100%'}
          height={'100%'}
          loadingIndicator={<Loading className={'w-full h-full'} />}
          className={'rounded-[10px_10px_0_0] w-full h-full object-cover'}
        />
      </div>
      <div className={'p-[16px] flex flex-col justify-between box-content'}>
        <div className={'font-bold text-foreground text-[20px] h-[20px] flex items-center'}>{props.project}</div>
        <div
          className={'text-foreground opacity-40 text-[14px] h-[14px] flex items-center mt-[10px]'}>{props.date}</div>
        <div className={'mt-[18px] text-foreground text-[14px] h-[14px] flex items-center'}>{props.tip}</div>

        <div className={'flex justify-between pt-[20px]'}>
          {
            props.code && <a
              target="_blank"
              href={props.code}
              className={'relative  w-[88px] h-[48px] rounded-[12px] overflow-hidden cursor-pointer flex items-center justify-center'}>
              <span className={'absolute inset-0 bg-foreground opacity-6 z-0'}></span>
              <IconCode width={24} height={24} className={'text-foreground opacity-80'}></IconCode>
            </a>
          }
          {
            props.url && <a
              target="_blank"
              href={props.url}
              className={'cursor-pointer flex-1 ml-[16px] h-[48px] bg-foreground text-background rounded-[12px] flex items-center justify-center text-base hover:opacity-80 transition'}>
              掘金
            </a>
          }
        </div>
      </div>
    </div>
  </div>
}