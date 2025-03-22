import { useInView } from 'react-intersection-observer'
import { Suspense, useEffect, useState } from 'react'

export const LoadingPlaceholder = () => (
  <div className="h-[200px] animate-pulse bg-muted/50 rounded-lg" >loading...</div>
)
// 动态内容加载器组件
export const LazyContent = ({ children }: { children: React.ReactNode }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (inView && !isLoaded) {
      setIsLoaded(true)
    }
  }, [inView, isLoaded])

  return (
    <div ref={ref}>
      {isLoaded ? (
        <Suspense fallback={<LoadingPlaceholder />}>
          {children}
        </Suspense>
      ) : (
        <LoadingPlaceholder />
      )}
    </div>
  )
}