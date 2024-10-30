---
title: 问题记录
pubDatetime: 2023-10-11 14:05:00
postSlug: problem
featured: false
draft: false
tags:
  - 遇到的问题
description: "遇到的问题记录"
---

## 目录

## echarts graph 关系图报错

<div class="red">
Cannot set properties of undefined (setting ‘dataIndex‘)
</div>

```js
links: [
  {
    source: 4,
    target: 3,
  },
];
```

改为

```js
links: [
  {
    source: "4",
    target: "3",
  },
];
```

## 在 React 中,useState 中的 setState 可能会出现延迟生效的情况,这通常是因为 React 的渲染周期和事件循环的运行周期不同步

当组件渲染时,React 会先执行 useState 中的 setState 操作,但是这个操作不会立即生效,而是会被延迟到下一个事件循环中执行.这是因为 React 的渲染周期是同步的,而事件循环是异步的,因此在事件循环中执行的 setState 操作可能会在下一个事件循环开始时生效.

为了避免这种情况,我们可以使用 useEffect 来处理 setState 的延迟生效问题.useEffect 会在组件渲染后执行传入的函数,通常用于处理副作用,如 setState 的副作用.

下面是一个简单的例子,展示了如何使用 useEffect 来确保 setState 的立即生效:

```jsx
import React, { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Count updated:", count);
  }, [count]);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default Example;
```

在这个例子中,我们使用 useEffect 来处理 setCount 的副作用,确保在每次 setCount 时都立即执行副作用函数 console.log.这样就可以避免 setCount 的延迟生效问题.

## react 源码本地 npm i 报错`...Command failed: autoreconf -ivf...`

```shell
brew install autoconf automake libtool
```

autoreconf 是一个用于自动配置 GNU 软件包的工具,通常在安装或更新源代码包时会自动调用.

## gitaction 执行 build 命令报错`javascript heap out of memory`

一开始更改 action 中的 build 命令,添加[increase-memory-limit](https://www.npmjs.com/package/increase-memory-limit),命令中添加 cross-env,例如`cross-env LIMIT=2048 increase-memory-limit`,这样只是添加运行内存大小,并没有实质解决问题

后来分析提交的文件,才知道是 mdx 文件太大了,mdx 需要做很多 js 处理,如果不引入组件,其实完全没必要使用 mdx,改成 md 就好了

😭

不,并没好

**结果把 astro2 升级到 3 就好了**

## github访问问题

`sudo vim /etc/hosts`

```plaintext
140.82.112.4 github.com
140.82.113.3 gist.github.com
199.232.69.194 github.global.ssl.fastly.net
185.199.111.153 assets-cdn.github.com
199.232.68.133 raw.githubusercontent.com
199.232.68.133 cloud.githubusercontent.com
199.232.68.133 camo.githubusercontent.com
199.232.68.133 avatars0.githubusercontent.com
199.232.68.133 avatars1.githubusercontent.com
199.232.68.133 avatars2.githubusercontent.com
199.232.68.133 avatars3.githubusercontent.com
199.232.68.133 avatars4.githubusercontent.com
199.232.68.133 avatars5.githubusercontent.com
199.232.68.133 avatars6.githubusercontent.com
199.232.68.133 avatars7.githubusercontent.com
199.232.68.133 avatars8.githubusercontent.com
```

清空dns缓存

`sudo killall -HUP mDNSResponder`

## webrtc/rtcp/uniapp

所以说,直接在浏览器中请求和解析 RTSP 流是比较困难的,通常需要通过中间服务器进行协议转换
uniapp的<video/>组件使用的bilibili/ijkplayer,集成FFmpeg 的 RTSP 解码器 (`libavformat`) 对 RTSP 流进行解析,将 RTSP 流转换为浏览器支持的格式,并在前端播放.
之前的webrtc说法,我想是需要一个媒体服务器（类似wvp),webrtc本身只是提供实时数据传输的api

