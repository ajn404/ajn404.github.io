import { distance, Point } from "../basic/point";
import { loopNoise, normRand, poly, randChoice } from "../basic/utils";
import { Noise } from "../basic/perlinNoise";
import { div, stroke, texture } from "./brushes";
import {
  tree01,
  tree02,
  tree03,
  tree04,
  tree05,
  tree06,
  tree07,
  tree08,
} from "./tree";
import { arch01, arch02, arch03, arch04, transmissionTower01 } from "./arch";
import { midPt, triangulate } from "../basic/polytools";
import { Bound } from "../basic/range";
import { PRNG } from "../basic/PRNG";
import { type ISvgElement, SvgPolyline } from "../svg";
import { Chunk } from "../basic/chunk";

export function foot(
  prng: PRNG,
  ptlist: Point[][],
  xoff: number = 0,
  yoff: number = 0
): SvgPolyline[] {
  const ftlist: Point[][] = [];
  const span = 10;
  let ni = 0;
  for (let i = 0; i < ptlist.length - 2; i += 1) {
    if (i === ni) {
      ni = Math.min(ni + randChoice(prng, [1, 2]), ptlist.length - 1);

      ftlist.push([]);
      ftlist.push([]);
      for (let j = 0; j < Math.min(ptlist[i].length / 8, 10); j++) {
        ftlist[ftlist.length - 2].push(
          new Point(
            ptlist[i][j].x + Noise.noise(prng, j * 0.1, i) * 10,
            ptlist[i][j].y
          )
        );
        ftlist[ftlist.length - 1].push(
          new Point(
            ptlist[i][ptlist[i].length - 1 - j].x -
              Noise.noise(prng, j * 0.1, i) * 10,
            ptlist[i][ptlist[i].length - 1 - j].y
          )
        );
      }

      ftlist[ftlist.length - 2] = ftlist[ftlist.length - 2].reverse();
      ftlist[ftlist.length - 1] = ftlist[ftlist.length - 1].reverse();
      for (let j = 0; j < span; j++) {
        const p = j / span;
        const x1 = ptlist[i][0].x * (1 - p) + ptlist[ni][0].x * p;
        let y1 = ptlist[i][0].y * (1 - p) + ptlist[ni][0].y * p;

        const x2 =
          ptlist[i][ptlist[i].length - 1].x * (1 - p) +
          ptlist[ni][ptlist[i].length - 1].x * p;
        let y2 =
          ptlist[i][ptlist[i].length - 1].y * (1 - p) +
          ptlist[ni][ptlist[i].length - 1].y * p;

        const vib = -1.7 * (p - 1) * Math.pow(p, 1 / 5);
        y1 += vib * 5 + Noise.noise(prng, xoff * 0.05, i) * 5;
        y2 += vib * 5 + Noise.noise(prng, xoff * 0.05, i) * 5;

        ftlist[ftlist.length - 2].push(new Point(x1, y1));
        ftlist[ftlist.length - 1].push(new Point(x2, y2));
      }
    }
  }

  const polylines: SvgPolyline[] = [];

  for (let i = 0; i < ftlist.length; i++) {
    polylines.push(poly(ftlist[i], xoff, yoff, "white", "none"));
  }
  for (let j = 0; j < ftlist.length; j++) {
    const color = `rgba(100,100,100,${prng.random(0.1, 0.2).toFixed(3)})`;
    polylines.push(
      stroke(
        prng,
        ftlist[j].map(function (p) {
          return new Point(p.x + xoff, p.y + yoff);
        }),
        color,
        color,
        1
      )
    );
  }
  return polylines;
}

