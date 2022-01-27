import { AxiosRequestConfig, AxiosResponse } from 'axios'

// 生成拦截器函数接口
export interface YTInterceptorConfig<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (response: T) => T
  responseInterceptorCatch?: (err: any) => any
}

// 将AxiosRequestConfig并且新增interceptor属性 给每个axios实例添加可控的拦截器
export interface YTRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptor?: YTInterceptorConfig<T> // 拦截器
  showLoading?: boolean // 显示loading弹窗
}

// 数据返回类型
export interface IDataType<T = any> {
  code: number
  data: T
}
