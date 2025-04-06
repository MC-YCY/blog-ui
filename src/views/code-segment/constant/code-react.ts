import { CodeSegmentItem } from '@/types/code-segment.ts'

export const CodeReact:CodeSegmentItem[] = [
  {
    title:'defer hooks',
    description:'延迟加载dom优化初次加载速度，在一瞬间内加载部分资源当下一帧时在渲染其他元素',
    code:[
      {
        language:'ts',
        filename:'hooks/useFrameRate.ts',
        content:`import { useState, useEffect } from 'react'
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
}`},
      {
        filename:'hooks/useOptimizedDefer.ts',
        language:'ts',
        content:`import { useState, useEffect } from 'react'
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
}`
      },
      {
        filename:'@/utils/frame.ts',
        language:'ts',
        content:`/**
 * 帧率监控指标接口
 * @property median - 帧时间中位数（毫秒），排除极端值影响
 * @property average - 帧时间平均值（毫秒），反映整体性能
 * @property min - 最小帧时间（毫秒），最佳性能点
 * @property max - 最大帧时间（毫秒），性能瓶颈点
 */
interface FrameMetrics {
  median: number
  average: number
  min: number
  max: number
}

/**
 * 帧率管理器类
 * @description 用于精确监控和报告浏览器渲染帧率变化
 *
 * 主要功能：
 * 1. 自动采集连续帧渲染时间
 * 2. 计算关键性能指标（中位数/均值/极值）
 * 3. 支持多订阅者的指标更新通知
 * 4. 自动适应不同刷新率设备（60Hz/120Hz/144Hz）
 *
 * 使用场景：
 * - 动画性能优化
 * - 长列表渲染优化
 * - 用户交互性能分析
 */
export class FrameRateManager {
  // 帧时间样本池（单位：毫秒）
  private samples: number[] = []
  // 监控状态标识
  private isMeasuring = false
  // 指标更新回调队列
  private callbacks: ((metrics: FrameMetrics) => void)[] = []

  /**
   * 构造帧率管理器实例
   * @param sampleSize - 样本窗口大小（默认60帧≈1秒数据）
   *
   * 设计考虑：
   * - 过小样本（<30）会导致统计波动大
   * - 过大样本（>120）会降低响应灵敏度
   * - 60帧平衡了移动端/桌面端的刷新率差异
   */
  constructor(private sampleSize = 60) {
  }

  /**
   * 启动帧率监控
   * @description 开始持续采集帧时间数据
   *
   * 实现要点：
   * 1. 使用performance.now()获取高精度时间戳
   * 2. requestAnimationFrame对齐浏览器渲染周期
   * 3. 自动进行样本窗口滑动更新
   */
  startMonitoring() {
    if (this.isMeasuring) return

    this.isMeasuring = true
    // 初始基准时间戳（使用Performance API获取亚毫秒级精度）
    let lastFrameTime = performance.now()

    /**
     * 帧时间采样闭包
     *
     * 工作原理：
     * 1. 测量相邻requestAnimationFrame回调的时间差作为帧时间
     * 2. 当样本数达到窗口大小时触发指标计算
     * 3. 清空样本池开始新一轮采集
     */
    const measure = () => {
      const now = performance.now()
      // 计算当前帧耗时（可捕获丢帧情况）
      const delta = now - lastFrameTime

      // 存入样本池（过滤首帧异常值）
      if (this.samples.length > 0 || delta < 100) {
        this.samples.push(delta)
      }
      lastFrameTime = now

      // 当样本达到窗口大小时计算指标
      if (this.samples.length >= this.sampleSize) {
        this.calculateMetrics()
        // 清空样本池（滑动窗口机制）
        this.samples = []
      }

      // 维持测量循环（仅在活跃状态下继续）
      if (this.isMeasuring) {
        requestAnimationFrame(measure)
      }
    }

    // 启动测量循环（对齐浏览器渲染周期）
    requestAnimationFrame(measure)
  }

  /**
   * 计算性能指标
   * @description 对当前样本窗口进行统计分析
   *
   * 算法选择：
   * - 中位数：抗异常值干扰，反映典型性能
   * - 平均值：感知整体性能趋势
   * - 极值：定位性能边界情况
   */
  private calculateMetrics() {
    // 排序用于计算中位数（注意：sort默认按字符串排序，需提供比较函数）
    const sorted = [...this.samples].sort((a, b) => a - b)
    // 中位数计算（避免偶数样本平均产生的浮点数）
    const median = sorted[Math.floor(sorted.length / 2)]
    // 平均值（保留3位小数精度）
    const average = Number(
      (this.samples.reduce((a, b) => a + b, 0) / this.samples.length
      ).toFixed(3))
    // 极值计算（用于检测偶发卡顿）
    const min = Math.min(...this.samples)
    const max = Math.max(...this.samples)

    // 组装指标对象
    const metrics = { median, average, min, max }
    // 通知所有订阅者（采用同步回调保证及时性）
    this.callbacks.forEach(cb => cb(metrics))
  }

  /**
   * 订阅指标更新
   * @param callback - 指标更新回调函数
   *
   * 典型使用场景：
   * - 动态调整动画参数
   * - 性能异常报警
   * - 用户体验数据收集
   */
  onUpdate(callback: (metrics: FrameMetrics) => void) {
    this.callbacks.push(callback)
  }

  /**
   * 停止监控
   * @description 结束数据采集并释放资源
   *
   * 最佳实践：
   * - 页面不可见时暂停监控（通过Page Visibility API）
   * - 组件卸载时主动调用防止内存泄漏
   */
  stop() {
    this.isMeasuring = false
    // 清空调用队列（可选，根据业务需求）
    this.callbacks = []
  }
}`
      },
      {
        filename:'/views/code-segment/index.tsx',
        language:'tsx',
        content:`import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui/shadcn-tabs.tsx'
import Container from '@/components/container.tsx'
import { useState } from 'react'
import { CodeCss, CodeJs, CodeReact, CodeVue } from './constant'
import { CodeBlock } from '@/components/ui/code-block.tsx'
import { CodeSegmentItem } from '@/types/code-segment.ts'
import { useOptimizedDefer } from '@/hooks/useOptimizedDefer.ts'
import { TracingBeam } from '@/components/ui/tracing-beam.tsx'

const ContentMap: Record<string, CodeSegmentItem[]> = {
  'CSS': CodeCss,
  'JS': CodeJs,
  'Vue': CodeVue,
  'React': CodeReact,
}

export default function() {
  const [tabValue, setTabValue] = useState('CSS')
  const [tabTypeList] = useState<{ label: string, value: string }[]>([
    {
      label: 'CSS',
      value: 'CSS',
    },
    {
      label: 'JS',
      value: 'JS',
    },
    {
      label: 'Vue',
      value: 'Vue',
    },
    {
      label: 'React',
      value: 'React',
    },
  ])
  // defer 加载dom优化
  const isVisible = useOptimizedDefer(ContentMap[tabValue].length)
  return (
    <Container className={'pt-10'}>
      <Tabs
        defaultValue="css"
        value={tabValue}
        onValueChange={setTabValue}
        className={' z-[150] sticky top-[64px]'}
      >
        <TabsList className="grid grid-cols-4">
          {
            tabTypeList.map((tab) => {
              return <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
            })
          }
        </TabsList>
      </Tabs>
      <div className={'pb-10'}>
        <TracingBeam className="w-full min-w-full">
          {
            ContentMap[tabValue].map((item, index) => {
              return isVisible(index) ? <div className={'mt-8'}>
                  <p className={'text-primary text-2xl'}>{item.title}</p>
                  <p className={'text-foreground opacity-80 my-4'}>{item.description}</p>
                  {
                    item.code instanceof Array ? <>
                    {
                      item.code.map((code)=>{
                        return <CodeBlock className={'mt-2'} language={code.language}
                                   filename={code.filename}
                                   code={code.content}></CodeBlock>
                      })
                    }
                    </> : <CodeBlock language={item.code.language}
                                     filename={item.code.filename}
                                     code={item.code.content}></CodeBlock>
                  }
                </div>
                : null
            })
          }
        </TracingBeam>
      </div>
    </Container>
  )
}
`
      }
    ]
  }
]