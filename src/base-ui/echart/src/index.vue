<template>
  <div class="echart">
    <div ref="echartRef" :style="{ width: '100%', height: '350px' }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import { useEchart } from '../hooks/useEchart'

// widthDefault是用来设置默认值
// defineProps是用来设置props
const props = withDefaults(
  defineProps<{
    options: EChartsOption // option的类型echart有提供一个接口类型
    width: string
    height: string
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

const echartRef = ref<HTMLElement>()

// 因为在setup的时候节点还没有完成挂载 所以要在onMounted的时候才将init调用节点才能有
onMounted(() => {
  const { setOptions } = useEchart(echartRef.value!)
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style scoped lang="less"></style>
