"use client";

import {
  CandlestickChart,
  Lock,
  Search,
  Settings,
  Sparkles,
} from "lucide-react";
import { GlowingEffect } from "@components/react/aceternity/ui/glowing-effect";

export default function GlowingEffectDemo() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={
          <CandlestickChart className="h-4 w-4 text-black dark:text-neutral-400" />
        }
        title="彼得·林奇"
        description="投资人在熊市中损失的钱，大部分是因为他们在市场下跌时恐慌性抛售。"
      />

      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<Settings className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="格雷厄姆"
        description="市场短期是一台投票机，长期是一台称重机"
      />

      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<Lock className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="A股市场，七亏二平一赚。"
        description="在A股，消息就是一切。"
      />

      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="量化探索之路"
        link="/posts/量化交易股票交易"
        description="策略，回测，量化，nextjs"
      />

      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Coming soon on Aceternity UI"
        description="I'm writing the code as I record this, no shit."
      />
    </ul>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  link?: string; // 添加 link 参数，可选
}

const GridItem = ({ area, icon, title, description, link }: GridItemProps) => {
  const Wrapper = link ? "a" : "div"; // 根据 link 参数决定使用 a 标签还是 div
  const wrapperProps = link
    ? { href: link, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2.5xl border  p-2  md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <Wrapper
          className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6  dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6"
          {...wrapperProps}
        >
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2 ">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white">
                {title}
              </h3>
              <h2
                className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
              md:text-base/[1.375rem]  text-black dark:text-neutral-400"
              >
                {description}
              </h2>
            </div>
          </div>
        </Wrapper>
      </div>
    </li>
  );
};
