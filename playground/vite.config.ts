import { defineConfig } from 'vite'
import unpluginCopy from 'unplugin-copy/vite'

export default defineConfig({
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
})