function vegetate(
  ptlist: Point[][],
  treeFunc: (x: number, y: number) => ISvgElement[],
  growthRule: (i: number, j: number) => boolean,
  proofRule: (pl: Point[], i: number) => boolean
): ISvgElement[] {
  const elementlists: ISvgElement[][] = [];
  const veglist: Point[] = [];
  for (let i = 0; i < ptlist.length; i += 1) {
    for (let j = 0; j < ptlist[i].length; j += 1) {
      if (growthRule(i, j)) {
        veglist.push(ptlist[i][j].copy());
      }
    }
  }
  for (let i = 0; i < veglist.length; i++) {
    if (proofRule(veglist, i)) {
      elementlists.push(treeFunc(veglist[i].x, veglist[i].y));
    }
  }
  return elementlists.flat();
}

export function mountain(
  prng: PRNG,
  xoff: number,
  yoff: number,
  seed: number = 0
): Chunk {
  const hei: number = prng.random(100, 500);
  const strokeWidth: number = prng.random(400, 600);
  const tex: number = 200;
  const veg: boolean = true;

  const elementlists: ISvgElement[][] = [];

  const ptlist: Point[][] = [];
  const h = hei;
  const w = strokeWidth;
  const reso = [10, 50];

  let hoff = 0;
  for (let j = 0; j < reso[0]; j++) {
    hoff += prng.random(0, yoff / 100);
    ptlist.push([]);
    for (let i = 0; i < reso[1]; i++) {
      const x = (i / reso[1] - 0.5) * Math.PI;
      const y = Math.cos(x) * Noise.noise(prng, x + 10, j * 0.15, seed);
      const p = 1 - j / reso[0];
      ptlist[ptlist.length - 1].push(
        new Point((x / Math.PI) * w * p, -y * h * p + hoff)
      );
    }
  }

  //RIM
  elementlists.push(
    vegetate(
      ptlist,
      function (x, y) {
        const noise = Noise.noise(prng, 0.01 * x, 0.01 * y) * 0.5 * 0.3 + 0.5;
        return tree02(
          prng,
          x + xoff,
          y + yoff - 5,
          `rgba(100,100,100,${noise.toFixed(3)})`,
          2
        );
      },
      function (i, j) {
        const noise = Noise.noise(prng, j * 0.1, seed);
        return (
          i === 0 &&
          noise * noise * noise < 0.1 &&
          Math.abs(ptlist[i][j].y) / h > 0.2
        );
      },
      (_v, _i) => true
    )
  );

  //WHITE BG
  elementlists.push([
    poly(
      ptlist[0].concat([new Point(0, reso[0] * 4)]),
      xoff,
      yoff,
      "white",
      "none"
    ),
  ]);
  //OUTLINE
  elementlists.push([
    stroke(
      prng,
      ptlist[0].map(function (p) {
        return new Point(p.x + xoff, p.y + yoff);
      }),
      "rgba(100,100,100,0.3)",
      "rgba(100,100,100,0.3)",
      3,
      1
    ),
  ]);

  elementlists.push(foot(prng, ptlist, xoff, yoff));

  elementlists.push(
    texture(
      prng,
      ptlist,
      xoff,
      yoff,
      tex,
      1.5,
      randChoice(prng, [0, 0, 0, 0, 5])
    )
  );

  //TOP
  elementlists.push(
    vegetate(
      ptlist,
      function (x, y) {
        const noise = Noise.noise(prng, 0.01 * x, 0.01 * y) * 0.5 * 0.3 + 0.5;
        return tree02(
          prng,
          x + xoff,
          y + yoff,
          `rgba(100,100,100,${noise.toFixed(3)})`
        );
      },
      function (i, j) {
        const noise = Noise.noise(prng, i * 0.1, j * 0.1, seed + 2);
        return Math.pow(noise, 3) < 0.1 && Math.abs(ptlist[i][j].y) / h > 0.5;
      },
      (_v, _i) => true
    )
  );

  if (veg) {
    //MIDDLE
    elementlists.push(
      vegetate(
        ptlist,
        function (x, y) {
          const ht = ((h + y) / h) * 70 * prng.random(0.3, 1);
          const noise = Noise.noise(prng, 0.01 * x, 0.01 * y) * 0.5 * 0.3 + 0.3;
          return tree01(
            prng,
            x + xoff,
            y + yoff,
            ht,
            prng.random(1, 4),
            `rgba(100,100,100,${noise.toFixed(3)})`
          );
        },
        function (i, j): boolean {
          const noise = Noise.noise(prng, i * 0.2, j * 0.05, seed);
          return (
            j % 2 !== 0 &&
            Math.pow(noise, 4) < 0.012 &&
            Math.abs(ptlist[i][j].y) / h < 0.3
          );
        },
        function (veglist, i) {
          const cnt = veglist.reduce<number>(
            (s: number, p: Point, j: number) =>
              s + (i !== j && distance(veglist[i], p) < 30 ? 1 : 0),
            0
          );
          return cnt > 2;
        }
      )
    );

    //BOTTOM
    elementlists.push(
      vegetate(
        ptlist,
        function (x, y) {
          const ht = ((h + y) / h) * prng.random(60, 120);
          const bc = prng.random(0, 0.1);
          const bp = 1;
          const noise = Noise.noise(prng, 0.01 * x, 0.01 * y) * 0.5 * 0.3 + 0.3;
          return tree03(
            prng,
            x + xoff,
            y + yoff,
            ht,
            `rgba(100,100,100,${noise.toFixed(3)})`,
            x => Math.pow(x * bc, bp)
          );
        },
        function (i, j) {
          const noise = Noise.noise(prng, i * 0.2, j * 0.05, seed);
          return (
            (j === 0 || j === ptlist[i].length - 1) &&
            Math.pow(noise, 4) < 0.012
          );
        },
        (_veglist, _i) => true
      )
    );
  }

  //BOTT ARCH
  elementlists.push(
    vegetate(
      ptlist,
      function (x, y): ISvgElement[] {
        const tt = randChoice(prng, [0, 0, 1, 1, 1, 2]);
        if (tt === 1) {
          return arch02(
            prng,
            x + xoff,
            y + yoff,
            seed,
            normRand(prng, 40, 70),
            randChoice(prng, [1, 2, 2, 3]),
            prng.random(),
            randChoice(prng, [1, 2, 3])
          );
        } else if (tt === 2) {
          return arch04(
            prng,
            x + xoff,
            y + yoff,
            seed,
            randChoice(prng, [1, 1, 1, 2, 2])
          );
        } else {
          return [];
        }
      },
      function (i, j) {
        const ns = Noise.noise(prng, i * 0.2, j * 0.05, seed + 10);
        return (
          i !== 0 &&
          (j === 1 || j === ptlist[i].length - 2) &&
          ns * ns * ns * ns < 0.008
        );
      },
      (_veglist, _i) => true
    )
  );
  //TOP ARCH
  elementlists.push(
    vegetate(
      ptlist,
      function (x, y) {
        return arch03(
          prng,
          x + xoff,
          y + yoff,
          seed,
          prng.random(40, 20),
          randChoice(prng, [5, 7])
        );
      },
      function (i, j) {
        return (
          i === 1 &&
          Math.abs(j - ptlist[i].length / 2) < 1 &&
          prng.random() < 0.02
        );
      },
      (_veglist, _i) => true
    )
  );

  //TRANSM
  elementlists.push(
    vegetate(
      ptlist,
      function (x, y) {
        return transmissionTower01(prng, x + xoff, y + yoff, seed);
      },
      function (i, j) {
        const noise = Noise.noise(prng, i * 0.2, j * 0.05, seed + 20 * Math.PI);
        return (
          i % 2 === 0 &&
          (j === 1 || j === ptlist[i].length - 2) &&
          Math.pow(noise, 4) < 0.002
        );
      },
      (_veglist, _i) => true
    )
  );

  //BOTT ROCK
  elementlists.push(
    vegetate(
      ptlist,
      function (x, y) {
        return rock(
          prng,
          x + xoff,
          y + yoff,
          seed,
          prng.random(20, 40),
          2,
          prng.random(20, 40)
        );
      },
      function (i, j) {
        return (j === 0 || j === ptlist[i].length - 1) && prng.random() < 0.1;
      },
      (_veglist, _i) => true
    )
  );

  const chunk: Chunk = new Chunk("mount", xoff, yoff, elementlists.flat());
  return chunk;
}

