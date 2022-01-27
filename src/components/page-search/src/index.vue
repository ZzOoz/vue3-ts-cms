<template>
  <div class="page-search">
    <yt-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1>高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="el-icon-refresh" @click="handleReset"
            >重置</el-button
          >
          <el-button type="primary" icon="el-icon-search" @click="handleSearch"
            >搜索</el-button
          >
        </div>
      </template>
    </yt-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import YtForm from '@/base-ui/form'

export default defineComponent({
  components: {
    YtForm
  },
  props: {
    searchFormConfig: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: ['reset', 'search'],
  setup(props, { emit }) {
    const formItems = props.searchFormConfig.formItems ?? []
    const formOrginData: any = {}
    for (const item of formItems) {
      formOrginData[item.field] = ''
    }

    const formData = ref(formOrginData)

    const handleReset = () => {
      // console.log('点击重置')
      formData.value = formOrginData
      emit('reset')
    }

    const handleSearch = () => {
      console.log('触发搜索')
      emit('search', formData.value)
    }

    return {
      formData,
      handleReset,
      handleSearch
    }
  }
})
</script>

<style scoped lang="less">
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
