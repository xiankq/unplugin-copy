import type { UnpluginCopyOptions } from './types'

import { unplugin } from '.'

export default (options: UnpluginCopyOptions) => ({
  name: 'unplugin-copy',
  hooks: {
    'astro:config:setup': async (astro: any) => {
      astro.config.vite.plugins ||= []
      astro.config.vite.plugins.push(unplugin.vite(options))
    },
  },
})