## astro 4.1.2中如何定义env,以及如何在astro组件中获取env

<details>
<summary>它说</summary>

在 Astro 4.1.2 中，`env` 变量通常用于在项目中存储和访问环境变量。这些变量可以通过 `.env` 文件或其他方式定义，并在 Astro 项目中被引用和使用。

以下是如何定义和在 Astro 组件中获取环境变量的步骤：

### 1. **定义环境变量**

在项目根目录下创建一个 `.env` 文件，然后将环境变量放置其中。环境变量的格式通常是 `KEY=VALUE`，例如：

`.env` 文件内容：

```env
PUBLIC_API_URL=https://api.example.com
SECRET_KEY=mySecretKey123
```

注意：

- 以 `PUBLIC_` 开头的环境变量可以在客户端和服务器端都访问。
- 不以 `PUBLIC_` 开头的变量只能在服务器端访问。

### 2. **在 Astro 项目中使用环境变量**

#### 在服务器端（Astro 组件）

你可以直接使用 `import.meta.env` 来访问服务器端的环境变量。例如：

```astro
---
const apiUrl = import.meta.env.PUBLIC_API_URL;
const secretKey = import.meta.env.SECRET_KEY; // 只能在服务器端访问
---
<article>
  <h1>API URL: {apiUrl}</h1>
  <p>Secret Key is only available on the server.</p>
</article>
```

#### 在客户端（JavaScript 部分）

在客户端的代码中，你只能访问以 `PUBLIC_` 开头的环境变量。例如：

```astro
<script>
  const apiUrl = import.meta.env.PUBLIC_API_URL;
  console.log(apiUrl); // This will log the PUBLIC_API_URL in the browser console
</script>
```

### 3. **在 Astro 组件中动态使用环境变量**

你可以在 Astro 组件的模板中直接使用环境变量。比如在 HTML 结构中输出环境变量：

```astro
---
const apiUrl = import.meta.env.PUBLIC_API_URL;
---
<section>
  <p>API URL: {apiUrl}</p>
</section>
```

### 4. **注意事项**

- **环境变量的安全性**：确保在客户端（浏览器端）使用的环境变量前缀为 `PUBLIC_`，避免泄露敏感信息。
- **重新启动开发服务器**：每当你更改 `.env` 文件中的变量时，记得重启 Astro 开发服务器，以便让更改生效。

通过这种方式，你可以轻松地在 Astro 项目中定义和获取环境变量，并根据需要在不同的环境中使用这些变量。

</details>

## github page 如果我的.env不上传，action构建页面时拿不到我的token怎么办

在使用 GitHub Pages 和 GitHub Actions 时，`env` 文件通常不会上传，因为它包含了敏感信息，如 API tokens 和 secrets。要让 GitHub Actions 在构建时能够获取到这些敏感信息，应该使用 **GitHub Secrets** 来存储这些信息，而不是通过 `.env` 文件。

### 解决方案：使用 GitHub Secrets 存储敏感信息

1. **添加 GitHub Secrets**

   - 前往 GitHub 仓库的页面。
   - 点击 **Settings**。
   - 在左侧导航栏中找到 **Secrets and variables**，然后选择 **Actions**。
   - 点击 **New repository secret** 按钮。
   - 输入 Secret 的名称和值，比如 `API_TOKEN`，并将你的 token 或者其他环境变量的值输入其中。

   例如：

   - **Name:** `API_TOKEN`
   - **Value:** `your-token-here`

