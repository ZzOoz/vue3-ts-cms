import {
  getPageListData,
  removePageListData,
  createPageListData,
  editPageListData
} from '@/service/main/system'
import { IRootState } from '@/store/types'
import { Module } from 'vuex'
import { ISystemState } from './types'
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  mutations: {
    changeUserList(state, usersList: any[]) {
      state.usersList = usersList
    },
    changeUserCount(state, usersCount: number) {
      state.usersCount = usersCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    }
  },
  actions: {
    // 获取数据操作
    async getPageListAction({ commit }, payload: any) {
      const pageUrl = `${payload.pageName}/list`
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      const { list, totalCount } = pageResult.data

      switch (payload.pageName) {
        case 'users':
          console.log('userCommit')
          commit('changeUserList', list)
          commit('changeUserCount', totalCount)
          break
        case 'role':
          commit('changeRoleList', list)
          commit('changeRoleCount', totalCount)
          break
        case 'goods':
          commit('changeGoodList', list)
          commit('changeGoodCount', totalCount)
          break
        case 'menu':
          commit('changeMenuList', list)
          commit('changeMenuCount', totalCount)
          break
        default:
          break
      }
    },

    // 删除操作
    async removePageListAction({ dispatch }, payload: any) {
      const { pageName, id } = payload
      const pageUrl = `${pageName}/${id}`
      // 删除操作
      await removePageListData(pageUrl)

      // // 重新请求列表
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    // 创建
    async createPageListAction({ dispatch }, payload: any) {
      const { pageName, newData } = payload
      const pageUrl = `${pageName}`
      await createPageListData(pageUrl, newData)

      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    // 编辑
    async editPageListAction({ dispatch }, payload: any) {
      const { pageName, editData, id } = payload
      const pageUrl = `${pageName}/${id}`
      await editPageListData(pageUrl, editData)

      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
