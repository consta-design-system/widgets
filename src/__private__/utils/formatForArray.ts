import { formatForValue } from './formatForValue'

export const formatForArray = (valueArray: number[]) => {
  let num: number

  const newValueArray = valueArray.map((item: number) => formatForValue(String(item)))

  return newValueArray.map((item: string, index) => {
    if (item.indexOf(',') > 0) {
      num = newValueArray[index].split('.')[1].length
      return String(Number(item).toFixed(num))
    } else {
      return item
    }
  })
}
