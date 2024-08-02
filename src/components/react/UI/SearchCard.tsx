import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";
import Text from "@components/react/UI/Text";
// import "@styles/searchCard.scss";
import { useEffect, useRef } from "react";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, description } = frontmatter;

  const ref = useRef(null);
  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg card__heading pt-4 font-medium ",
  };

  useEffect(() => {
    import("@styles/searchCard.scss");
  }, []);

  return (
    <a className="card" href={href} ref={ref}>
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
