import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shadcn/ui/card";

import { buttonVariants } from "@shadcn/ui/button";

import {
  forwardRef,
  type AnchorHTMLAttributes,
  type HTMLAttributeAnchorTarget,
} from "react";

export default forwardRef<
  HTMLAnchorElement,
  React.HTMLAttributes<HTMLAnchorElement>
>(({ className, children, ...props }, ref) => (
  <Card>
    <CardHeader>{/* <CardTitle>{props.title}</CardTitle> */}</CardHeader>
    <CardContent>
      <slot name="des" />
      {children}
    </CardContent>
    <CardFooter>
      <a
        href={props.title || "#"}
        className={`group inline-block ${className} ${buttonVariants({
          variant: "outline",
        })}`}
        aria-label={props.title}
        target="_blank"
        title={props.title}
      >
        跳转
      </a>
    </CardFooter>
    {props.title && (
      <iframe
        src={props.title}
        className=" h-20px m-4 mx-auto overflow-scroll"
      ></iframe>
    )}
  </Card>
));
