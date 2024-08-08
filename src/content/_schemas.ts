import { z } from "astro:content";
import { SITE } from "@config";

export const blogSchema = z
  .object({
    author: z.string().optional().default(SITE.author),
    pubDatetime: z.date().optional(),
    modDatetime: z.date().optional().nullable(),
    upDateTime: z.date().optional(),
    title: z.string().optional(),
    postSlug: z.string().optional(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default(["others"]),
    ogImage: z.string().optional(),
    description: z.string().optional(),
    canonicalURL: z.string().optional(),
    minutesRead: z.string().optional(),
    wordsRead: z.number().optional(),
    isDev: z.boolean().optional(), //是否只在开发环境显示
    detailButton: z.boolean().optional().default(false), //是否显示详情按钮
    navToc: z.boolean().optional().default(false), //是否将目录搞到左侧
    excalidraw: z.string().optional().default("ffmpeg"), //当前页面显示的excalidraw
  })
  .strict();

export type BlogFrontmatter = z.infer<typeof blogSchema>;
