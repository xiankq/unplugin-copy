import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import unpluginCopy from '../src/vite'

export default defineConfig({
  define: {
    CESIUM_BASE_URL: JSON.stringify('./Cesium/'),
  },
  plugins: [
    Inspect(),
    unpluginCopy({
      targets: [
        {
          src: 'node_modules/cesium/Build/Cesium/Workers/**',
          dest: 'cesium/Workers',
        },
        {
          src: 'node_modules/cesium/Build/Cesium/ThirdParty/**',
          dest: 'cesium/ThirdParty',
        },
        {
          src: 'node_modules/cesium/Build/Cesium/Assets/**',
          dest: 'cesium/Assets',
        },
        {
          src: 'node_modules/cesium/Build/Cesium/Widgets/**',
          dest: 'cesium/Widgets',
        },

      ],
    }),
  ],
})
