import YTRequest from './request'
import localCache from '@/utils/cache'
import { AxiosRequestConfig } from 'axios'
const requestInstance = new YTRequest({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: process.env.VUE_APP_TIME_OUT,
  interceptor: {
    requestInterceptor: (config: AxiosRequestConfig) => {
      const token = localCache.getCache('token')
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('请求失败拦截')
      return err
    },
    responseInterceptor: (response) => {
      console.log('响应拦截')
      return response
    },
    responseInterceptorCatch: (err) => {
      console.log('响应失败拦截')
      return err
    }
  }
})
console.log(process.env.VUE_APP_BASE_URL, 'request')
export { requestInstance }
