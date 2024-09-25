import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://ajn404.github.io/",
  author: "ajn404",
  desc: "mono notes copying everything",
  title: "笔记",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 20,
};

export const LOCALE = ["en-EN"]; // set to [] to use the environment default

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/ajn404/ajn404.github.io",
    linkTitle: ` ${SITE.title}的代码仓库`,
    active: true,
  },
  {
    name: "Discord",
    href: "https://discord.gg/r6HUuMDs",
    linkTitle: `discord`,
    active: true,
  },
];
