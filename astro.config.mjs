import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import remarkToc from "remark-toc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { remarkReadingTime } from "./plugin/remark-reading-time.mjs";
import copy from "rollup-plugin-copy";
import css from "rollup-plugin-css-only";

import { remarkCodeHike } from "@code-hike/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import path from "path";
import { fileURLToPath } from "url";

const __filenameNew = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filenameNew);
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
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },

    ssr: {
      noExternal: ["@notes/editor", "@shoelace-style/shoelace"],
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
      },
    },
  },
});
