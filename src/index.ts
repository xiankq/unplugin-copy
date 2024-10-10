import type { UnpluginFactory } from 'unplugin'
import type { UnpluginCopyOptions } from './types'
import { createUnplugin } from 'unplugin'
import { buildFactory } from './core/buildFactory'
import { viteServeFactory } from './core/viteServeFactory'

export const unpluginFactory: UnpluginFactory<UnpluginCopyOptions, true> = (options, meta) => {
  
  return [
    viteServeFactory(options, meta),
    buildFactory(options, meta),
  ]
}
export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
