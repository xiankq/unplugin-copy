import path from 'node:path'
import { createUnplugin } from 'unplugin'
import serveStatic from 'serve-static'
import type { UnpluginCopyOptions } from '../types'
import { resolveCopyTarget } from './resolve'

export default createUnplugin<UnpluginCopyOptions>((options) => {
  return {
    enforce: 'pre',
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
})
