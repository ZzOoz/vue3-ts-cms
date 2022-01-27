import { requestInstance } from '@/service/index'

enum DashboardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}

export function getCategoryGoodsCount(): any {
  return requestInstance.get({
    url: DashboardAPI.categoryGoodsCount
  })
}

export function getCategoryGoodsSale(): any {
  return requestInstance.get({
    url: DashboardAPI.categoryGoodsSale
  })
}

export function getCategoryGoodsFavor(): any {
  return requestInstance.get({
    url: DashboardAPI.categoryGoodsFavor
  })
}

export function getAddressGoodsSale(): any {
  return requestInstance.get({
    url: DashboardAPI.addressGoodsSale
  })
}
