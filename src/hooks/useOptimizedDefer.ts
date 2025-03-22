import { useState, useEffect } from 'react'
import { useFrameRate } from './useFrameRate'
// defer性能优化，根据帧率渲染列表组件，依次的渲染；加速初次加载速度
export const useOptimizedDefer = (maxItems: number) => {
  const { frameTime:_frameTime, fps } = useFrameRate()
  const [visibleItems, setVisibleItems] = useState(0)

  useEffect(() => {
    let animationFrameId: number
    let lastUpdate = 0
    const loadThreshold = Math.max(8, Math.floor(fps / 3)) // 动态加载阈值

    const updateItems = () => {
      const now = Date.now()
      if (now - lastUpdate > 1000 / loadThreshold) {
        setVisibleItems(prev => Math.min(prev + 1, maxItems))
        lastUpdate = now
      }
      animationFrameId = requestAnimationFrame(updateItems)
    }

    animationFrameId = requestAnimationFrame(updateItems)
    return () => cancelAnimationFrame(animationFrameId)
  }, [maxItems, fps])

  return (index: number) => index < visibleItems
}