2. **在 GitHub Actions 工作流中使用 Secrets**

   在你的 GitHub Actions workflow 文件（通常是 `.github/workflows/your-workflow.yml`）中，可以通过以下方式使用这些 Secret：

   ```yaml
   name: Build and Deploy

   on:
     push:
       branches:
         - main

   jobs:
     build:
       runs-on: ubuntu-latest

       steps:
         - name: Checkout code
           uses: actions/checkout@v2

         - name: Install dependencies
           run: npm install

         - name: Build project
           run: npm run build

         - name: Deploy to GitHub Pages
           env:
             API_TOKEN: ${{ secrets.API_TOKEN }} # 使用 GitHub Secrets
           run: |
             echo "Your token is: $API_TOKEN"
             # 这里执行你的构建或部署操作，使用 $API_TOKEN 作为环境变量
   ```

   在这个例子中，`${{ secrets.API_TOKEN }}` 是你在 GitHub Secrets 中定义的 token。你可以在构建步骤中通过环境变量 `API_TOKEN` 访问这个 secret。

3. **构建时使用环境变量**

   如果你的项目依赖于 `.env` 文件，通常可以在 GitHub Actions 中动态生成 `.env` 文件，使用 GitHub Secrets 填充其中的值。以下是一个示例：

   ```yaml
   steps:
     - name: Checkout code
       uses: actions/checkout@v2

     - name: Create .env file
       run: |
         echo "API_TOKEN=${{ secrets.API_TOKEN }}" >> .env
         echo "ANOTHER_SECRET=${{ secrets.ANOTHER_SECRET }}" >> .env

     - name: Install dependencies
       run: npm install

     - name: Build project
       run: npm run build
   ```

   这样，GitHub Actions 会在构建时生成一个 `.env` 文件，包含你存储在 GitHub Secrets 中的环境变量。

### 总结

- **不要上传 `.env` 文件**：这些文件通常包含敏感信息，应避免上传到公共仓库。
- **使用 GitHub Secrets**：在 GitHub Secrets 中存储环境变量，然后在 GitHub Actions 构建时通过 `${{ secrets.YOUR_SECRET_NAME }}` 引用它们。
- **动态创建 `.env` 文件**：在工作流中生成 `.env` 文件，使构建和部署过程能够访问这些环境变量。

通过这种方式，你可以安全地在 GitHub Actions 构建和部署时使用你的 tokens 和环境变量。

## Deprecation Warning: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.

More info: https://sass-lang.com/d/legacy-js-api

