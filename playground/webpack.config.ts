import HtmlWebpackPlugin from 'html-webpack-plugin'
import type { Configuration } from 'webpack-dev-server'
import unpluginCopy from '../src/webpack'

export default <Configuration> {
  mode: 'development',
  entry: './main.ts',
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.webpack.html',
    }),
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
}
