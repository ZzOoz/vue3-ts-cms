import * as echarts from 'echarts'

import chinaMapData from '../data/china.json'

echarts.registerMap('china', chinaMapData)

export function useEchart(el: HTMLElement): any {
  const chartInstance = echarts.init(el)

  const setOptions = (options: echarts.EChartsOption) => {
    chartInstance.setOption(options)
  }

  // 返回一个可以手动调用reize的方法
  const updateSize = () => {
    chartInstance.resize()
  }

  // 监听浏览器尺寸变化 调用echart的resize方法
  window.addEventListener('resize', () => {
    chartInstance.resize()
  })

  // 返回对象的时候可以单独获取某一个返回值
  return {
    chartInstance,
    setOptions,
    updateSize
  }
}
