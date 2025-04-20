import { Timeline } from "@aceternity/ui/timeline";

export default function TimelineDemo() {
  const data = [
    {
      title: "类型体操",
      content: (
        <div className="text-center">
          <img
            className="w-1/2 m-auto pb-2"
            src="/assets/svg/type_challenge.svg"
            alt=""
          />
          <a href="/posts/2024-10#实现pickt-k-extends-keyof-t">实现Pick</a>
          <br />
          <a href="/posts/2024-09#今日类型体操">实现Get Return Type</a>
          <br />
          <a href="/posts/2024-11-06-优化任务调度#今日类型体操">
            实现RequiredKeys
          </a>
          <br />
          <a href="/posts/2024-11-05cesium的hook#类型体操">实现LookUp</a>
          <br />
          <a href="/posts/2024-11#今日类型体操">实现GetRequired</a>
          <br />
          <a href="/search?q=类型体操">......</a>
          <br />
        </div>
      ),
    },
    {
      title: "代码艺术",
      content: (
        <div className="text-center">
          <svg className="w-1/2 m-auto pb-2" viewBox="0 0 800 800" fill="none">
            <path
              d="M400 500C700 500 700 100 400 100"
              stroke="#0468FF"
              strokeWidth="150"
            ></path>
            <path
              d="M400 200L100 600"
              stroke="#1F34AB"
              strokeWidth="150"
            ></path>
            <path
              d="M100 300L200 500"
              stroke="#85AEFF"
              strokeWidth="150"
            ></path>
          </svg>
          <a href="/posts/fantastic#flow-field">flow field</a>
          <br />
          <a href="/posts/fantastic#图形融合">sdf图形融合</a>
          <br />
          <a href="/posts/nature-of-code">the nature of code</a>
          <br />
          <a href="/search?q=p5">......</a>
          <br />
        </div>
      ),
    },
    {
      title: "过去搭建的ssg/学习demo",
      content: (
        <div className="text-center">
          <img className="w-1/2 m-auto pb-2" src="/assets/ajn404.webp" alt="" />
          <a href="https://ajn404.github.io/mono_notes/">
            astro雏形(mono repo，2/3年阶段)
          </a>
          <br />
          <a href="https://ajn404.github.io/vue3_tauri_fun">vue3玩具</a>
          <br />
          <a href="https://ajn404.github.io/note">rust/p5(2/3年阶段)</a>
          <br />
          <a href="https://ajn404.github.io/ngm.github.io/vue_still_learn/#目录">
            出生-前端（1年左右）
          </a>
          <br />
          <a href="https://ajn404.github.io/log.github.io/">学校-记录</a>
          <br />
          <a href="https://github.com/ajn404">......</a>
        </div>
      ),
    },
    {
      title: "开源组件/应用/工具",
      content: (
        <div className="text-center">
          <a
            href="https://www.npmjs.com/package/just-draw-it"
            title="just draw it"
          >
            <img
              className="w-1/2 m-auto pb-2"
              src="/assets/more/screenshoot.webp"
              alt=""
            />
          </a>
          <a href="/posts/2025-1-8#按钮获取当前位置坐标">获取当前位置坐标</a>
          <br />
          <a href="/posts/cesium#历史轨迹">人员定位/轨迹</a>
        </div>
      ),
    },
  ];
  return (
    <div className="w-1/2 pb-8">
      <Timeline data={data} />
    </div>
  );
}
