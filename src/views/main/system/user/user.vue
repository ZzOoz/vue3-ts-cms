<template>
  <div class="user">
    <page-search
      :search-form-config="searchFormConfig"
      @reset="userReset"
      @search="userSearch"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :content-table-config="contentTableConfig"
      pageName="users"
      @edit="handleEdit"
      @create="handleCreate"
    >
    </page-content>
    <page-modal
      ref="pageModalRef"
      pageName="users"
      :modal-config="modalConfigRef"
      :default-info="defaultInfo"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import pageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'
import pageModal from '@/components/page-modal'

import { searchFormConfig } from './config/serach.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { pageSearchHook } from '@/hooks/pageSearchHook'
import { pageModalHook } from '@/hooks/pageModalHook'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'user',
  components: {
    pageSearch,
    pageContent,
    pageModal
  },
  setup() {
    const createCb = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }

    const editCb = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }

    // 2、动态添加部门和角色 store里面的state这些值只会在template或者或者在computed中会有响应式效果
    // 如果只在js/ts代码中的话是不会出现响应式的
    const store = useStore()
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map(
        (item: any) => {
          return { title: item.name, value: item.id }
        }
      )

      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item: any) => {
        return { title: item.name, value: item.id }
      })

      return modalConfig
    })

    const [pageContentRef, userReset, userSearch] = pageSearchHook()
    const [pageModalRef, defaultInfo, handleCreate, handleEdit] = pageModalHook(
      createCb,
      editCb
    )

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      userReset,
      userSearch,
      pageContentRef,
      pageModalRef,
      handleCreate,
      handleEdit,
      defaultInfo,
      modalConfigRef
    }
  }
})
</script>

<style scoped lang="less">
.content {
  padding: 20px 0;
  border-top: 20px solid #f5f5f5;
}
</style>