function bound(plist: Point[]): Bound {
  let xmin = plist[0].x;
  let xmax = plist[0].x;
  let ymin = plist[0].y;
  let ymax = plist[0].y;
  plist.forEach(i => {
    if (i.x < xmin) {
      xmin = i.x;
    }
    if (i.x > xmax) {
      xmax = i.x;
    }
    if (i.y < ymin) {
      ymin = i.y;
    }
    if (i.y > ymax) {
      ymax = i.y;
    }
  });
  return new Bound(xmin, xmax, ymin, ymax);
}

export function flatMount(
  prng: PRNG,
  xoff: number,
  yoff: number,
  seed: number = 0,
  hei: number = prng.random(40, 440),
  cho: number = 0.5,
  strokeWidth: number = prng.random(400, 600)
): Chunk {
  const tex: number = 80;

  const polylinelists: SvgPolyline[][] = [];
  const ptlist: Point[][] = [];
  const reso = [5, 50];
  let hoff = 0;
  const flat: Point[][] = [];
  for (let j = 0; j < reso[0]; j++) {
    hoff += prng.random(0, yoff / 100);
    ptlist.push([]);
    flat.push([]);
    for (let i = 0; i < reso[1]; i++) {
      const x = (i / reso[1] - 0.5) * Math.PI;
      const y =
        (Math.cos(x * 2) + 1) * Noise.noise(prng, x + 10, j * 0.1, seed);
      const p = 1 - (j / reso[0]) * 0.6;
      const nx = (x / Math.PI) * strokeWidth * p;
      let ny = -y * hei * p + hoff;
      const h = 100;
      if (ny < -h * cho + hoff) {
        ny = -h * cho + hoff;
        if (flat[flat.length - 1].length % 2 === 0) {
          flat[flat.length - 1].push(new Point(nx, ny));
        }
      } else {
        if (flat[flat.length - 1].length % 2 === 1) {
          flat[flat.length - 1].push(
            ptlist[ptlist.length - 1][ptlist[ptlist.length - 1].length - 1]
          );
        }
      }

      ptlist[ptlist.length - 1].push(new Point(nx, ny));
    }
  }

  //WHITE BG
  polylinelists.push([
    poly(
      ptlist[0].concat([new Point(0, reso[0] * 4)]),
      xoff,
      yoff,
      "white",
      "none"
    ),
  ]);
  //OUTLINE
  polylinelists.push([
    stroke(
      prng,
      ptlist[0].map(function (p: Point) {
        return new Point(p.x + xoff, p.y + yoff);
      }),
      "rgba(100,100,100,0.3)",
      "rgba(100,100,100,0.3)",
      3,
      1
    ),
  ]);

  //canv += foot(ptlist,{xof:xoff,yof:yoff})
  polylinelists.push(
    texture(
      prng,
      ptlist,
      xoff,
      yoff,
      tex,
      2,
      0,
      _ => `rgba(100,100,100,${prng.random(0, 0.3).toFixed(3)})`,
      () => 0.5 + prng.randsign() * prng.random(0, 0.4)
    )
  );
  const _grlist1: Point[] = [];
  const _grlist2: Point[] = [];
  for (let i = 0; i < flat.length; i += 2) {
    if (flat[i].length >= 2) {
      _grlist1.push(flat[i][0]);
      _grlist2.push(flat[i][flat[i].length - 1]);
    }
  }

  if (_grlist1.length === 0) {
    const chunk = new Chunk("flatmount", xoff, yoff, polylinelists.flat());
    return chunk;
  }

  const _wb = [_grlist1[0].x, _grlist2[0].x];
  for (let i = 0; i < 3; i++) {
    const p = 0.8 - i * 0.2;

    _grlist1.unshift(new Point(_wb[0] * p, _grlist1[0].y - 5));
    _grlist2.unshift(new Point(_wb[1] * p, _grlist2[0].y - 5));
  }

  const wb = [_grlist1[_grlist1.length - 1].x, _grlist2[_grlist2.length - 1].x];

  for (let i = 0; i < 3; i++) {
    const p = 0.6 - i * i * 0.1;
    _grlist1.push(new Point(wb[0] * p, _grlist1[_grlist1.length - 1].y + 1));
    _grlist2.push(new Point(wb[1] * p, _grlist2[_grlist2.length - 1].y + 1));
  }

  const d = 5;
  const grlist1 = div(_grlist1, d);
  const grlist2 = div(_grlist2, d);

  const grlist = grlist1.reverse().concat(grlist2.concat([grlist1[0]]));
  for (let i = 0; i < grlist.length; i++) {
    const v = (1 - Math.abs((i % d) - d / 2) / (d / 2)) * 0.12;
    grlist[i].x *= 1 - v + Noise.noise(prng, grlist[i].y * 0.5) * v;
  }
  /*       for (const i = 0; i < ptlist.length; i++){
              canv += poly(ptlist[i],{xof:xoff,yof:yoff,stroke:"red",fill:"none",strokeWidth:2})
            }
       */
  polylinelists.push([poly(grlist, xoff, yoff, "white", "none", 2)]);
  polylinelists.push([
    stroke(
      prng,
      grlist.map((p: Point) => new Point(p.x + xoff, p.y + yoff)),
      "rgba(100,100,100,0.2)",
      "rgba(100,100,100,0.2)",
      3
    ),
  ]);

  polylinelists.push(flatDec(prng, xoff, yoff, bound(grlist)));

  const chunk = new Chunk("flatmount", xoff, yoff, polylinelists.flat());
  return chunk;
}

