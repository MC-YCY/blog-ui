import { EChartsType } from 'echarts'

const INIT_MAP = new Map()

interface myChartType extends EChartsType {
  __resizeTimer?: ReturnType<typeof setTimeout>
}

export const installChartResize = (el: HTMLDivElement, myChart: myChartType, resizeFn?: Function) => {
  INIT_MAP.set(myChart, false)
  const resizeObserver = new ResizeObserver(() => {
    clearTimeout(myChart.__resizeTimer)
    myChart.__resizeTimer = setTimeout(() => {
      if (INIT_MAP.get(myChart)) {
        myChart.resize({
          animation: { duration: 300 }, // 添加平滑过渡动画
        })
        if (resizeFn) {
          resizeFn()
        }
      }
      INIT_MAP.set(myChart, true)
    }, 200)
  })
  resizeObserver.observe(el)

  const originalDispose = myChart.dispose
  myChart.dispose = () => {
    resizeObserver.disconnect()
    originalDispose.call(myChart)
  }
}
