import type { App } from 'vue'
import { formatUtcString } from '@/utils/date-format'

export function registerProperties(app: App): any {
  app.config.globalProperties.$filters = {
    formatTime: (value: string) => {
      return formatUtcString(value)
    }
  }
}
