import style from './style.module.css'
import { cn } from '@/lib/utils'
import React from 'react'

export const MenuButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...props} className={style.settingBtn}>
    <span className={cn(style.bar, style.bar1)}></span>
    <span className={cn(style.bar, style.bar2)}></span>
    <span className={cn(style.bar, style.bar3)}></span>
  </button>
}

export const MenuButtonSpan = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <span {...props} className={style.settingBtn}>
        <span className={cn(style.bar, style.bar1)}></span>
        <span className={cn(style.bar, style.bar2)}></span>
        <span className={cn(style.bar, style.bar3)}></span>
    </span>
}