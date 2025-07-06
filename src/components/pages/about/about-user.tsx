import UserImg from '@/assets/images/me/user.jpg'
import style from './style.module.css'
import { cn } from '@/lib/utils.ts'

const styleClassName = 'px-3 py-0.5 bg-background rounded-2xl shadow-sm cursor-default'
export const AboutUser = () => {
  return <div className={'w-full flex justify-center pb-[70px] pt-[20px]'}>
    <div className={'hidden md:flex flex-col justify-around items-end py-[10px] text-[14px] font-bold'}>
      <span className={cn('mr-[-16px]', styleClassName, style.ani)}>🧱 CV工程师</span>
      <span className={cn(styleClassName, style.ani)}>🔍 什么都不会</span>
      <span className={cn(styleClassName, style.ani)}>❓ 什么都问问</span>
      <span className={cn('mr-[-16px]', styleClassName, style.ani)}>🔨 什么都不学</span>
    </div>
    <div
      className={cn('w-[180px] h-[180px] rounded-[180px] mx-6 cursor-pointer hover:scale-110 hover:shadow-xl hover:rotate-360 transition', style.ani)}>
      <img className={'w-full h-full object-cover rounded-[180px]'} src={UserImg} alt="" />
    </div>
    <div className={'hidden md:flex flex-col justify-around items-start py-[10px] text-[14px] font-bold'}>
      <div className={cn('ml-[-16px]', styleClassName, style.ani)}>什么牛都吹 🐂</div>
      <div className={cn(styleClassName, style.ani)}>文档看不懂 📃</div>
      <div className={cn(styleClassName, style.ani)}>臭敲代码的 🐟</div>
      <div className={cn('ml-[-16px]', styleClassName, style.ani)}>分享与热心 😁</div>
    </div>
  </div>
}