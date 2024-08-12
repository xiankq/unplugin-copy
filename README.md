# unplugin-copy

Replace variables in code with other values or expressions. Supports Vite, Rollup, Webpack, Rspack and more.

[![NPM version](https://img.shields.io/npm/v/unplugin-copy?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-copy)

##### NOTE

The original intention of this plugin is to provide compatibility for lower-level plugins. You should give priority to using the `copy` that comes with the build tool.

## Features

- Support Vite, Webpack, Vue CLI, Rollup, esbuild and more, powered by unplugin.
- In the Vite development environment, path mapping is used instead of real copying.

## Install

```bash
npm i unplugin-copy -D

pnpm i unplugin-copy -D

yarn i unplugin-copy -D
```

## Install

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
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
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import unpluginCopy from 'unplugin-copy/rollup'

export default {
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
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
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
  ]
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default {
  buildModules: [
    ['unplugin-copy/nuxt', {
      targets: [
        // http://localhost:5173/vue/index.js => node_modules/vue/index.js
        {
          src: 'node_modules/vue/**',
          dest: 'vue',
        },
      ],
    }],
  ],
}
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-copy/webpack')({
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
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import unpluginCopy from 'unplugin-copy/esbuild'

build({
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
```

<br></details>

The code idea comes from [vite-plugin-static-copy](https://github.com/sapphi-red/vite-plugin-static-copy).