你遇到的 `Deprecation Warning: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0` 警告是因为你使用了 Dart Sass 的旧版 JavaScript API。Dart Sass 1.45.0 版本引入了新的现代 API，旧版 API 现在已弃用，将在 Dart Sass 2.0.0 版本中完全移除 [3](https://sass-lang.com/documentation/breaking-changes/legacy-js-api/). 这个警告会在 Dart Sass 1.79.0 及更高版本中出现 [3](https://sass-lang.com/documentation/breaking-changes/legacy-js-api/).

解决方法是迁移到新的现代 API。这涉及到修改你代码中使用 `sass.render()` 或 `sass.renderSync()` 的部分。旧版 API 的两个主要入口点 `render` 和 `renderSync` 已被新的 `compile`、`compileAsync`、`compileString` 和 `compileStringAsync` 取代 [3](https://sass-lang.com/documentation/breaking-changes/legacy-js-api/)。 新的 API 更清晰地区分了编译文件和编译字符串，并且异步操作使用 Promise 而不是回调函数 [3](https://sass-lang.com/documentation/breaking-changes/legacy-js-api/). 此外，自定义函数和导入器的使用方法也发生了变化 [3](https://sass-lang.com/documentation/breaking-changes/legacy-js-api/).

如果你使用的是像 Vite 或者 Webpack 这样的打包工具，你需要在配置文件中进行相应的设置。例如，在 Vite 中，你需要在 `vite.config.[js/ts]` 文件中设置 `css.preprocessorOptions.scss.api` 为 `"modern"` 或 `"modern-compiler"` [1](https://stackoverflow.com/questions/78997907/the-legacy-js-api-is-deprecated-and-will-be-removed-in-dart-sass-2-0-0) [3](https://sass-lang.com/documentation/breaking-changes/legacy-js-api/)。Webpack 通常默认使用现代 API，但如果仍然出现警告，也需要进行类似的设置 [3](https://sass-lang.com/documentation/breaking-changes/legacy-js-api/).

如果你暂时不想迁移，也可以通过设置 `silenceDeprecations` 选项来暂时抑制警告 [3](https://sass-lang.com/documentation/breaking-changes/legacy-js-api/)。但这只是权宜之计，最终仍然需要迁移到现代 API。 例如，使用 `sass.renderSync({ silenceDeprecations: ['legacy-js-api'], ... })` 可以暂时关闭警告 [3](https://sass-lang.com/documentation/breaking-changes/legacy-js-api/). 记住，这只是临时的解决方案，Dart Sass 2.0.0 将完全移除旧版 API [3](https://sass-lang.com/documentation/breaking-changes/legacy-js-api/) [6](https://sass-lang.com/documentation/breaking-changes/).

迁移到现代 API 是必要的，因为它提高了代码的可维护性和长期兼容性。 尽早迁移可以避免将来因为旧版 API 被移除而导致的项目中断。

## agp版本问题

```gradle
The project is using an incompatible version (AGP 8.5.1) of the Android Gradle plugin. Latest supported version is AGP 8.2.0
```

## 页面滚动卡顿问题

自从加了cesium组件后，相应的页面在加载了这些个组件后滚动会变得卡顿

## playwright问题

<details>
<summary>问题</summary>

Run pnpm run build

> ajn404-github-io@0.0.0 build /home/runner/work/ajn404.github.io/ajn404.github.io
> cross-env NODE_OPTIONS=--max-old-space-size=8192 astro build

9:04:41 AM [vite] Error when evaluating SSR module /home/runner/work/ajn404.github.io/ajn404.github.io/astro.config.mjs: failed to import "remark-mermaidjs"
|- TypeError: (intermediate value).resolve is not a function
at file:///home/runner/work/ajn404.github.io/ajn404.github.io/node_modules/.pnpm/mermaid-isomorphic@3.0.0_playwright@1.48.2/node_modules/mermaid-isomorphic/dist/mermaid-isomorphic.js:2:26
at ModuleJob.run (node:internal/modules/esm/module_job:194:25)

[astro] Unable to load your Astro config

(intermediate value).resolve is not a function
Stack trace:
at file:///home/runner/work/ajn404.github.io/ajn404.github.io/node_modules/.pnpm/mermaid-isomorphic@3.0.0_playwright@1.48.2/node_modules/mermaid-isomorphic/dist/mermaid-isomorphic.js:2:26
 ELIFECYCLE  Command failed with exit code 1.

</details>

<details>
<summary>Click to expand</summary>

```yml
name: Docs

on:
  push:
    branches:
      - main

concurrency: ${{ github.workflow }}-${{ github.ref }}

jobs:
  release:
    name: Build Astro Doc
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Set up Node
        uses: actions/setup-node@v3
        with:
          node-version: 18.18.0

      - uses: pnpm/action-setup@v2.0.1
        name: Install pnpm
        id: pnpm-install
        with:
          version: 8.9.2
          run_install: false

      - name: Get pnpm store directory
        id: pnpm-cache
        run: |
          echo "::set-output name=pnpm_cache_dir::$(pnpm store path)"

      - uses: actions/cache@v3
        name: Setup pnpm cache
        with:
          path: ${{ steps.pnpm-cache.outputs.pnpm_cache_dir }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-

      - name: Install dependencies
        run: pnpm install --no-frozen-lockfile

      - name: Install Playwright
        run: pnpm install -D @playwright/test@latest
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps

      - name: Build site
        run: pnpm run build
        env:
          PUBLIC_GITHUB_TOKEN: ${{ secrets.PUBLIC_GITHUB_TOKEN }}

      - name: Deploy to GitHub Pages
        uses: crazy-max/ghaction-github-pages@v2
        with:
          target_branch: docs
          build_dir: dist
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

</details>
