import type { Target } from '../types'
import path from 'node:path'
import process from 'node:process'
import FastGlob from 'fast-glob'

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
    const dest = path.posix.normalize(target.dest)
    const globs = await FastGlob(target.src, {
      dot: true,
      cwd: root,
    })

    const dirPaths = removeRepeat(globs.map(path.posix.dirname))

    let srcDir = ''
    dirPaths.forEach((dirPath) => {
      if (srcDir === '' || !dirPath.includes(srcDir))
        srcDir = dirPath
    })
    const resolves = globs.map((src) => {
      return {
        src: path.normalize(src),
        dest: path.normalize(src.replace(srcDir, dest)),
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
