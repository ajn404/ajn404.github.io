import React, { useEffect, useRef, useState } from "react";

interface SvgTextProps {
  text: string; // 可变的文字内容
  height?: number; // SVG 高度
  fontSize?: number; // 字体大小
  stroke?: string;
  className?: string;
}
// 动画产生的原因是为动态的strokeDashoffset
const SvgText: React.FC<SvgTextProps> = ({
  text,
  height = 100,
  fontSize = 60,
  stroke = "black",
  className = "",
}) => {
  const [offset, setOffset] = useState(300); // 初始的 stroke-dashoffset 值
  const [width, setWidth] = useState(0); // 动态宽度
  const textRef = useRef<SVGTextElement | null>(null); // 引用文本元素

  useEffect(() => {
    const animate = () => {
      let start = 300; // strokeDasharray 的值
      let end = 0; // 动画结束时的值
      let duration = 5000; // 动画持续时间
      let startTime: number | null = null;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const currentOffset = Math.max(
          end,
          start - (start * progress) / duration
        );
        setOffset(currentOffset);

        if (progress < duration) {
          requestAnimationFrame(step);
        } else {
          // requestAnimationFrame(step); // 重新开始动画
          setTimeout(() => {
            // 动画完成后重置 offset 并重新开始动画
            setOffset(300); // 重置为初始值
            startTime = null; // 重置开始时间
            animate();
          }, 5000);
        }
      };

      requestAnimationFrame(step);
    };

    animate();
  }, []);

  useEffect(() => {
    if (textRef.current) {
      const bbox = textRef.current.getBBox(); // 获取文本的边界框
      setWidth(bbox.width + 20); // 设置宽度，增加一些边距
    }
  }, [text]);

  return (
    <svg width={width} height={height} className={className}>
      <text
        ref={textRef}
        x="50%"
        y="80"
        fontSize={fontSize}
        textAnchor="middle"
        fontWeight="bold"
        fill="none"
        stroke={stroke}
        strokeDasharray="300"
        strokeDashoffset={offset}
      >
        {text}
      </text>
    </svg>
  );
};

export default SvgText;
