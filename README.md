# unplugin-copy

[![NPM version](https://img.shields.io/npm/v/unplugin-copy?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-copy)

copy template for [unplugin](https://github.com/unjs/unplugin).

## Template Usage

To use this template, clone it down using:
 
And do a global replace of `unplugin-copy` with your plugin name.

Then you can start developing your unplugin 🔥

To test your plugin, run: `pnpm run dev`
To release a new version, run: `pnpm run release`

## Install

```bash
npm i unplugin-copy
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import copy from 'unplugin-copy/vite'

export default defineConfig({
  plugins: [
    copy({
      src: './node_modules/vue/dist/*',
      dest: 'vue'
    }),
  ],
})
```

Example: [`example/`](./example/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import copy from 'unplugin-copy/rollup'

export default {
  plugins: [
    copy({
      src: './node_modules/vue/dist/*',
      dest: 'vue'
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
    copy({
      src: './node_modules/vue/dist/*',
      dest: 'vue'
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
      src: './node_modules/vue/dist/*',
      dest: 'vue'
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
      require('unplugin-copy/webpack')(
        {
          src: './node_modules/vue/dist/*',
          dest: 'vue'
        },
      ),
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
import copy from 'unplugin-copy/esbuild'

build({
  plugins: [
    copy({
      src: './node_modules/vue/dist/*',
      dest: 'vue'
    }),
  ],
})
```

<br></details>
