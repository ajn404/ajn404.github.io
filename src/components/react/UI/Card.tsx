import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";
import Text from "@components/react/UI/Text";
import { useRef } from "react";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
  showBackground?: boolean;
}
export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, description } = frontmatter;
  const ref = useRef<HTMLAnchorElement>(null);
  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className:
      "text-lg card__heading pt-4 font-medium hover:underline visited:underline focus-within:underline focus:underline focus-visible:underline target:underline",
  };
  return (
    <a className="focus:underline " href={href} ref={ref} data-astro-prefetch>
      <div className="card__content border rounded-lg border-cyan-200 py-1 px-10 my-4 ">
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
