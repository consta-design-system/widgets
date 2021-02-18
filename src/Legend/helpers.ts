export const legendDirections = ['column', 'row'] as const
export type LegendDirection = typeof legendDirections[number]

export type LegendDataItem = {
  text: string
  color: string
}
