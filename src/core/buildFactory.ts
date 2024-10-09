import type { UnpluginFactory } from 'unplugin'
import type { UnpluginCopyOptions } from '../types'
import fs from 'node:fs/promises'
import { resolveCopyTarget } from './resolve'

export const buildFactory: UnpluginFactory<UnpluginCopyOptions, false> = (options, _meta) => {
  return {
    name: 'unplugin-copy:build',
    vite: {
      apply: 'build',
    },
    async buildEnd() {
      const results = await resolveCopyTarget(options.targets)
      const resolves = results.map(e => e.resolves).flat()
      const promises = resolves.map(async (resolve) => {
        const source = await fs.readFile(resolve.src)
        this.emitFile({
          type: 'asset',
          fileName: resolve.dest,
          source,
        })
      })
      await Promise.all(promises)
    },
  }
}
