const formatDash = (value: string) => {
  return value
    .split('')
    .map((elem: string) => (elem === '-' ? '−' : elem))
    .join('')
}

const formatSpace = (value: string) => {
  if (value.indexOf('.') > 0 || value.indexOf(',') > 0) {
    const newValue = value.split('.' || ',')
    return (
      newValue[0].replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') +
      ',' +
      newValue[1].replace(/(\d{3})(?=(\d)+(\D|$))/g, '$1 ')
    )
  } else {
    return value.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
  }
}

export const formatForValue = (value: string) => {
  if (value.split('').length > 22) {
    const format = formatDash(formatSpace(value))
    const newValue = format.slice(0, 22) + '...'
    return newValue
  } else {
    return formatDash(formatSpace(value))
  }
}
