<template>
  <div class="yt">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="headerHandler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="checkOption"
        type="selection"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column
        v-if="indexOption"
        type="index"
        align="center"
        label="序号"
        width="100"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column
          align="center"
          :prop="propItem.prop"
          :label="propItem.label"
          :width="propItem.width"
        >
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          v-model:currentPage="currentPage4"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '用户列表'
    },
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableCount: {
      type: Number,
      default: 0
    },
    propList: {
      type: Array as PropType<any>,
      default: () => {
        return []
      }
    },
    indexOption: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    checkOption: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    page: {
      type: Object,
      default: () => {
        return {
          currentPage: 0,
          pageSize: 10
        }
      }
    },
    childrenProps: {
      type: Object,
      default: () => {
        return {}
      }
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['handleSelect', 'update:page'],
  setup(props, { emit }) {
    const handleSelectionChange = (select: any) => {
      emit('handleSelect', select)
    }

    const handleSizeChange = (pageSize: number) => {
      // pageInfo.value.pageSize = pageSize
      emit('update:page', { ...props.page, pageSize })
    }

    const handleCurrentChange = (currentPage: number) => {
      // pageInfo.value.currentPage = currentPage
      emit('update:page', { ...props.page, currentPage })
    }

    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
// .yt-form {
//   padding-top: 22px;
// }

.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;
  background: white;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
