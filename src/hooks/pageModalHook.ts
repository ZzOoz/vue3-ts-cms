import { ref } from 'vue'
import pageModal from '@/components/page-modal'

type callBackFn = (item?: any) => void

export function pageModalHook(
  createCb?: callBackFn,
  editCb?: callBackFn
): any[] {
  const pageModalRef = ref<InstanceType<typeof pageModal>>()
  const defaultInfo = ref({})
  const handleCreate = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    createCb && createCb()
  }

  const handleEdit = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      console.log(defaultInfo.value, 'value')
      pageModalRef.value.dialogVisible = true
    }
    editCb && editCb(item)
  }

  return [pageModalRef, defaultInfo, handleCreate, handleEdit]
}
