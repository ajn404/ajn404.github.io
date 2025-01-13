import React, { useEffect, useRef } from "react";
// 删除静态导入
// import Tagify from '@yaireo/tagify';
// import '@yaireo/tagify/dist/tagify.css';

interface TagifyProps {
  initialValue?: string;
  onChange?: (values: Array<{ value: string }>) => void;
}

const TagifyComponent: React.FC<TagifyProps> = ({
  initialValue = "",
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const tagifyRef = useRef<any>(null);

  const suggestions = [
    { value: "React", color: "#61dafb" },
    { value: "TypeScript", color: "#3178c6" },
    { value: "JavaScript", color: "#f7df1e" },
    { value: "Node.js", color: "#339933" },
  ];

  useEffect(() => {
    const initTagify = async () => {
      // 动态导入 Tagify
      const [TagifyModule] = await Promise.all([
        import("@yaireo/tagify"),
        import("@yaireo/tagify/dist/tagify.css"),
      ]);

      const Tagify = TagifyModule.default;

      if (inputRef.current) {
        const settings = {
          whitelist: suggestions,
          maxTags: 10,
          dropdown: {
            maxItems: 20,
            classname: "tags-dropdown",
            enabled: 0,
            closeOnSelect: false,
          },
          callbacks: {
            add: (e: CustomEvent) => {
              console.log("添加标签:", e.detail.data);
              updateParent();
            },
            remove: (e: CustomEvent) => {
              console.log("移除标签:", e.detail.data);
              updateParent();
            },
          },
          transformTag: (tagData: any) => {
            tagData.value = tagData.value.toLowerCase();
          },
          validate: (tag: any) => {
            const isValid = tag.value.length >= 2;
            if (!isValid) {
              return "标签至少需要2个字符";
            }
            return true;
          },
        };

        tagifyRef.current = new Tagify(inputRef.current, settings);

        if (initialValue) {
          tagifyRef.current.addTags(initialValue);
        }
      }
    };

    initTagify();

    return () => {
      if (tagifyRef.current) {
        tagifyRef.current.destroy();
      }
    };
  }, [initialValue]);

  const updateParent = () => {
    if (tagifyRef.current && onChange) {
      onChange(tagifyRef.current.value);
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        className="bg-white"
        placeholder="输入标签..."
      />
    </div>
  );
};

export default TagifyComponent;
