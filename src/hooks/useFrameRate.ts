import { useState, useEffect } from 'react'
import { FrameRateManager } from '@/utils/frame'

export const useFrameRate = () => {
  const [frameTime, setFrameTime] = useState(16.67)
  const [fps, setFps] = useState(60)

  useEffect(() => {
    const manager = new FrameRateManager()
    manager.onUpdate(({ median }) => {
      setFrameTime(median)
      setFps(Math.round(1000 / median))
    })
    manager.startMonitoring()

    return () => manager.stop()
  }, [])

  return { frameTime, fps }
}