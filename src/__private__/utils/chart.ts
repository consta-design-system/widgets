import { isNotNil } from '@consta/widgets-utils/lib/type-guards'

import { FormatValue } from '@/__private__/types'

export const getFormattedValue = (v: number | null, formatter: FormatValue = String) => {
  if (!isNotNil(v)) {
    return 'Нет данных'
  }

  return formatter(v)
}
