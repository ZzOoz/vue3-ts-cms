import { createApp } from 'vue'
import App from './App.vue'
// import ElementPlus from 'element-plus' // 全局引入
// import 'element-plus/dist/index.css' // 引入样式
import { registerApp } from './global/register'
import router from './router'
import store from './store'
import 'normalize.css'
import '@/assets/css/index.less'
import { setupStore } from './store'
// import { requestInstance } from './service'

// console.log(process.env)
// console.log(process.env.VUE_APP_BASE_NAME)

const app = createApp(App)
app.use(registerApp)
// 先添加动态路由映射关系
setupStore()
// 在注册路由
app.use(router)
app.use(store)

app.mount('#app')
