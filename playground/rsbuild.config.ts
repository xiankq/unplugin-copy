import { defineConfig } from '@rsbuild/core'
import unpluginCopy from '../src/rspack'

export default defineConfig({
  html: {
    template: './index.html',
  },
  dev: {
    assetPrefix: '/copy/static/',
  },
  server: {
    base: '/copy',
  },
  source: {
    entry: {
      index: '/main.ts',
    },
  },
  output: {
    distPath: {
      root: './dist/rsbuild',
    },
  },
  tools: {
    rspack: {
      plugins: [
        unpluginCopy({
          targets: [
            // http://localhost:5173/vue/index.js => node_modules/vue/index.js
            {
              src: 'node_modules/vue/**',
              dest: 'vue',
            },
          ],
        }),
      ],
    },
  },
})
