import type { UnpluginFactory } from 'unplugin'
import type { UnpluginCopyOptions } from '../types'
import path from 'node:path/posix'
import serveStatic from 'serve-static'
import { resolveCopyTarget } from './resolve'
import { normalizePosixPath } from './utils'

export const viteServeFactory: UnpluginFactory<UnpluginCopyOptions, false> = (options, _meta) => {
  let base = '/'
  return {
    name: 'unplugin-copy:serve',
    vite: {
      apply: 'serve',
      configResolved(config) {
        base = normalizePosixPath(config.base || '/')
      },
      async configureServer(server) {
        const results = await resolveCopyTarget(options.targets)
        results.forEach((result) => {
          const route = path.join('/', base, result.destDir)
          server.middlewares.use(route, serveStatic(result.srcDir))
        })
      },
    },
  }
}
