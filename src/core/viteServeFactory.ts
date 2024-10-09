import type { UnpluginFactory } from 'unplugin'
import type { UnpluginCopyOptions } from '../types'
import path from 'node:path'
import serveStatic from 'serve-static'
import { resolveCopyTarget } from './resolve'

export const viteServeFactory: UnpluginFactory<UnpluginCopyOptions, false> = (options, _meta) => {
  return {
    name: 'unplugin-copy:vite-serve',
    vite: {
      async configureServer(server) {
        const results = await resolveCopyTarget(options.targets)
        results.forEach((result) => {
          const route = path.join('/', result.destDir).replaceAll('\\', '/')
          server.middlewares.use(route, serveStatic(result.srcDir))
        })
      },
    },
  }
}
