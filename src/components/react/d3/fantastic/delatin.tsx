import Delatin from "delatin";
import { useEffect } from "react";
import data from "./volcano.json";
import d3 from "d3";
export default () => {
  useEffect(() => {
    const tin = new Delatin(data.values, data.width, data.height);
    tin.run(2);
    tin.getMaxError();
  });
  return;
  <></>;
};
