import { defineConfig } from 'vite'
import unpluginCopy from '../src/vite'

export default defineConfig({
  base: '/copy/',
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
