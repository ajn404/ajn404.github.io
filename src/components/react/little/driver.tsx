import { useEffect } from "react";
import { driver } from "driver.js";

interface Pros {
  elements?: string;
}
export default ({ elements }: Pros) => {
  const click = () => {
    if (elements && elements?.length > 0) {
      const driverObj = driver({
        showProgress: true,
        animate: true,
        steps: JSON.parse(elements),
      });
      driverObj.drive();
    }
  };

  useEffect(() => {
    let tag = 0;
    const keydown = (event: KeyboardEvent) => {
      const key = event.key;
      // 判断按下的键是否为Shift键和字母C
      if (tag === 1 && key === "h") {
        tag = 0;
        const driverObj = driver({
          showProgress: false,
          animate: true,
          steps: [{ popover: { title: "hh", description: "你真是个小天才" } }],
        });
        driverObj.drive();
        return;
      }
      if (key === "h") {
        tag += 1;
      }
    };
    window.addEventListener("keydown", keydown);

    return () => {
      window.removeEventListener("keydown", keydown);
    };
  });

  return (
    <div
      onClick={click}
      className=" cursor-pointer rounded-md p-3 text-skin-orange  hover:text-skin-purple hover:underline"
    >
      点击查看引导
    </div>
  );
};
