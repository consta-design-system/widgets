import { DECIMAL_SEPARATOR, NARROW_NO_BREAK_SPACE } from './symbols'

export const numberFormatter = (value: string | number) => {
  return String(value)
    .split(' ')
    .map(word => {
      if (/(?=.\d)\.(?=\d+$)/g.test(word) && word.split('.').length === 2) {
        const [integer, decimal] = word.split('.')
        return (
          integer.replace(/(\d)(?=(\d{3})+\b)(?!\.\d+)/g, `$1${NARROW_NO_BREAK_SPACE}`) +
          DECIMAL_SEPARATOR +
          decimal
        )
      }

      if (/\d/.test(word)) {
        return word.replace(/(\d)(?=(\d{3})+\b)(?!\.\d+)/g, `$1${NARROW_NO_BREAK_SPACE}`)
      }

      return word
    })
    .join(' ')
}
