import type { Target } from '../types'
import path from 'node:path/posix'
import process from 'node:process'
import FastGlob from 'fast-glob'
import { isFunction, normalizePosixPath } from './utils'

function removeRepeat<T>(list: T[]): T[] {
  return [...new Set(list)]
}

/**
 * 解析复制目标
 *
 * @param targets 目标数组
 * @returns Promise 对象，包含所有目标的解析结果
 */
export function resolveCopyTarget(targets: Target[]) {
  const root = process.cwd()

  const promises = targets.map(async (target) => {
    const dest = normalizePosixPath(target.dest)

    const globs = await FastGlob(target.src, {
      dot: true,
      cwd: root,
    })

    const dirPaths = removeRepeat(globs.map(path.dirname))

    let srcDir = ''
    dirPaths.forEach((dirPath) => {
      if (srcDir === '' || !dirPath.includes(srcDir)) {
        srcDir = dirPath
      }
    })
    const resolves = globs.map((filePath) => {
      filePath = normalizePosixPath(filePath)
      const flatten = isFunction(target.flatten) ? !!target.flatten(filePath) : !!target.flatten

      const destPath = normalizePosixPath(
        flatten
          ? path.join(dest, path.basename(filePath))
          : path.join(filePath.replace(srcDir, dest)),
      )

      const rename = isFunction(target.rename) ? target.rename(filePath, destPath) : target.rename
      return {
        src: filePath,
        dest: rename ? `${rename}` : destPath,
      }
    })

    return {
      resolves,
      srcDir,
      destDir: dest,
    }
  })

  return Promise.all(promises)
}
