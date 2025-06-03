'use client'

import { IconCode } from '@tabler/icons-react'
import React from 'react'

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
    className="rounded-[10px] bg-background shadow-[inset_0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[inset_0_0_8px_rgba(255,255,255,.3)] lg:mt-0"
    {...props}>
    <div className={'p-[16px]'}>
      <div className={'relative w-full h-[246px]'}>
        <img
          className={'rounded-[10px] w-full h-full object-cover'}
          src={props.banner} alt="" />
      </div>
      <div className={'p-[16px] h-[180px] flex flex-col justify-between box-content'}>
        <div className={'pt-[8px] font-bold text-foreground text-[20px]'}>{props.project}</div>
        <div className={'text-foreground opacity-40 text-[14px]'}>{props.date}</div>
        <div className={'mt-[12px] text-foreground text-[14px]'}>{props.tip}</div>

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
              Look one Look
            </a>
          }
        </div>
      </div>
    </div>
  </div>
}