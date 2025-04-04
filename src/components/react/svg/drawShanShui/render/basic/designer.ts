import { DesignChunk, type IChunk } from "./chunk";
import { Noise } from "./perlinNoise";
import { Point } from "./point";
import { PRNG } from "./PRNG";

/**
 * whether f(x, y) is max value in rect(x - r, y - r, x + r, y + r)
 * @param p center point
 * @param f
 * @param r radius
 * @returns
 */
function locmax(p: Point, f: (p: Point) => number, r: number): boolean {
  const z0 = f(p);

  const np = new Point();
  for (np.x = p.x - r; np.x < p.x + r; np.x++) {
    for (np.y = p.y - r; np.y < p.y + r; np.y++) {
      if (z0 < f(np)) {
        return false;
      }
    }
  }

  return true;
}

function needAdd(reg: IChunk[], c: IChunk, r: number = 10): boolean {
  for (let k = 0; k < reg.length; k++) {
    if (Math.abs(reg[k].x - c.x) < r) {
      return false;
    }
  }
  return true;
}

export function design(
  prng: PRNG,
  mountain_cover: number[],
  xmin: number,
  xmax: number
): IChunk[] {
  const reg: IChunk[] = [];
  const samp = 0.03;
  const ns = (p: Point) =>
    Math.max(Noise.noise(prng, p.x * samp) - 0.55, 0) * 2;
  const yr = (x: number) => Noise.noise(prng, x * 0.01, Math.PI);

  const xstep = 5;
  const mwid = 200;

  const imin = Math.floor(xmin / xstep),
    imax = Math.floor(xmax / xstep);
  const ioff = (xmin % xstep) + (xmin < 0 ? 1 : 0) * xstep;

  for (let i = imin; i < imax; i++) {
    if (isNaN(mountain_cover[i])) mountain_cover[i] = 0;
  }

  for (let i = imin; i < imax; i++) {
    const x = i * xstep + ioff;
    for (let j = 0; j < yr(x) * 480; j += 30) {
      if (ns(new Point(x, j)) > 0.3 && locmax(new Point(x, j), ns, 2)) {
        const xof = x + prng.random(-500, 500);
        const yof = j + 300;
        const r = new DesignChunk("mount", xof, yof, ns(new Point(x, j)));
        if (needAdd(reg, r)) {
          reg.push(r);
          for (
            let k = Math.floor((xof - mwid) / xstep);
            k < (xof + mwid) / xstep;
            k++
          ) {
            mountain_cover[k] = isNaN(mountain_cover[k])
              ? 1
              : mountain_cover[k] + 1;
          }
        }
      }
    }

    if (Math.abs(x) % 1000 < Math.max(1, xstep - 1)) {
      const r = new DesignChunk(
        "distmount",
        x,
        prng.random(230, 280),
        ns(new Point(x, yr(x) * 480))
      );
      if (needAdd(reg, r)) reg.push(r);
    }
  }

  for (let i = imin; i < imax; i++) {
    const x = i * xstep + ioff;
    if (mountain_cover[i] === 0) {
      if (prng.random() < 0.01) {
        for (let j = 0; j < prng.random(0, 4); j++) {
          const r = new DesignChunk(
            "flatmount",
            x + prng.random(-700, 700),
            700 - j * 50,
            ns(new Point(x, j))
          );
          if (needAdd(reg, r)) reg.push(r);
        }
      }
    }
  }

  for (let i = imin; i < imax; i++) {
    if (prng.random() < 0.2) {
      const x = i * xstep + ioff;
      const r = new DesignChunk("boat", x, prng.random(300, 690));
      if (needAdd(reg, r, 400)) reg.push(r);
    }
  }

  return reg;
}
