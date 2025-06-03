import style from './style.module.css'
import { cn } from '@/lib/utils'

export const Loading = ({ className }: { className?: string }) => {
  return <div className={cn(style.loading, className)}>
    <div className={style.loadingWide}>
      <div className={cn(style.l1, style.color)}></div>
      <div className={cn(style.l2, style.color)}></div>
      <div className={cn(style.e1, style.color, style.animationEffectLight)}></div>
      <div className={cn(style.e2, style.color, style.animationEffectLightD)}></div>
      <div className={cn(style.e3, style.animationEffectRot)}></div>
      <div className={cn(style.e4, style.color, style.animationEffectLight)}></div>
      <div className={cn(style.e5, style.color, style.animationEffectLightD)}></div>
      <div className={cn(style.e6, style.color, style.animationEffectScale)}></div>
      <div className={cn(style.e7, style.color)}></div>
      <div className={cn(style.e8, style.color)}></div>
    </div>
  </div>
}