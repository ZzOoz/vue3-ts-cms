<template>
  <div class="role">
    <page-search :search-form-config="searchFormConfig"></page-search>
    <page-content
      :content-table-config="contentTableConfig"
      pageName="role"
      @edit="handleEdit"
      @create="handleCreate"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :modalConfig="modalConfig"
      :default-info="defaultInfo"
      :other-info="otherInfo"
      pageName="role"
    >
      <el-tree
        ref="elTreeRef"
        :data="menus"
        show-checkbox
        node-key="id"
        :props="{ children: 'children', label: 'name' }"
        @check="handleCheckNode"
      />
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from 'vuex'

import pageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'
import pageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import { pageModalHook } from '@/hooks/pageModalHook'
import { mapToLeafKey } from '@/utils/map-menu'
import { ElTree } from 'element-plus'

export default defineComponent({
  name: 'role',
  components: {
    pageSearch,
    pageContent,
    pageModal
  },
  setup() {
    // 获取tree节点
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    // 编写pageModalHook的edit回调函数 回显选中的tree节点
    const editCb = (item: any) => {
      const leafKeys = mapToLeafKey(item.menuList)
      // 这里要等待dom挂载完成后在设置选中节点 否则回显不出来
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }

    const [pageModalRef, defaultInfo, handleCreate, handleEdit] = pageModalHook(
      undefined,
      editCb
    )

    const store = useStore()
    const menus = computed(() => store.state.entireMenus)

    const otherInfo = ref({})
    // 选中节点事件
    const handleCheckNode = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menus = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList: menus }
    }

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      pageModalRef,
      defaultInfo,
      handleCreate,
      handleEdit,
      menus,
      otherInfo,
      handleCheckNode,
      elTreeRef
    }
  }
})
</script>

<style scoped></style>
