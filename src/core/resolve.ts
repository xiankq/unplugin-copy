import path from 'node:path'
import process from 'node:process'
import FastGlob from 'fast-glob'
import type { Target } from '../'

function removeRepeat<T>(list: T[]): T[] {
  return [...new Set(list)]
}

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
