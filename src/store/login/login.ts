import { Module } from 'vuex'
import router from '@/router'
import { ILoginState } from './types'
import { IRootState } from '../types'
import {
  accountLoginRequest,
  userInfoRequest,
  userMenuRequest
} from '@/service/login/index'
import { IAccount } from '@/service/login/types'
import localCache from '@/utils/cache'
import { mapMenuToRoutes, pathMapToPermission } from '@/utils/map-menu'
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: {},
      permission: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenu(state, userMenus: any) {
      state.userMenus = userMenus

      // 根据后台返回的用户菜单生成动态路由
      const routes = mapMenuToRoutes(userMenus)

      // 给main路由的子级添加路由
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 获取所有权限
      const permission: string[] = pathMapToPermission(userMenus)
      state.permission = permission
    }
  },
  actions: {
    async accountLogin({ commit, dispatch }, payload: IAccount) {
      // 1、登陆逻辑实现
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 2、获取用户信息
      const userInfoResult = await userInfoRequest(id)
      commit('changeUserInfo', userInfoResult.data)
      localCache.setCache('userInfo', userInfoResult.data)

      // 3、查询用户菜单树
      const userMenuResult = await userMenuRequest(id)
      console.log(userMenuResult, 'userMenuResult')
      commit('changeUserMenu', userMenuResult.data)
      localCache.setCache('userMenus', userMenuResult?.data)

      // 4.跳转首页
      router.push('/main')

      dispatch('getInitialDataAction', null, { root: true })
    },
    phoneLogin({ commit }, payload: any) {
      console.log('手机登陆', payload)
    },
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      console.log(userMenus, 'menus')

      if (token) {
        commit('changeToken', token)
      }
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      if (userMenus) {
        commit('changeUserMenu', userMenus)
      }

      dispatch('getInitialDataAction', null, { root: true })
    }
  }
}

export default loginModule