export function flatDec(
  prng: PRNG,
  xoff: number,
  yoff: number,
  grbd: Bound
): SvgPolyline[] {
  const polylinelists: SvgPolyline[][] = [];

  const tt = randChoice(prng, [0, 0, 1, 2, 3, 4]);

  for (let j = 0; j < prng.random(0, 5); j++) {
    polylinelists.push(
      rock(
        prng,
        xoff + normRand(prng, grbd.xmin, grbd.xmax),
        yoff + (grbd.ymin + grbd.ymax) / 2 + normRand(prng, -10, 10) + 10,
        prng.random(0, 100),
        prng.random(10, 30),
        2,
        prng.random(10, 30)
      )
    );
  }
  for (let j = 0; j < randChoice(prng, [0, 0, 1, 2]); j++) {
    const xr = xoff + normRand(prng, grbd.xmin, grbd.xmax);
    const yr = yoff + (grbd.ymin + grbd.ymax) / 2 + normRand(prng, -5, 5) + 20;
    for (let k = 0; k < prng.random(2, 5); k++) {
      polylinelists.push(
        tree08(
          prng,
          xr +
            Math.min(Math.max(normRand(prng, -30, 30), grbd.xmin), grbd.xmax),
          yr,
          prng.random(60, 100)
        )
      );
    }
  }

  if (tt === 0) {
    for (let j = 0; j < prng.random(0, 3); j++) {
      polylinelists.push(
        rock(
          prng,
          xoff + normRand(prng, grbd.xmin, grbd.xmax),
          yoff + (grbd.ymin + grbd.ymax) / 2 + normRand(prng, -5, 5) + 20,
          prng.random(0, 100),
          prng.random(40, 60),
          5,
          prng.random(50, 70)
        )
      );
    }
  }
  if (tt === 1) {
    const xmid = (grbd.xmin + grbd.xmax) / 2;
    const xmin = prng.random(grbd.xmin, xmid);
    const xmax = prng.random(xmid, grbd.xmax);
    for (let i = xmin; i < xmax; i += 30) {
      polylinelists.push(
        tree05(
          prng,
          xoff + i + 20 * normRand(prng, -1, 1),
          yoff + (grbd.ymin + grbd.ymax) / 2 + 20,
          prng.random(100, 300)
        )
      );
    }
    for (let j = 0; j < prng.random(0, 4); j++) {
      polylinelists.push(
        rock(
          prng,
          xoff + normRand(prng, grbd.xmin, grbd.xmax),
          yoff + (grbd.ymin + grbd.ymax) / 2 + normRand(prng, -5, 5) + 20,
          prng.random(0, 100),
          prng.random(40, 60),
          5,
          prng.random(50, 70)
        )
      );
    }
  } else if (tt === 2) {
    for (let i = 0; i < randChoice(prng, [1, 1, 1, 1, 2, 2, 3]); i++) {
      const xr = normRand(prng, grbd.xmin, grbd.xmax);
      const yr = (grbd.ymin + grbd.ymax) / 2;
      polylinelists.push(tree04(prng, xoff + xr, yoff + yr + 20));
      for (let j = 0; j < prng.random(0, 2); j++) {
        polylinelists.push(
          rock(
            prng,
            xoff +
              Math.max(
                grbd.xmin,
                Math.min(grbd.xmax, xr + normRand(prng, -50, 50))
              ),
            yoff + yr + normRand(prng, -5, 5) + 20,
            prng.random(100 * i * j),
            prng.random(40, 60),
            5,
            prng.random(50, 70)
          )
        );
      }
    }
  } else if (tt === 3) {
    for (let i = 0; i < randChoice(prng, [1, 1, 1, 1, 2, 2, 3]); i++) {
      polylinelists.push(
        tree06(
          prng,
          xoff + normRand(prng, grbd.xmin, grbd.xmax),
          yoff + (grbd.ymin + grbd.ymax) / 2,
          prng.random(60, 120)
        )
      );
    }
  } else if (tt === 4) {
    const xmid = (grbd.xmin + grbd.xmax) / 2;
    const xmin = prng.random(grbd.xmin, xmid);
    const xmax = prng.random(xmid, grbd.xmax);
    for (let i = xmin; i < xmax; i += 20) {
      polylinelists.push(
        tree07(
          prng,
          xoff + i + 20 * normRand(prng, -1, 1),
          yoff + (grbd.ymin + grbd.ymax) / 2 + normRand(prng, -1, 1) + 0,
          normRand(prng, 40, 80)
        )
      );
    }
  }

  for (let i = 0; i < prng.random(0, 50); i++) {
    polylinelists.push(
      tree02(
        prng,
        xoff + normRand(prng, grbd.xmin, grbd.xmax),
        yoff + normRand(prng, grbd.ymin, grbd.ymax)
      )
    );
  }

  const ts = randChoice(prng, [0, 0, 0, 0, 1]);
  if (ts === 1 && tt !== 4) {
    polylinelists.push(
      arch01(
        prng,
        xoff + normRand(prng, grbd.xmin, grbd.xmax),
        yoff + (grbd.ymin + grbd.ymax) / 2 + 20,
        prng.random(),
        normRand(prng, 80, 100),
        normRand(prng, 160, 200),
        prng.random()
      )
    );
  }

  return polylinelists.flat();
}

