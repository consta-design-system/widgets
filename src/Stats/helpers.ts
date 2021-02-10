import { FormatValue } from '@/__private__/types'
import { NARROW_NO_BREAK_SPACE } from '@/__private__/utils/symbols'

export const defaultValueFormatter: FormatValue = value => {
  return String(value).replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${NARROW_NO_BREAK_SPACE}`)
}
