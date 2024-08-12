import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import { buildPlugin } from './core/buildPlugin'
import { viteServePlugin } from './core/viteServePlugin'

export interface Target {
  src: string | string[]
  dest: string
}

export interface UnpluginCopyOptions {
  targets: Target[]
}

export const unpluginFactory: UnpluginFactory<UnpluginCopyOptions> = (options, meta) => {
  return [
    viteServePlugin(options, meta),
    buildPlugin(options, meta),
  ]
}
export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
