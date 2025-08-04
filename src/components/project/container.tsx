import { ReactNode } from 'react'
import { cn } from '@/lib/utils.ts'
import { MotionModuleConfig } from '@/constant/motion-module.config.ts'
import { motion } from 'framer-motion'

export const Container = ({ children, className, isTransition }: {
  children: ReactNode,
  className?: string,
  isTransition?: boolean
}) => {
  let transitionConfig = { ...MotionModuleConfig.containerVariantsProps(0) }
  if (!(isTransition === undefined)) {
    if (!isTransition) {
      transitionConfig = {} as any
    }
  }
  return <motion.div {...transitionConfig}
                     className={cn('max-w-[1400px] mx-auto xl:pt-[64px] pt-[24px] pb-[8px] xl:pb-[24px] px-[8px] md:px-[32px]', className)}>
    {children}
  </motion.div>
}