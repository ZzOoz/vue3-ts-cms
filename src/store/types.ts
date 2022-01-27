import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'
import { IDashboardState } from './main/analysis/types'
// import {} from '.'

export interface IRootState {
  name: string
  age: number
  entireDepartment: any[] // 部门数据
  entireRole: any[] // 角色数据
  entireMenus: any[]
}

// 通过这个接口和RootState接口合并
export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  dashboard: IDashboardState
}

export type IStoreType = IRootState & IRootWithModule
