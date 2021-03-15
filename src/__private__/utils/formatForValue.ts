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

const conversionExponential = (value: string) => {
  const data = String(value).split(/[eE]/)
  if (data.length === 1) {
    return data[0]
  }

  let z = ''
  const sign = Number(value) < 0 ? '-' : ''
  const str = data[0].replace('.', '')
  let mag = Number(data[1]) + 1

  if (mag < 0) {
    z = sign + '0.'
    while (mag++) {
      z += '0'
    }
    return z + str.replace(/^\-/, '')
  }
  mag -= str.length
  while (mag--) {
    z += '0'
  }
  return str + z
}

export const formatForValue = (value: string) => {
  if (value.indexOf('e') > 0) {
    const conversionValue = conversionExponential(value)
    const format = formatDash(formatSpace(conversionValue))
    const newValue = format.slice(0, 19) + '...'

    return newValue
  } else if (value.indexOf('e') === -1 && value.split('').length > 19) {
    const format = formatDash(formatSpace(value))
    const newValue = format.slice(0, 19) + '...'

    return newValue
  } else {
    return formatDash(formatSpace(value))
  }
}
