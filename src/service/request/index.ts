import axios from 'axios'
import { ElLoading } from 'element-plus'
import 'element-plus/theme-chalk/el-loading.css'
// import type { I } from 'element-plus'
import type { AxiosInstance } from 'axios'
import type { YTInterceptorConfig, YTRequestConfig } from '../type'

const DEFAULT_LOADING = true

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL

class YTRequest {
  instance: AxiosInstance
  interceptor?: YTInterceptorConfig
  showLoading: boolean
  loading?: any

  constructor(config: YTRequestConfig) {
    this.instance = axios.create(config)
    this.interceptor = config.interceptor
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    this.instance.interceptors.request.use(
      this.interceptor?.requestInterceptor,
      this.interceptor?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptor?.responseInterceptor,
      this.interceptor?.responseInterceptorCatch
    )

    // 所有实例的拦截器（执行顺序是从下到上 下面的先执行）
    this.instance.interceptors.request.use(
      (config: YTRequestConfig) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '数据加载中....',
            background: 'rgba(0,0,0,0.5)',
            fullscreen: true
          })
          // console.log(this.loading, 'loading')
        }
        // console.log('所有实例的请求拦截')
        return config
      },
      (err) => {
        // console.log('所有请求的实例失败请求拦截')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        setTimeout(() => {
          // console.log(this.loading, 'loading')
          this.loading?.close()
        })
        // console.log('所有实例的响应拦截')
        return res.data
      },
      (err) => {
        // console.log('所有请求的实例失败响应拦截')
        return err
      }
    )
  }

  request<T>(config: YTRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.showLoading === false) {
        this.showLoading = config.showLoading || false
      }

      // 如果有拦截器 将请求拦截器执行后的config返回
      if (config.interceptor?.requestInterceptor) {
        config = config.interceptor.requestInterceptor(config)
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 如果有拦截器 将响应拦截器执行后的res返回
          if (config.interceptor?.responseInterceptor) {
            res = config.interceptor.responseInterceptor(res)
          }

          this.showLoading = DEFAULT_LOADING
          console.log(res)
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
        })
    })
  }

  get<T>(config: YTRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: YTRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  put<T>(config: YTRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }

  delete<T>(config: YTRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: YTRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default YTRequest
