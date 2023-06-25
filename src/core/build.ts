import fs from 'node:fs/promises'
import { createUnplugin } from 'unplugin'
import type { UnpluginCopyOptions } from '../types'
import { resolveCopyTarget } from './resolve'

export default createUnplugin<UnpluginCopyOptions>((options, meta) => {
  let isViteBuild = false

  return {
    name: 'unplugin-copy:build',
    vite: {
      configResolved(config) {
        isViteBuild = config.command === 'build'
      },
    },
    async buildEnd() {
      if (meta.framework !== 'vite' || isViteBuild) {
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
      }
    },

  }
})
