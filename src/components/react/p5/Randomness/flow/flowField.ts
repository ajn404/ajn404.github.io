// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

import type p5 from "p5";

export class FlowField {
  resolution: number;
  cols: number;
  rows: number;
  field: number[];
  constructor(r, p: p5) {
    this.resolution = r;
    this.cols = p.floor(p.width / this.resolution);
    this.rows = p.floor(p.height / this.resolution);
    this.field = make2Darray(this.cols, this.rows);
  }

  async init(p: p5) {
    p.noiseSeed(p.random(10000));
    let xoff = 0;
    for (let i = 0; i < this.cols; i++) {
      let yoff = 0;
      for (let j = 0; j < this.rows; j++) {
        let angle = p.map(p.noise(xoff, yoff), 0, 1, 0, p.TWO_PI);
        const p5 = await import("p5");
        this.field[i][j] = p5.Vector.fromAngle(angle);
        yoff += 0.1;
      }
      xoff += 0.1;
    }
  }
  display(p: p5) {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        drawVector(
          this.field[i][j],
          i * this.resolution,
          j * this.resolution,
          this.resolution - 2,
          p
        );
      }
    }
  }
  lookup(lookup, p: p5) {
    let column = p.constrain(
      p.floor(lookup.x / this.resolution),
      0,
      this.cols - 1
    );
    let row = p.constrain(
      p.floor(lookup.y / this.resolution),
      0,
      this.rows - 1
    );
    return this.field[column][row].copy();
  }
}
function make2Darray(cols, rows) {
  let array = new Array(cols);
  for (let i = 0; i < cols; i++) {
    array[i] = new Array(rows);
  }
  return array;
}
function drawVector(v, x, y, scayl, p: p5) {
  p.push();
  let arrowsize = 4;
  p.translate(x, y);
  p.strokeWeight(1);
  p.stroke(127);
  p.rotate(v.heading());
  let len = v.mag() * scayl;
  p.line(0, 0, len, 0);
  //line(len,0,len-arrowsize,+arrowsize/2);
  //line(len,0,len-arrowsize,-arrowsize/2);
  p.pop();
}
