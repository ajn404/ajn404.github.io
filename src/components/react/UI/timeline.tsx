import { Timeline } from "@aceternity/ui/timeline";

export default function TimelineDemo() {
  const data = [
    {
      title: "类型体操",
      content: (
        <div>
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
          ......
          <br />
        </div>
      ),
    },
    {
      title: "代码艺术",
      content: (
        <div>
          <a href="/posts/fantastic#flow-field">flow field</a>
          <br />
          <br />
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
