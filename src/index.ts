import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import type { UnpluginCopyOptions } from './types'
import { buildPlugin } from './core/buildPlugin'
import { viteServePlugin } from './core/viteServePlugin'

export const unpluginFactory: UnpluginFactory<UnpluginCopyOptions> = (options, meta) => (
  [
    buildPlugin(options, meta),
    viteServePlugin(options, meta),
  ]
)

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)
