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
const __filenameNew = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filenameNew);

const cesiumSource = "node_modules/cesium/Build/Cesium";
// This is the base url for static files that CesiumJS needs to load.
// Set to an empty string to place the files at the site's root path
const cesiumBaseUrl = "cesiumStatic";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3333,
    open: true,
  },
  build: {
    assets: "static",
    inlineStylesheets: "always",
  },
  site: "https://ajn404.github.io", // replace this with your deployed domain
  prefetch: true,
  //   output: "server",
  //   adapter: node({
  //     mode: "standalone",
  //   }),
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
    // lit({
    //   include: ["**/lit/*"],
    // }),
    vue({
      appEntrypoint: "/src/components/vue/_app",
    }),
    // auth(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
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
  vite: {
    // plugins: [cesium()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
    ssr: {
      noExternal: ["@notes/editor", "@shoelace-style/shoelace"],
    },
    define: {
      // Define relative base path in cesium for loading assets
      // https://vitejs.dev/config/shared-options.html#define
      CESIUM_BASE_URL: JSON.stringify(`/${cesiumBaseUrl}`),
    },
    plugins: [
      // Copy Cesium Assets, Widgets, and Workers to a static directory.
      // If you need to add your own static files to your project, use the `public` directory
      // and other options listed here: https://vitejs.dev/guide/assets.html#the-public-directory
      viteStaticCopy({
        targets: [
          { src: `${cesiumSource}/ThirdParty`, dest: cesiumBaseUrl },
          { src: `${cesiumSource}/Workers`, dest: cesiumBaseUrl },
          { src: `${cesiumSource}/Assets`, dest: cesiumBaseUrl },
          { src: `${cesiumSource}/Widgets`, dest: cesiumBaseUrl },
        ],
      }),
    ],
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
      },
    },
  },
});
