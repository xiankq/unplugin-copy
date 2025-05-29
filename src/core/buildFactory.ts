import type { UnpluginFactory } from 'unplugin'
import type { UnpluginCopyOptions } from '../types'
import fs from 'fs-extra'
import { resolveCopyTarget } from './resolve'

const PLUGIN_NAME = 'unplugin-copy:build'
export const buildFactory: UnpluginFactory<UnpluginCopyOptions, false> = (options, _meta) => {
  let called = false
  return {
    name: PLUGIN_NAME,
    vite: {
      apply: 'build',
    },
    async buildEnd() {
      if (called) {
        return
      }
      called = true
      const results = await resolveCopyTarget(options.targets)
      const resolves = results.map(e => e.resolves).flat()
      const promises = resolves.map(async (resolve) => {
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
