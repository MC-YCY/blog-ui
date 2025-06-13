import { ReactNode } from 'react'
import { cn } from '@/lib/utils.ts'

export const Container = ({ children, className }: { children: ReactNode, className?: string }) => {
  return <div className={cn('max-w-[100rem] mx-auto xl:pt-16 pt-6 pb-2 xl:pb-6 px-2 md:px-8', className)}>
    {children}
  </div>
}