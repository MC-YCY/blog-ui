import { ReactNode } from 'react'
import { cn } from '@/lib/utils.ts'

export const Container = ({ children, className }: { children: ReactNode, className?: string }) => {
  return <div className={cn('max-w-[1400px] mx-auto xl:pt-[64px] pt-[24px] pb-[8px] xl:pb-[24px] px-[8px] md:px-[32px]', className)}>
    {children}
  </div>
}