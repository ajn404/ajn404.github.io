import { useEffect } from "react";
import { driver } from "driver.js";

interface Pros {
  elements?: string;
}
export default ({ elements }: Pros) => {
  useEffect(() => {
    let steps: any[] = Array.from(JSON.parse(elements));
    if (steps && steps.length > 0) {
      steps.forEach(item => {
        let target: HTMLDivElement = document.querySelector(`${item.element}`);
        let randomColor = `rgb(${Math.floor(Math.random() * (255 - 100 + 1)) + 100},${Math.floor(Math.random() * (255 - 100 + 1)) + 100},${Math.floor(Math.random() * (255 - 100 + 1)) + 100})`;
        target.style.color = randomColor;
        target.style.cursor = "pointer";
        target.style.fontSize = "1.25rem";
        let driverObj;
        target.addEventListener("click", () => {
          if (driverObj) {
            driverObj.destroy();
            driverObj = null;
            return;
          }
          driverObj = driver({
            popoverClass: "driverjs-theme",
            stagePadding: 4,
          });

          driverObj.highlight({
            element: item.element,
            popover: item.popover,
          });
        });
      });
    }
  });

  return <></>;
};
