import { defineConfig } from 'vite'
import Unplugin from '../../src/vite'

export default defineConfig({
  plugins: [
    Unplugin({
      targets: [
        {
          src: './node_modules/cesium/Build/Cesium/**',
          dest: './cesium',
        },
      ],
    }),
  ],
})
