import type { App } from 'vue'
import 'element-plus/theme-chalk/base.css'
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElIcon,
  ElInput,
  ElLink,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubMenu,
  ElTabPane,
  ElTabs,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElCheckbox,
  ElImage,
  ElTree
} from 'element-plus'
const components = [
  ElButton,
  ElForm,
  ElInput,
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubMenu,
  ElIcon,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElImage,
  ElTree
]

export function registerElement(app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
