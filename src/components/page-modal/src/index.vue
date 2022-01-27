<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      title="Warning"
      width="30%"
      center
      destroy-on-close
    >
      <yt-form v-bind="modalConfig" v-model="formData"></yt-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import YtForm from '@/base-ui/form'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    YtForm
  },
  props: {
    modalConfig: {
      type: Object,
      default: () => {
        return {}
      }
    },
    defaultInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    pageName: {
      type: String,
      default: () => {
        return 'users'
      }
    },
    // 其他需要新增、编辑需要传到的数据
    otherInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {
    const dialogVisible = ref(false)

    const formData: any = ref({})

    watch(
      () => props.defaultInfo,
      (newValue) => {
        console.log(props.defaultInfo, 'defaultInfo')
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      },
      {
        deep: true
      }
    )

    const handleCancel = () => {
      dialogVisible.value = false
    }

    const store = useStore()
    const handleConfirm = () => {
      dialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        console.log(props.defaultInfo, 'defaultInfo')
        store.dispatch('system/editPageListAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // 创建
        store.dispatch('system/createPageListAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }

    return {
      dialogVisible,
      formData,
      handleCancel,
      handleConfirm
    }
  }
})
</script>

<style scoped lang="less"></style>
