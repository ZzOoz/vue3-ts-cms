import { useStore } from '@/store'

export function usePermission(pageName: string, hanldeName: string): any {
  const store = useStore()
  const permissions = store.state.login.permission
  const verifyPermission = `system:${pageName}:${hanldeName}`

  // name = "coderwhy"
  // !name -> false
  // !!name -> true
  return !!permissions.find((item: any) => item === verifyPermission)
}
