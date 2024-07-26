import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";
import Text from "@components/react/UI/Text";
import { useEffect, useRef, useState } from "react";

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
  const { title, pubDatetime, modDatetime, description, upDateTime } =
    frontmatter;

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  let image;

  //564*846
  let src = `/assets/bg/${Math.floor(Math.random() * 12) + 1}.${
    Math.floor(Math.random() * 10) % 2 === 1 ? "jpg" : "png"
  }`;

  let [backgroundImageStyle, setStyle] = useState({
    backgroundImage: `radial-gradient(ellipse at top, rgb(${Math.floor(
      Math.random() * 255
    )},${Math.floor(Math.random() * 355) - 100},${
      Math.floor(Math.random() * 255) % 250
    }), transparent),
            radial-gradient(ellipse at bottom, #4d9f0c, transparent)`,
  });

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg card__heading pt-4 font-medium ",
  };

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (!entries || entries.length === 0) return;
      setIsVisible(entries[0].isIntersecting);
    });
    obs.observe(ref.current!);
  }, []);

  useEffect(() => {
    if (showBackground) import("@styles/card.scss");
  }, [showBackground]);

  useEffect(() => {
    image = new Image();
    image.src = src;
    image.onload = () => {
      if (isVisible)
        setStyle({
          backgroundImage: `url(${image.src})`,
        });
    };
  }, [isVisible]);

  useEffect(() => {
    let element = ref.current!;

    element.addEventListener("touchstart", function () {
      this.classList.add("hover-effect");
    });

    element.addEventListener("touchend", function () {
      this.classList.remove("hover-effect");
    });
  });

  return (
    <a
      className="card"
      data-astro-prefetch
      href={href}
      ref={ref}
      data-astro-reload
    >
      <div className="card__background" style={backgroundImageStyle}></div>
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
