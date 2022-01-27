import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DEFAULT_FORMAL = 'YYYY-MM-DD hh:mm:ss'

export function formatUtcString(
  utcString: string,
  format: string = DEFAULT_FORMAL
): string {
  return dayjs.utc(utcString).utcOffset(8).format(format)
}
