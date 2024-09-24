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

  console.log(elements);

  return <></>;
};
