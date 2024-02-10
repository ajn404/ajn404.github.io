import { useEffect } from "react";
import { annotate, annotationGroup } from "rough-notation";
// Or using unpkg
// import { annotate } from 'https://unpkg.com/rough-notation?module';

export default () => {
  useEffect(() => {
    const a1 = annotate(document.querySelector("#e1"), { type: "underline" });
    const a2 = annotate(document.querySelector("#e2"), { type: "box" });
    const a3 = annotate(document.querySelector("#e3"), { type: "circle" });

    const ag = annotationGroup([a3, a1, a2]);
    ag.show();
  });
  return (
    <>
      <div className="flex text-skin-base gap-8 ">
        <span id="e1">e1</span>
        <span id="e2">e2</span>
        <span id="e3">e3</span>
      </div>
    </>
  );
};
