import { Timeline } from "@aceternity/ui/timeline";
import SpringV2 from "../p5/Oscillation/spring/springV2";
import InteractiveMotionBall from "@components/react/p5/Vector/InteractiveMotionBall";
import Text from "@components/react/UI/Text.tsx";
import PerlinCurve from "@components/react/p5/Randomness/PerlinCurve.tsx";
import Cannon from "@components/react/p5/Oscillation/cannon.tsx";
import Common from "@components/react/doodle/common.tsx";
import Gpu from "@components/react/observablehq/ajn404/gpu.tsx";
import Diorama from "@components/react/little/three_demo.tsx";

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
          <Common>
            <p>
              @grid: 2x2 / 100% 600px; background-color: #000;
              background-repeat: no-repeat; background-blend-mode: difference;
              background-position: @r(100%) @r(100%); background-size:
              @m20(@r(100%) @lr); background-image: @m20(linear-gradient(#fff,
              #fff));
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
          <div className="grid grid-cols-subgrid gap-4">
            <div>
              <SpringV2 showControl={false} />
            </div>
            <div>
              <InteractiveMotionBall />
            </div>
            <div>
              <PerlinCurve hideRandom={true} />
            </div>
            <div>
              <Cannon />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "类型体操",
      content: (
        <div>
          <a href="/posts/2024-10#实现pickt-k-extends-keyof-t">实现Pick</a>
          <a href="/posts/2024-09#今日类型体操">实现Get Return Type</a>
          <a href="/posts/2024-11-06-优化任务调度#今日类型体操">
            实现RequiredKeys
          </a>
          <a href="/posts/2024-11-05cesium的hook#类型体操">实现LookUp</a>
          <a href="/posts/2024-11#今日类型体操">实现GetRequired</a>
        </div>
      ),
    },
    {
      title: "css查漏补缺",
      content: (
        <div>
          <a href="/posts/css">css查漏补缺</a>

          <div
            style={{
              background:
                "repeating-linear-gradient(315deg, #00FFFF2E 92%, #073AFF00 100%),repeating-radial-gradient(75% 75% at 238% 218%, #00FFFF12 30%, #073AFF14 39%),radial-gradient(99% 99% at 109% 2%, #00C9FFFF 0%, #073AFF00 100%),radial-gradient(99% 99% at 21% 78%, #7B00FFFF 0%, #073AFF00 100%),radial-gradient(160% 154% at 711px -303px, #2000FFFF 0%, #073AFFFF 100%)",
            }}
            className="m-5 w-[100px] h-[100px]"
          />
        </div>
      ),
    },
    {
      title: "webgl",
      content: (
        <div>
          <a href="/posts/webgl">webgl</a>

          <Gpu />
          <p>threejs</p>
          <Diorama />
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
