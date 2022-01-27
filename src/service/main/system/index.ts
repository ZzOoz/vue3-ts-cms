import { requestInstance } from '../../index'

import { IDataType } from '../../type'
import { IPageResult } from './types'

// 获取列表
export function getPageListData(
  url: string,
  queryInfo: any
): Promise<IDataType<IPageResult>> {
  return requestInstance.post<IDataType<IPageResult>>({
    url: url,
    data: queryInfo
  })
}

// 删除
export function removePageListData(url: string): Promise<IDataType> {
  return requestInstance.delete<IDataType>({
    url: url
  })
}

// 创建
export function createPageListData(
  url: string,
  newData: any
): Promise<IDataType> {
  return requestInstance.post<IDataType>({
    url: url,
    data: newData
  })
}

// 编辑
export function editPageListData(
  url: string,
  editData: any
): Promise<IDataType> {
  return requestInstance.patch<IDataType>({
    url: url,
    data: editData
  })
}
