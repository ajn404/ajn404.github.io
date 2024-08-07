import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shadcn/ui/tabs";
import Code from "@components/react/editor/code";
import { useEffect, useState, useMemo } from "react";

type ComponentName = "ForceA" | "ForceB";

const components: Record<ComponentName, any> = {
  ForceA: () => import("@components/react/p5/Forces/ForceA"),
  ForceB: () => import("@components/react/p5/Forces/ForceB"),
};

interface Props {
  componentName: ComponentName;
}

export default function DynamicComponent({ componentName }: Props) {
  const [code, setCode] = useState<string>("");
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadComponent = async () => {
      try {
        if (components[componentName]) {
          // 动态导入组件
          const { default: LoadedComponent } =
            await components[componentName]();
          setComponent(() => LoadedComponent);
          // 设置代码
          const codeResponse = await import(
            `@components/react/p5/Forces/${componentName}.tsx?raw`
          );
          setCode(codeResponse.default);
          setError(null);
        } else {
          setError(`Component not found: ${componentName}`);
        }
      } catch (error) {
        console.error(`Failed to load component: ${componentName}`, error);
        if (isMounted) {
          setError(`Failed to load component: ${componentName}`);
        }
      }
    };

    loadComponent();

    return () => {
      isMounted = false;
    };
  }, [componentName]);

  const memoizedComponent = useMemo(() => {
    return Component ? <Component /> : <div>loading...</div>;
  }, [Component]);

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
