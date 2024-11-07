import { Timeline } from "@aceternity/ui/timeline";
import SpringV2 from "../p5/Oscillation/spring/springV2";
import InteractiveMotionBall from "@components/react/p5/Vector/InteractiveMotionBall";
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
      title: " 202410",
      content: (
        <div>
          <a href="/posts/nature-of-code">nature of code</a>
          <SpringV2 showControl={false} />
          <InteractiveMotionBall />
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
