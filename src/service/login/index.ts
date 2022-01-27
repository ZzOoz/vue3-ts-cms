import { requestInstance } from '../index'
import { IAccount, IAccountResult } from './types'
import { IDataType } from '../type'
enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // 用法: /users/1
  UserMenus = '/role/' // 用法: role/1/menu
}

// 账号用户登陆
export function accountLoginRequest(
  account: IAccount
): Promise<IDataType<IAccountResult>> {
  return requestInstance.post<IDataType<IAccountResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

// 查询用户信息
export function userInfoRequest(id: number): Promise<IDataType<any>> {
  return requestInstance.get<IDataType<any>>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

// 查询用户菜单树
export function userMenuRequest(id: number): Promise<IDataType<any>> {
  return requestInstance.get<IDataType<any>>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
