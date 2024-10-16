import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import { defineConfig } from "astro/config";
import path from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import remarkCollapse from "remark-collapse";
import remarkMath from "remark-math";
import remarkToc from "remark-toc";
import css from "rollup-plugin-css-only";
import { fileURLToPath } from "url";
import { remarkReadingTime } from "./plugin/remark-reading-time.mjs";
import cesium from "vite-plugin-cesium";
import { viteStaticCopy } from "vite-plugin-static-copy";
import myIntegration from "./plugin/devtool/my-integration";

import sentry from "@sentry/astro";
import spotlightjs from "@spotlightjs/astro";

const __filenameNew = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filenameNew);

const cesiumSource = "node_modules/cesium/Build/Cesium";
const cesiumBaseUrl = "cesiumStatic";

const vite = {
  clearScreen: false,
  optimizeDeps: {
    exclude: ["@resvg/resvg-js"],
  },
  ssr: {
    noExternal: ["@notes/editor", "@shoelace-style/shoelace"],
  },
  define: {
    CESIUM_BASE_URL: JSON.stringify(`/${cesiumBaseUrl}`),
  },
  plugins: [
    viteStaticCopy({
      targets: [
        { src: `${cesiumSource}/ThirdParty`, dest: cesiumBaseUrl },
        { src: `${cesiumSource}/Workers`, dest: cesiumBaseUrl },
        { src: `${cesiumSource}/Assets`, dest: cesiumBaseUrl },
        { src: `${cesiumSource}/Widgets`, dest: cesiumBaseUrl },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
      },
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        css({
          output: "bundle.css",
        }),
      ],
      external: [
        "wavesurfer.js",
        "wavesurfer.js/dist/plugins/spectrogram.esm.js",
      ],
      sourceMap: "inline",
    },
  },
  server: {
    strictPort: true,
    watch: {
      ignored: ["**/src-tauri"],
    },
  },
};
if (import.meta.env.DEV) {
  vite.server = {
    proxy: {
      "/RPC2_Login": {
        target: "http://192.168.200.2/RPC2_Login", // 目标服务器地址
        changeOrigin: true, // 是否改变请求源
        secure: false,
        rewrite: path => path.replace(/^\/RPC2_Login/, ""),
      },
      "/RPC2": {
        target: `http://192.168.200.2/RPC2`,
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/RPC2/, ""),
      },
      "/RPC_Loadfile": {
        arget: `http://192.168.200.2/RPC_Loadfile`,
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/RPC_Loadfile/, ""),
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3333,
    open: true,
    host: true,
  },
  build: {
    assets: "static",
    inlineStylesheets: "always",
  },
  site: "https://ajn404.github.io",
  prefetch: true,
  experimental: {
    clientPrerender: true,
  },
  integrations: [
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: {
        theme: "material-theme-palenight",
        wrap: true,
      },
    }),
    sitemap(),
    react({
      include: ["**/react/*"],
    }),
    vue({
      appEntrypoint: "/src/components/vue/_app",
    }),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    myIntegration,
    sentry(),
    spotlightjs(),
  ],
  markdown: {
    remarkPlugins: [
      [
        remarkToc,
        {
          heading: "目录",
        },
      ],
      [
        remarkCollapse,
        {
          test: "脚本",
          summary: str => "展开 " + str,
        },
      ],
      remarkMath,
      remarkReadingTime,
    ],
    rehypePlugins: [rehypeKatex, rehypeAutolinkHeadings],
    shikiConfig: {
      theme: "material-theme-palenight",
      wrap: true,
    },
    extendDefaultPlugins: true,
  },
  vite,
});
