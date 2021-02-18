export const labelPositions = ['top', 'left'] as const
export type LabelPosition = typeof labelPositions[number]

export const labelSizes = ['xs', 's', 'm'] as const
export type LabelSize = typeof labelSizes[number]

export const labelTypes = ['dot', 'line', 'warning'] as const
export type LabelType = typeof labelTypes[number]

export const LABEL_DOT_SIZE = 12
