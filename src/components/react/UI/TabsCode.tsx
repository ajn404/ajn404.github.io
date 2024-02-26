import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shadcn/ui/tabs";
import Code from "@components/react/editor/code";
import { useEffect, useState, useMemo } from "react";

import ForceA from "@components/react/p5/Forces/ForceA";
import ForceACode from "@components/react/p5/Forces/ForceA.tsx?raw";

type componentName = "ForceA";

const components = {
  ForceA: {
    component: ForceA,
    code: ForceACode,
  },
};

interface Props {
  componentName: string;
}

export default function DynamicComponent(props: Props) {
  const [code, setCode] = useState("");
  const [Component, setComponent] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const SetComponent = async () => {
      try {
        setCode(components[props.componentName as componentName].code);
        setComponent(
          components[props.componentName as componentName].component
        );
      } catch (error) {
        console.error(
          `Failed to load component: ${props.componentName}`,
          error
        );
        setError(`Failed to load component: ${props.componentName}`);
      }
    };
    SetComponent();
  }, [props.componentName]);

  const memoizedComponent = useMemo(() => Component, [Component]);

  return (
    <>
      <Tabs defaultValue="demo" className="w-full">
        <TabsList>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="demo">Demo</TabsTrigger>
        </TabsList>
        <TabsContent value="code">
          {error ? error : <Code>{code}</Code>}
        </TabsContent>
        <TabsContent value="demo">{memoizedComponent}</TabsContent>
      </Tabs>
    </>
  );
}
