import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";
import Text from "@components/react/UI/Text";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import classNames from "classnames";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
  showBackground?: boolean;
}
export default function Card({
  href,
  frontmatter,
  secHeading = true,
  showBackground = true,
}: Props) {
  const { title, pubDatetime, description } = frontmatter;
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true); // 新增加载状态
  const ref = useRef<HTMLAnchorElement>(null);
  const src = useMemo(() => {
    return `/assets/bg/${Math.floor(Math.random() * 12) + 1}.${Math.random() < 0.5 ? "jpg" : "png"}`;
  }, []);
  const [backgroundImageStyle, setBackgroundImageStyle] = useState({
    backgroundImage: "",
  });
  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg card__heading pt-4 font-medium",
  };
  useEffect(() => {
    const loadStyles = async () => {
      if (showBackground) {
        await import("@styles/card.scss");
      } else {
        await import("@styles/searchCard.scss");
      }
    };
    loadStyles();
  }, [showBackground]);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries.length > 0) {
        setIsVisible(entries[0].isIntersecting);
      }
    });
    if (ref.current) {
      obs.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        obs.unobserve(ref.current);
      }
    };
  }, []);
  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      setLoading(false); // 图片加载完成，设置加载状态为 false
      if (isVisible) {
        setBackgroundImageStyle({ backgroundImage: `url(${image.src})` });
      }
    };
  }, [isVisible, src]);
  const handleTouchStart = useCallback(() => {
    ref.current?.classList.add("hover-effect");
  }, []);
  const handleTouchEnd = useCallback(() => {
    ref.current?.classList.remove("hover-effect");
  }, []);
  useEffect(() => {
    const element = ref.current!;
    element.addEventListener("touchstart", handleTouchStart);
    element.addEventListener("touchend", handleTouchEnd);
    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd]);
  return (
    <a
      className={classNames("card", { "hover-effect": isVisible })}
      data-astro-prefetch
      href={href}
      ref={ref}
      data-astro-reload
    >
      <div className="card__background" style={backgroundImageStyle}>
        {loading && (
          <div className="loading-spinner w-full h-full flex justify-center items-center">
            加载中...
          </div>
        )}{" "}
        {/* 加载动画 */}
      </div>
      <div className="card__content pt-4">
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
        <Datetime className="pt-4" datetime={pubDatetime} />
        <Text>
          <h3>{description}</h3>
        </Text>
      </div>
    </a>
  );
}
