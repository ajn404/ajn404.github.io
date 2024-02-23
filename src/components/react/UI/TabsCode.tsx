import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shadcn/ui/tabs";
import Code from "@components/react/editor/code";
import { useEffect, useState, useMemo } from "react";

interface Props {
  componentName: string;
}

export default function DynamicComponent(props: Props) {
  const [code, setCode] = useState("");
  const [Component, setComponent] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComponent = async () => {
      try {
        const [codeModule, componentModule] = await Promise.all([
          import(`${props.componentName}.tsx?raw`),
          import(`${props.componentName}.tsx`),
        ]);
        setCode(codeModule.default);
        setComponent(componentModule.default);
      } catch (error) {
        console.error(
          `Failed to load component: ${props.componentName}`,
          error
        );
        setError(`Failed to load component: ${props.componentName}`);
      }
    };

    fetchComponent();
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
