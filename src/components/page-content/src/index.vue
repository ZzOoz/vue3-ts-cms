<template>
  <div class="page-content">
    <!-- {{ userList }} -->
    <!-- @handleSelect="handleSelect" -->
    <yt-table
      title="用户列表"
      :table-data="dataList"
      :table-count="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <template #headerHandler>
        <el-button v-if="isCreate" @click="handleCreate">新建用户</el-button>
      </template>

      <template #status="scope">
        <el-button
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createAt="scope">
        <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="scope">
        <strong>{{ $filters.formatTime(scope.row.updateAt) }}</strong>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            v-if="isUpdate"
            icon="el-icon-edit"
            size="mini"
            type="text"
            @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            icon="el-icon-delete"
            size="mini"
            type="text"
            @click="handleRemove(scope.row)"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 第一层slot从yt-table组件传过来 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <!-- 第二层slot传到对应的管理页面上去 -->
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </yt-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from 'vuex'

import YtTable from '@/base-ui/table'
import { usePermission } from '@/hooks/pagePermissionHook'
export default defineComponent({
  components: {
    YtTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      default: () => {
        return {}
      }
    },
    pageName: {
      type: String,
      default: 'users'
    }
  },
  emits: ['edit', 'create'],
  setup(props, { emit }) {
    const store = useStore()

    // 0.获取操作的权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // 1、双向绑定page信息
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => {
      getData()
    })

    // 2、发送网络请求
    const getData = (queryInfo: any = {}): void => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        // pageUrl: '/users/list',
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }

    getData()

    // 3、从vuex中取值
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )

    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    // const handleSelect = (select: any) => {}
    // 4、获取其他的动态插槽
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )

    // 5.删除、编辑、新增操作
    const handleRemove = (item: any) => {
      store.dispatch('system/removePageListAction', {
        pageName: props.pageName,
        id: item.id
      })
    }

    const handleCreate = () => {
      emit('create')
    }

    const handleEdit = (item: any) => {
      emit('edit', item)
    }

    return {
      // handleSelect,
      dataList,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleRemove,
      handleCreate,
      handleEdit,
      getData
    }
  }
})
</script>

<style scoped></style>
