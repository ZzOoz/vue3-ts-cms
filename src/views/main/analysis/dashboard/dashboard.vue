<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <yt-card title="分类商品数量(饼图)">
          <pie-chart :pieData="categoryGoodsCount"></pie-chart>
        </yt-card>
      </el-col>
      <el-col :span="10">
        <yt-card title="不同城市商品销量">
          <map-chart :mapData="addressGoodsSale"></map-chart>
        </yt-card>
      </el-col>
      <el-col :span="7">
        <yt-card title="分类商品数量(玫瑰图)">
          <rose-chart :roseData="categoryGoodsCount"></rose-chart>
        </yt-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <yt-card title="分类商品的销量">
          <line-chart v-bind="categoryGoodsSale"></line-chart>
        </yt-card>
      </el-col>
      <el-col :span="12">
        <yt-card title="分类商品的收藏">
          <bar-chart v-bind="categoryGoodsFavor"></bar-chart>
        </yt-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import YtCard from '@/base-ui/card'
// import baseCharts from '@/base-ui/echart'
import {
  pieChart,
  roseChart,
  lineChart,
  barChart,
  mapChart
} from '@/components/page-echarts'
export default defineComponent({
  name: 'dashboard',
  components: {
    YtCard,
    // baseCharts,
    pieChart,
    roseChart,
    lineChart,
    barChart,
    mapChart
  },
  setup() {
    // 请求数据
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')

    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })

    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return { xLabels, values }
    })

    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }
      return { xLabels, values }
    })

    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
