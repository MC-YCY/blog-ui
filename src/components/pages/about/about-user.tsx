import UserImg from '@/assets/images/me/user.jpg'
import style from './style.module.css'
import { cn } from '@/lib/utils.ts'

// const styleClassName = 'px-3 py-0.5 bg-background border rounded-2xl shadow-sm cursor-default'
export const AboutUser = () => {
  return <div className={'w-full flex justify-center pb-[70px] pt-[20px]'}>
    {/*<div className={'hidden md:flex flex-col justify-around py-[10px] text-[14px]'}>*/}
    {/*  <div className={cn('ml-[16px] ', styleClassName, style.ani)}>*/}
    {/*    🤖️ 数码科技爱好者*/}
    {/*  </div>*/}
    {/*  <div className={cn('mr-[16px]', styleClassName, style.ani)}>🔍 分享与热心帮助</div>*/}
    {/*  <div className={cn('mr-[16px]', styleClassName, style.ani)}>🏠 智能家居小能手</div>*/}
    {/*  <div className={cn('ml-[16px] ', styleClassName, style.ani)}>*/}
    {/*    🔨 吹牛开发一条龙*/}
    {/*  </div>*/}
    {/*</div>*/}
    <div
      className={cn('w-[180px] h-[180px] rounded-[180px] mx-6 cursor-pointer hover:scale-110 hover:shadow-xl hover:rotate-360 transition', style.ani)}>
      <img className={'w-full h-full object-cover rounded-[180px]'} src={UserImg} alt="" />
    </div>
    {/*<div className={'hidden md:flex flex-col justify-around py-[10px] text-[14px]'}>*/}
    {/*  <div className={cn('mr-[16px]', styleClassName, style.ani)}>分享与热心帮助 🤖️</div>*/}
    {/*  <div className={cn('ml-[16px] ', styleClassName, style.ani)}>分享与热心帮助*/}
    {/*    🔍*/}
    {/*  </div>*/}
    {/*  <div className={cn('ml-[16px] ', styleClassName, style.ani)}>分享与热心帮助*/}
    {/*    🔍*/}
    {/*  </div>*/}
    {/*  <div className={cn('mr-[16px]', styleClassName, style.ani)}>分享与热心帮助 🔨</div>*/}
    {/*</div>*/}
  </div>
}