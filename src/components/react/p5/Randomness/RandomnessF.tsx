import type p5 from "p5";
import Basic from "../index";

export default () => {
  const common = (p: p5, sd = 0.41) => {
    const heights = [];
    p.setup = () => {
      p.createCanvas(p.windowWidth / 4, 100);
      p.background(255);
      const e = 2.71828183;
      let m = 0;
      for (let i = 0; i < p.width + 1; i++) {
        let xcoord = p.map(i, 0, p.width, -3, 3);
        let sq2pi = p.sqrt(2 * p.PI); //square root of 2 * PI
        let xmsq = -1 * (xcoord - m) * (xcoord - m); //-(x - mu)^2
        let sdsq = sd * sd; //variance (standard deviation squared)
        heights[i] = (1 / (sd * sq2pi)) * p.pow(e, xmsq / sdsq); //P(x) function
      }

      p.stroke(0);
      p.strokeWeight(2);
      p.noFill();
      p.beginShape();
      for (let i = 0; i < heights.length; i++) {
        let x = i;
        let y = p.map(heights[i], 0, 1, p.height - 2, 2);
        p.vertex(x, y);
      }
      p.endShape();
    };
    p.windowResized = () => {
      p.setup();
    };
  };
  const sketchA = (p: p5) => common(p, 0.41);
  const sketchB = (p: p5) => common(p, 1.5);

  return (
    <>
      <div className="flex justify-around">
        <Basic sketch={sketchA}></Basic>
        <Basic sketch={sketchB}></Basic>
      </div>
    </>
  );
};
