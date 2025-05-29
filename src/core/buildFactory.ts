import type { UnpluginFactory } from 'unplugin'
import type { UnpluginCopyOptions } from '../types'
import path from 'node:path/posix'
import fs from 'fs-extra'
import { resolveCopyTarget } from './resolve'
import { normalizePosixPath } from './utils'

const PLUGIN_NAME = 'unplugin-copy:build'
export const buildFactory: UnpluginFactory<UnpluginCopyOptions, false> = (options, _meta) => {
  let called = false
  let outputPath = ''
  return {
    name: 'unplugin-copy:build',
    vite: {
      apply: 'build',
      configResolved(config) {
        outputPath = config.build.outDir
      },
    },
    farm: {
      configResolved(config) {
        outputPath = config.compilation?.output?.path || outputPath
      },
    },
    // In the Rollup configuration, output.dir is used to store chunk, which is not the actual outDir. It can be directly output in the root directory.
    rollup: {},
    rolldown: {},
    esbuild: {
      setup(build) {
        const { outdir } = build.initialOptions
        outputPath = outdir || outputPath
      },
    },
    webpack(compiler) {
      compiler.hooks.emit.tap(PLUGIN_NAME, () => {
        outputPath = compiler.options.output.path || outputPath
      })
    },
    rspack(compiler) {
      compiler.hooks.emit.tap(PLUGIN_NAME, () => {
        outputPath = compiler.options.output.path || outputPath
      })
    },

    async buildEnd() {
      if (called) {
        return
      }
      called = true
      const _outputPath = path.resolve(outputPath)
      const results = await resolveCopyTarget(options.targets)
      const resolves = results.map(e => e.resolves).flat()
      const promises = resolves.map(async (resolve) => {
        const dest = normalizePosixPath(path.join(_outputPath, resolve.dest))
        await fs.copy(resolve.src, dest)
        this.emitFile({
          type: 'asset',
          fileName: resolve.dest,
          source: await fs.readFile(resolve.src),
        })
      })
      await Promise.all(promises)
    },
  }
}
