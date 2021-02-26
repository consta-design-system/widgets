import { DECIMAL_SEPARATOR, NARROW_NO_BREAK_SPACE } from './symbols'

export const numberFormatter = (value: string | number) => {
  return String(value)
    .replace(/(\d)(?=(\d{3})+\b)(?<!\.\d+)/g, `$1${NARROW_NO_BREAK_SPACE}`)
    .replace(/(?<=\d+)\.(?=\d+)/g, DECIMAL_SEPARATOR)
}
