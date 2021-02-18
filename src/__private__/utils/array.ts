import { chunk } from 'lodash'

export function getEveryN<T>(items: readonly T[], n: number) {
  if (n === 1) {
    return items
  }

  return chunk(items, n).map(([element]) => element)
}
