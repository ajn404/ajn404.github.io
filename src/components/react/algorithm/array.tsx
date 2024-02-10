import { useEffect, useState } from "react";
import { dp } from "./dp";

interface Props {
  array: Array<number>;
  type?: Boolean;
}

function shuffleArray(arr: Array<number>) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // 随机选择一个索引
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // 交换两个元素
  }
  return shuffled;
}

export default ({ array, type = false }: Props) => {
  const [arr, setArr] = useState(structuredClone(array));
  if (!type) {
    setArr(shuffleArray(arr));
    useEffect(() => {
      let aId = 0;
      let startTime: number;
      let tag = false;
      const animate = () => {
        // let time = new Date().getTime();
        let time = performance.now();
        if (!startTime) {
          startTime = time;
        }
        if (!tag && time - startTime > 1500) {
          startTime = time;
          tag = true;
          setArr(shuffleArray(arr));
        }
        tag = false;
        aId = requestAnimationFrame(animate);
      };
      aId = requestAnimationFrame(animate);
      return () => {
        cancelAnimationFrame(aId);
      };
    });
  }

  let input = {
    p: [1, 5, 8, 9, 10, 17, 17, 20, 24, 30],
    n: 5,
  };
  const { p, n } = input;
  let output = dp(p, n);
  console.log(output);

  return (
    <div className="array flex w-full">
      {arr.map((item, index) => (
        <div
          className="flex-item border-indigo-600 flex-1  border-2 text-center"
          key={index}
        >
          {item}
        </div>
      ))}
    </div>
  );
};
