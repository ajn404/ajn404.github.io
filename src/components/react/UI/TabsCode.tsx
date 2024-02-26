import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shadcn/ui/tabs";
import Code from "@components/react/editor/code";
import { useEffect, useState, useMemo } from "react";

import { ForceA, ForceB } from "@components/react/p5/Forces/index";
import ForceACode from "@components/react/p5/Forces/ForceA.tsx?raw";
import ForceBCode from "@components/react/p5/Forces/ForceB.tsx?raw";

type ComponentName = "ForceA" | "ForceB";

const components: Record<
  ComponentName,
  { component: React.ComponentType<any>; code: string }
> = {
  ForceA: { component: ForceA, code: ForceACode },
  ForceB: { component: ForceB, code: ForceBCode },
};

interface Props {
  componentName: ComponentName;
}

export default function DynamicComponent({ componentName }: Props) {
  const [code, setCode] = useState<string>("");
  const [Component, setComponent] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadComponent = async () => {
      try {
        if (components[componentName]) {
          setCode(components[componentName].code);
          setComponent(components[componentName].component);
          setError(null);
        } else {
          setError(`Component not found: ${componentName}`);
        }
      } catch (error) {
        console.error(`Failed to load component: ${componentName}`, error);
        setError(`Failed to load component: ${componentName}`);
      }
    };

    loadComponent();

    return () => {
      isMounted = false;
    };
  }, [componentName]);

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
