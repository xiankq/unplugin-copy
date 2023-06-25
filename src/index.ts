import { createUnplugin } from 'unplugin'
import type { UnpluginCopyOptions } from './types'
import buildPlugin from './core/build'
import viteServePlugin from './core/serve'

export default createUnplugin<UnpluginCopyOptions>((options, meta) => {
  return [
    buildPlugin.raw(options, meta) as any,
    viteServePlugin.raw(options, meta) as any,
  ]
})