export function distMount(
  prng: PRNG,
  xoff: number,
  yoff: number,
  seed: number = 0,
  hei: number = 300,
  len: number = 2000
): Chunk {
  const seg = 5;
  const polylines: SvgPolyline[] = [];
  const span = 10;

  const ptlist: Point[][] = [];

  for (let i = 0; i < len / span / seg; i++) {
    ptlist.push([]);
    for (let j = 0; j < seg + 1; j++) {
      const tran = (k: number) =>
        new Point(
          xoff + k * span,
          yoff -
            hei *
              Noise.noise(prng, k * 0.05, seed) *
              Math.pow(Math.sin((Math.PI * k) / (len / span)), 0.5)
        );
      ptlist[ptlist.length - 1].push(tran(i * seg + j));
    }
    for (let j = 0; j < seg / 2 + 1; j++) {
      const tran = (k: number) =>
        new Point(
          xoff + k * span,
          yoff +
            24 *
              Noise.noise(prng, k * 0.05, 2, seed) *
              Math.pow(Math.sin((Math.PI * k) / (len / span)), 1)
        );
      ptlist[ptlist.length - 1].unshift(tran(i * seg + j * 2));
    }
  }
  for (let i = 0; i < ptlist.length; i++) {
    const getCol = function (x: number, y: number) {
      const c = Noise.noise(prng, x * 0.02, y * 0.02, yoff) * 55 + 200;
      return `rgb(${c},${c},${c})`;
    };
    const pe = ptlist[i][ptlist[i].length - 1];
    polylines.push(poly(ptlist[i], 0, 0, getCol(pe.x, pe.y), "none", 1));

    const T = triangulate(ptlist[i], 100, true, false);
    for (let k = 0; k < T.length; k++) {
      const m = midPt(T[k]);
      const co = getCol(m.x, m.y);
      polylines.push(poly(T[k], 0, 0, co, co, 1));
    }
  }

  const chunk: Chunk = new Chunk("distmount", xoff, yoff, polylines);
  return chunk;
}

