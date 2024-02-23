import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shadcn/ui/tabs";
import * as React from "react";
import ForceACode from "./ForceA.tsx?raw";
import ForceA from "./ForceA";
import Code from "@components/react/editor/code";

export default React.forwardRef<
  React.ElementRef<typeof Tabs>,
  React.ComponentPropsWithRef<typeof Tabs>
>(({ className, ...props }, ref) => {
  return (
    <>
      <Tabs ref={ref} defaultValue="demo" className="w-full" {...props}>
        <TabsList>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="demo">Demo</TabsTrigger>
        </TabsList>
        <TabsContent value="code">
          <Code>{ForceACode}</Code>
        </TabsContent>
        <TabsContent value="demo">
          <ForceA></ForceA>
        </TabsContent>
      </Tabs>
    </>
  );
});
