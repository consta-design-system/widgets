import { text } from '@storybook/addon-knobs'

export const cubeMeterFormatValue = (v: number) => {
  return `${v}${text('unit', ' тыс м3')}`
}

export const percentFormatValue = (v: number) => {
  return `${v}${text('unit', '%')}`
}

export const emptyFormatValue = (v: number) => {
  return `${v}${text('unit', '')}`
}
