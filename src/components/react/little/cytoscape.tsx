import cytoscape from "cytoscape";
import sbgnStylesheet from "cytoscape-sbgn-stylesheet";
import { useEffect, type FC } from "react";
import elements from "./cy.json";

const Cytoscape: FC = () => {
  useEffect(() => {
    const cy = cytoscape({
      container: document.getElementById("cy"),
      style: sbgnStylesheet(cytoscape),
      elements,
      layout: { name: "preset" },
      // other arguments here
    });
    console.log(cy);
  });
  return (
    <>
      <div
        id="cy"
        className="w-full h-[100vh] z-50 absolute left-0 top-0"
      ></div>
    </>
  );
};
export default Cytoscape;
