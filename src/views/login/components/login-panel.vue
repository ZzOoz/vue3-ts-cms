<template>
  <div class="login-panel">
    <h1 class="title">后台登陆系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane label="账号登陆" name="account">
        <loginAccount ref="accountRef"></loginAccount>
      </el-tab-pane>
      <el-tab-pane label="手机登陆" name="phone">
        <loginPhone ref="phoneRef"></loginPhone>
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import loginAccount from './login-account.vue'
import loginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    loginAccount,
    loginPhone
  },
  setup() {
    // 判断是否记住密码
    const isKeepPassword = ref(false)
    // 根据loginAccount类型添加accountRef的类型
    const accountRef = ref<InstanceType<typeof loginAccount>>()
    const phoneRef = ref<InstanceType<typeof loginPhone>>()
    // tab标签
    const currentTab = ref('account')

    // 点击登陆
    const handleLoginClick = () => {
      console.log('点击登陆')
      if (currentTab.value === 'account') {
        accountRef.value?.loginAccount(isKeepPassword.value)
      } else {
        phoneRef.value?.loginPhone()
      }
    }

    return {
      isKeepPassword,
      accountRef,
      phoneRef,
      currentTab,
      handleLoginClick
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;

  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}

.title {
  text-align: center;
}
</style>
