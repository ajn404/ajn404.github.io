import { Timeline } from "@aceternity/ui/timeline";
import SpringV2 from "../p5/Oscillation/spring/springV2";
import InteractiveMotionBall from "@components/react/p5/Vector/InteractiveMotionBall";
import Text from "@components/react/UI/Text.tsx";
import PerlinCurve from "@components/react/p5/Randomness/PerlinCurve.tsx";
import Cannon from "@components/react/p5/Oscillation/cannon.tsx";
import Common from "@components/react/doodle/common.tsx";

export default function TimelineDemo() {
  const data = [
    {
      title: " 2023 8月",
      content: (
        <div>
          <a className="" href="/posts/good-first-blog">
            第一篇博客
          </a>
          <Text>
            <p>文字渐变色背景使用,是代码的传承，组件的记载</p>
          </Text>
          <Text>
            <p>css doodle</p>
          </Text>
          <Common>
            <p>
              @grid: 1x1 / 100% 600px; gap: 2px; background: conic-gradient( at
              @r(30%, 70%) 0, @stripe( transparent 25%, @m32.@p( #781217,
              #9A1320, #0A2667, #D8A088, #D6DDD1, #E95A22, #CA4122, #C74523,
              #2CACC9, #008C3B, #F5D700, #CA2821, #EADF93, #003A59, #00609A,
              #6E746E, #E2E0B8, #1E272B, #468495, #E1E0CA, #666F75, #84A16A,
              #413B4E, #98AEC7, #979DA4 ), transparent 25% ) );
            </p>
          </Common>
        </div>
      ),
    },
    {
      title: " 2024 10月",
      content: (
        <div>
          <a href="/posts/nature-of-code">nature of code</a>
          <SpringV2 showControl={false} />
          <InteractiveMotionBall />
          <p className="text-neutral-200 text-xs md:text-sm font-normal mb-8">
            柏林噪声
          </p>
          <PerlinCurve hideRandom={true} />
          <Text>
            <p>开炮!</p>
          </Text>
          <Cannon />
        </div>
      ),
    },
    {
      title: "类型体操",
      content: (
        <div>
          <a href="/posts/2024-10#实现pickt-k-extends-keyof-t">实现Pick</a>
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
    <div className="w-full pb-8">
      <Timeline data={data} />
    </div>
  );
}
