import { addVitePlugin, addWebpackPlugin, defineNuxtModule } from '@nuxt/kit'
import vite from './vite'
import webpack from './webpack'
import type { UnpluginCopyOptions } from './types'
import '@nuxt/schema'

export interface ModuleOptions extends UnpluginCopyOptions {

}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-unplugin-copy',
    configKey: 'unpluginCopy',
  },
  defaults: {
    targets: [],
  },
  setup(options, _nuxt) {
    addVitePlugin(() => vite(options))
    addWebpackPlugin(() => webpack(options))
  },
})
