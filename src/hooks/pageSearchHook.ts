import { ref } from 'vue'
import pageContent from '@/components/page-content'

export const pageSearchHook = () => {
  const pageContentRef = ref<InstanceType<typeof pageContent>>()
  const userReset = () => {
    pageContentRef.value?.getData()
  }

  const userSearch = (formData: any) => {
    console.log(formData, '触发handleSearch')
    pageContentRef.value?.getData(formData)
  }

  return [pageContentRef, userReset, userSearch]
}
