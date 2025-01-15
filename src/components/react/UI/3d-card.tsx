import {
  CardBody,
  CardContainer,
  CardItem,
} from "@components/react/aceternity/ui/card.tsx";

import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
  showBackground?: boolean;
}

export default ({ href, frontmatter }: Props) => {
  const { title, pubDatetime, description, ogImage } = frontmatter;
  return (
    <CardContainer className="inter-var">
      <CardBody className={`w-auto sm:w-[30rem] h-auto rounded-xl px-6`}>
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src={ogImage || "/assets/ajn404.jpeg"}
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-4">
          <Datetime className="w-3/4" datetime={pubDatetime} />

          <CardItem
            translateZ={20}
            as="a"
            href={href}
            target="_parent"
            className="px-4 py-2 rounded-xl text-xs font-normal text-white"
          >
            跳转 →
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};
