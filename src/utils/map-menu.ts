import { IBreadcrumb } from '@/base-ui/breadcrumb'
import { RouteRecordRaw } from 'vue-router'

let firstMenu: any

export function mapMenuToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routesResult: RouteRecordRaw[] = []

  // 1、加载所有默认的routes
  const allRoutes: RouteRecordRaw[] = []
  // 在router/main文件夹中递归（true）查找以.ts文件结尾的文件
  // 第二个参数代表是否递归 ture反之false为不递归 旨在在这个目录寻找
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  // console.log(allRoutes, 'allRoutes')

  // 递归操作 只有type等于2的时候才会插入路由
  const _recurseGetRoute = (menus: any) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routesResult.push(route)
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routesResult
}

export function pathMapBreadcrumbs(userMenus: any[], currentPath: string): any {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToRoutes(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

// 通过当前路径找到路由
export function pathMapToRoutes(
  userMenus: any,
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const isResult = pathMapToRoutes(menu.children, currentPath)
      if (isResult) {
        // 上一级路由
        breadcrumbs?.push({ name: menu.name })
        // 二级路由
        breadcrumbs?.push({ name: isResult.name })
        return isResult
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

// 通过路径映射权限
export function pathMapToPermission(userMenus: any): any {
  const permission: string[] = []

  const _recurseGetPermission = (menus: any): void => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permission.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)

  return permission
}

// 递归寻找menu下的叶子节点
export function mapToLeafKey(userMenus: any): any {
  const leafKeys: number[] = []

  const _recurseGetLeafKey = (menus: any) => {
    for (const menu of menus) {
      if (menu.children) {
        _recurseGetLeafKey(menu.children)
      } else {
        leafKeys.push(menu.id)
      }
    }
  }

  _recurseGetLeafKey(userMenus)

  return leafKeys
}

export { firstMenu }
