import { Timeline } from "@aceternity/ui/timeline";

export default function TimelineDemo() {
  const data = [
    {
      title: " 2023 8月",
      content: (
        <div>
          <a href="/posts/good-first-blog">第一篇博客</a>
        </div>
      ),
    },
    {
      title: " 2023 8月",
      content: (
        <div>
          <a href="/posts/good-first-blog">第一篇博客</a>
        </div>
      ),
    },
    {
      title: " 2023 8月",
      content: (
        <div>
          <a href="/posts/good-first-blog">第一篇博客</a>
        </div>
      ),
    },
    {
      title: " 2023 8月",
      content: (
        <div>
          <a href="/posts/good-first-blog">第一篇博客</a>
        </div>
      ),
    },
    {
      title: " 2023 8月",
      content: (
        <div>
          <a href="/posts/good-first-blog">第一篇博客</a>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
