<template>
  <div class="login-account">
    <el-form label-width="20" :model="account" :rules="rules" ref="formRef">
      <el-form-item prop="name" label="账号">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="account.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'
import { rules } from '../config/account-config'
import localCache from '@/utils/cache'
export default defineComponent({
  setup() {
    // vuex数据源
    const store = useStore()

    // 账号数据
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    // 表单ref
    const formRef = ref<InstanceType<typeof ElForm>>()

    // 账号登陆方法
    const loginAccount = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 1、判断是否需要记住密码

          if (isKeepPassword) {
            // 从缓存中读取
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          }

          // 2、进行登陆验证
          store.dispatch('login/accountLogin', { ...account })
        }
      })
    }

    return {
      account,
      rules,
      loginAccount,
      formRef
    }
  }
})
</script>

<style scoped></style>
