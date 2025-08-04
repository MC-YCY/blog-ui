// 父容器动画
const containerVariants = {
  hidden: { opacity: 0.2, y: 30, scale: 0.95 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export const MotionModuleConfig = {
  containerVariants,
  containerVariantsProps(index:number) {
    return {
      variants: containerVariants,
      initial: 'hidden',
      whileInView: 'show',
      viewport: { once: false, amount: 0.2 },
      transition: {
        delay: index * 0.15, // 根据索引逐个延迟
        duration: 0.6,
        ease: "easeOut",
      },
    }
  }
}