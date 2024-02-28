import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";

const make2DArray = (cols: number, rows: number) => {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
};

export default () => {
  const sketch = (p: p5) => {
    class Terrain {
      scl: number;
      w: number;
      h: number;
      z: number[][];
      zoff: number;
      cols: number;
      rows: number;
      constructor(scl, w, h) {
        this.scl = scl;
        this.w = w;
        this.h = h;
        this.cols = p.floor(w / scl);
        this.rows = p.floor(h / scl);
        this.z = make2DArray(this.cols, this.rows);
        this.zoff = 0;
      }
      calculate() {
        let xoff = 0;
        for (let i = 0; i < this.cols; i++) {
          let yoff = 0;
          for (let j = 0; j < this.rows; j++) {
            this.z[i][j] = p.map(
              p.noise(xoff, yoff, this.zoff),
              0,
              1,
              -120,
              120
            );
            yoff += 0.1;
          }
          xoff += 0.1;
        }
        this.zoff += 0.01;
      }

      render() {
        for (let x = 0; x < this.z.length - 1; x++) {
          p.beginShape(p.TRIANGLE_STRIP);
          for (let y = 0; y < this.z[x].length; y++) {
            p.stroke(0);
            let currentElevation = this.z[x][y];
            let currentShade = p.map(currentElevation, -120, 120, 0, 255);
            p.fill(currentShade, 255);
            let xCoordinate = x * this.scl - this.w / 2;
            let yCoordinate = y * this.scl - this.h / 2;
            p.vertex(xCoordinate, yCoordinate, this.z[x][y]);
            p.vertex(xCoordinate + this.scl, yCoordinate, this.z[x + 1][y]);
          }
          p.endShape();
        }
      }
    }

    let land;
    let theta = 0.0;

    const setup = () => {
      p.createCanvas(p.windowWidth / 2, 400, p.WEBGL);
      land = new Terrain(10, p.windowWidth / 2 - 20, 400);
    };
    const draw = () => {
      p.orbitControl();
      land.calculate();
      p.background(255);
      p.push();
      p.translate(0, 20, -100);
      p.rotateX(p.PI / 3);
      p.rotateZ(theta);
      land.render();
      p.pop();
      theta += 0.0025;
    };
    const resize = () => p.setup();
    p.setup = setup;
    p.draw = draw;
    p.windowResized = resize;
  };
  return <Basic sketch={sketch} showControls></Basic>;
};
