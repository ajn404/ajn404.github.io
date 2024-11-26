import { slugifyStr } from "./slugify";
import type { CollectionEntry } from "astro:content";

interface TagCount {
  name: string;
  count: number;
}

const getUniqueTags = (posts: CollectionEntry<"blog">[]): TagCount[] => {
  const filteredPosts = posts.filter(({ data }) => !data.draft);

  const tagCounts: { [slug: string]: number } = {};

  filteredPosts
    .flatMap(post => post.data.tags)
    .forEach(tag => {
      const slug = slugifyStr(tag);
      tagCounts[slug] = (tagCounts[slug] || 0) + 1;
    });

  return Object.entries(tagCounts)
    .map(([slug, count]) => ({ name: slug, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

export default getUniqueTags;
