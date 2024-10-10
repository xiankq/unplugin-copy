import path from 'node:path'

export type AnyFn = (...args: any[]) => any

export function normalizePosixPath(id: string): string {
  return path.posix.normalize(id.replace(/\\/g, '/'))
}

export function isFunction<T extends AnyFn>(val: any): val is T {
  return typeof val === 'function'
}
