import path from 'node:path'
import type { UnpluginFactory } from 'unplugin'
import serveStatic from 'serve-static'
import type { UnpluginCopyOptions } from '../types'
import { resolveCopyTarget } from './resolve'

export const viteServePlugin: UnpluginFactory<UnpluginCopyOptions, false> = (options, _meta) => {
  return {
    name: 'unplugin-copy:vite-serve',
    vite: {
      async configureServer(server) {
        const results = await resolveCopyTarget(options.targets)
        results.forEach((result) => {
          const route = path.join('/', result.destDir).replaceAll('\\', '/')
          server.middlewares.use(route, serveStatic((result.srcDir)))
        })
      },
    },
  }
}
