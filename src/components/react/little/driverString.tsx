import { useEffect } from "react";
import { driver } from "driver.js";

interface Pros {
  elements?: string;
}
export default ({ elements }: Pros) => {
  useEffect(() => {
    let steps: any[] = elements.split(",");
    if (steps && steps.length > 0) {
      steps.forEach(item => {
        let target: HTMLDivElement = document.querySelector(`.${item}`);
        if (!target) return;
        let randomColor = `rgb(${Math.floor(Math.random() * (255 - 100 + 1)) + 100},${Math.floor(Math.random() * (255 - 100 + 1)) + 100},${Math.floor(Math.random() * (255 - 100 + 1)) + 100})`;
        target.style.color = randomColor;
        target.style.cursor = "pointer";
        target.style.fontSize = "1.25rem";
        let { description } = target.dataset;
        let title = target.innerHTML;
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
            element: `.${item}`,
            popover: {
              description,
              title,
              side: "top",
              align: "start",
            },
          });
        });
      });
    }
  });

  return <></>;
};
