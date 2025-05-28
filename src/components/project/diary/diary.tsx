import {cn} from '@/lib/utils';
import style from './style.module.css'
import React, {ReactNode} from "react";
import backgroundImage from '@/assets/images/diary-line-border.png'

interface Props {
    title: string | ReactNode;
    date: string;
    weather: ReactNode;
    content: ReactNode;
    className1?: string;
    className2?: string;
    className3?: string;
}

export const Diary = ({
                          title,
                          date,
                          weather,
                          content,
                          className1,
                          className2,
                          className3
                      }: Props) => {
    return <div
        className={cn('w-full bg-background min-h-[100px] relative', 'shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_8px_rgba(255,255,255,.2)]', style.diary, className1)}>
        <div
            className={cn('absolute w-full h-full left-[-8px] top-[8px] bg-[#f8f8fa] dark:bg-background z-[-1]', 'shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_8px_rgba(255,255,255,.1)]', className2)}></div>
        <div className={cn('w-full block xl:flex md:flex justify-between items-center pb-[10px] relative px-[10px]')}>
            <div className='absolute w-full h-[3px] bg-[#0AA9DB] left-0 bottom-0'></div>
            <div className={cn('text-[18px] cursor-default flex-1')}>
                {title}
            </div>
            <div className={cn('flex text-[14px] items-center cursor-default')}>
                <span className='mr-[2px] h-[14px] flex items-center'>{date}</span>
                {weather}
            </div>
        </div>
        <div style={{'--background-image':`url(${backgroundImage})`} as React.CSSProperties} className={cn(style.content, className3,'cursor-default dark:opacity-65')}>
            {content}
        </div>
    </div>
}