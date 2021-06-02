export const chunk = <T>(items: readonly T[], chunkSize: number = 1) => {
  const newItems = [...items]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cache: any[] = []

  if (chunkSize <= 0) {
    return cache
  }

  while (newItems.length) {
    // eslint-disable-next-line @typescript-eslint/tslint/config
    cache.push(newItems.splice(0, chunkSize))
  }

  return cache
}

export function getEveryN<T>(items: readonly T[], n: number) {
  if (n === 1) {
    return items
  }

  return chunk(items, n).map(([element]) => element)
}

export const uniq = <T>(items: readonly T[]) => {
  return [...new Set(items)]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const uniqBy = <T>(items: readonly T[], predicate: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cb = typeof predicate === 'function' ? predicate : (o: any) => o[predicate]

  return [
    ...items
      .reduce((map, item) => {
        const key = item === null || item === undefined ? item : cb(item)

        map.has(key) || map.set(key, item)

        return map
      }, new Map())
      .values(),
  ]
}

export const flatten = <T>(items: readonly T[]) => {
  return items.flat()
}

export const sum = (items: readonly number[]) => {
  return items.reduce((acc, num) => {
    acc += num

    return acc
  }, 0)
}
