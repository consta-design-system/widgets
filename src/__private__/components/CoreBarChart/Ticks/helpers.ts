/* istanbul ignore file */

import { TextPropAlign } from '@consta/uikit/Text'

export const SLANTED_TEXT_MAX_LENGTH = 20

export const getTransformTranslate = (x: number, y: number) => `translate(${x}px,${y}px)`

export const cropText = (text: string, maxSymbols: number) => {
  if (text.length <= maxSymbols) {
    return text
  }

  return `${text.slice(0, maxSymbols)}…`
}

type GetTextAlignParams = {
  isXAxisLabelsSlanted?: boolean
  isHorizontal?: boolean
}

export const getTextAlign = ({
  isXAxisLabelsSlanted,
  isHorizontal,
}: GetTextAlignParams): TextPropAlign | undefined => {
  if (isXAxisLabelsSlanted) {
    return 'right'
  }
  if (isHorizontal) {
    return 'center'
  }

  return undefined
}
