import { formatForValue } from './formatForValue'

export const formatForArray = (valueArray: number[]) => {
  let num: number

  valueArray.map((data: number, index) => {
    if (data.toString().indexOf('.') > 0) {
      num = valueArray[index].toString().split('.')[1].length
      return num
    }
  })

  return valueArray.map((data: number) =>
    formatForValue(
      Number(data)
        .toFixed(num)
        .toString()
    )
  )
}
