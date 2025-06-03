import { useInView } from 'react-intersection-observer'
import { Suspense, useEffect, useState } from 'react'
import { Loading } from '@/components/project/loading/loading.tsx'
// 当可视时加载
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
        <Suspense fallback={<Loading className={'py-20'}/>}>
          {children}
        </Suspense>
      ) : (
        <Loading className={'py-20'}/>
      )}
    </div>
  )
}