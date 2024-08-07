import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shadcn/ui/tabs";
import Code from "@components/react/editor/code";
import { useEffect, useState, useMemo } from "react";

interface Props {
  componentName: string; // 组件名称
  path: string; // 动态路径
}

export default function DynamicComponent({ componentName, path }: Props) {
  const [code, setCode] = useState<string>("");
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadComponent = async () => {
      try {
        // 动态导入组件
        const { default: LoadedComponent } = await import(
          `${path}/${componentName}`
        );
        setComponent(() => LoadedComponent);

        // 设置代码
        const codeResponse = await import(`${path}/${componentName}.tsx?raw`);
        setCode(codeResponse.default);
        setError(null);
      } catch (error) {
        console.error(`加载组件失败: ${componentName}`, error);
        if (isMounted) {
          setError(`加载组件失败: ${componentName}`);
        }
      }
    };

    loadComponent();

    return () => {
      isMounted = false;
    };
  }, [componentName, path]);

  const memoizedComponent = useMemo(() => {
    return Component ? <Component /> : <div>加载中...</div>;
  }, [Component]);

  return (
    <>
      <Tabs defaultValue="demo" className="w-full">
        <TabsList>
          <TabsTrigger value="code">代码</TabsTrigger>
          <TabsTrigger value="demo">演示</TabsTrigger>
        </TabsList>
        <TabsContent value="code">
          {error ? error : <Code>{code}</Code>}
        </TabsContent>
        <TabsContent value="demo">{memoizedComponent}</TabsContent>
      </Tabs>
    </>
  );
}
