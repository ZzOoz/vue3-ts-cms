<template>
  <div class="nav-header">
    <!-- <i
      class="fold-menu"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
    ></i> -->

    <div class="fold" @click="handleFoldClick">
      {{ isFold ? '收回' : '展开' }}
    </div>

    <div class="content">
      <yt-bread-crumb :breadcrumb="breadcrumb"></yt-bread-crumb>
      <user-info />
    </div>
    <!-- <el-icon color="#409EFC" v-if="!isFold" class="fold-menu" @click="handleFoldClick"
      ><expand
    /></el-icon> -->

    <!-- <el-icon v-if="!isFold" color="#409EFC" class="no-inherit">
      <share />
    </el-icon> -->

    <!-- <el-icon v-else-if="isFold" class="fold-menu" @click="handleFoldClick"
      ><fold
    /></el-icon> -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import userInfo from './userInfo.vue'
import YtBreadCrumb from '@/base-ui/breadcrumb'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menu'
export default defineComponent({
  components: {
    userInfo,
    YtBreadCrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)

    const breadcrumb = computed(() => {
      const userMenus = useStore().state.login.userMenus
      const currentPath = useRoute().path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })

    console.log(breadcrumb, 'breadCrumb')

    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    return {
      handleFoldClick,
      isFold,
      breadcrumb
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  width: 100%;
  display: flex;
  .fold {
    display: flex;
    align-items: center;
  }
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