export function rock(
  prng: PRNG,
  xoff: number,
  yoff: number,
  seed: number = 0,
  hei: number = 80,
  sha: number = 10,
  strokeWidth: number = 100
): SvgPolyline[] {
  const tex = 40;

  const polylinelists: SvgPolyline[][] = [];

  const reso = [10, 50];
  const ptlist: Point[][] = [];

  for (let i = 0; i < reso[0]; i++) {
    ptlist.push([]);

    const nslist = [];
    for (let j = 0; j < reso[1]; j++) {
      nslist.push(Noise.noise(prng, i, j * 0.2, seed));
    }
    loopNoise(nslist);

    for (let j = 0; j < reso[1]; j++) {
      const a = (j / reso[1]) * Math.PI * 2 - Math.PI / 2;
      let l =
        (strokeWidth * hei) /
        Math.sqrt(
          Math.pow(hei * Math.cos(a), 2) +
            Math.pow(strokeWidth * Math.sin(a), 2)
        );

      /*           const l = Math.sin(a)>0? Math.pow(Math.sin(a),0.1)*strokeWidth
                                       : - Math.pow(Math.sin(a+Math.PI),0.1)*strokeWidth */
      l *= 0.7 + 0.3 * nslist[j];

      const p = 1 - i / reso[0];

      const nx = Math.cos(a) * l * p;
      let ny = -Math.sin(a) * l * p;

      if (Math.PI < a || a < 0) {
        ny *= 0.2;
      }

      ny += hei * (i / reso[0]) * 0.2;

      ptlist[ptlist.length - 1].push(new Point(nx, ny));
    }
  }

  //WHITE BG
  polylinelists.push([
    poly(ptlist[0].concat([new Point(0, 0)]), xoff, yoff, "white", "none"),
  ]);
  //OUTLINE
  polylinelists.push([
    stroke(
      prng,
      ptlist[0].map(function (p) {
        return new Point(p.x + xoff, p.y + yoff);
      }),
      "rgba(100,100,100,0.3)",
      "rgba(100,100,100,0.3)",
      3,
      1
    ),
  ]);
  polylinelists.push(
    texture(
      prng,
      ptlist,
      xoff,
      yoff,
      tex,
      3,
      sha,
      _ => `rgba(180,180,180,${prng.random(0.3, 0.6).toFixed(3)})`,
      () => 0.5 + prng.randsign() * prng.random(0.2, 0.35)
    )
  );

  // for (let i = 0; i < reso[0]; i++) {
  //   //canv += poly(ptlist[i],{xof:xoff,yof:yoff,fill:"none",stroke:"red",strokeWidth:2})
  // }
  return polylinelists.flat();
}
