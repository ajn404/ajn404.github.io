import { midPt } from "./polytools";
import { Point, Vector } from "./point";
import { PRNG } from "./PRNG";
import { Range } from "./range";
import { SvgPoint, SvgPolyline } from "../svg";

export function unNan(plist: Point[]): Point[] {
  return plist.map((p: Point) => (p && p.isFinite() ? p : new Point()));
}

export function mapval(value: number, i: Range, o: Range): number {
  return o.fromratio(i.toratio(value));
}

export function loopNoise(nslist: number[]): number[] {
  const dif = nslist[nslist.length - 1] - nslist[0];
  const bds = [100, -100];
  for (let i = 0; i < nslist.length; i++) {
    nslist[i] += (dif * (nslist.length - 1 - i)) / (nslist.length - 1);
    if (nslist[i] < bds[0]) bds[0] = nslist[i];
    if (nslist[i] > bds[1]) bds[1] = nslist[i];
  }
  const irange = Range.fromArray(bds);
  const orange = new Range(0, 1);
  return nslist.map(v => mapval(v, irange, orange));
}

export function randChoice<T>(prng: PRNG, arr: T[]): T {
  const p = prng.random(0, arr.length);
  const ip = Math.floor(p);
  return arr[ip];
}

export function normRand(prng: PRNG, m: number, M: number): number {
  const irange = new Range(0, 1);
  const orange = new Range(m, M);
  return mapval(prng.random(), irange, orange);
}

export function wtrand(prng: PRNG, func: (v: number) => number): number {
  const x = prng.random();
  const y = prng.random();
  return y < func(x) ? x : wtrand(prng, func);
}

export function randGaussian(prng: PRNG): number {
  const v1 = wtrand(prng, x => Math.exp(-24 * Math.pow(x - 0.5, 2)));
  return v1 * 2 - 1;
}

export function bezmh(P: Point[], w: number = 1): Point[] {
  if (P.length === 2) {
    P = [P[0], midPt(P), P[1]];
  }
  const plist = [];
  for (let j = 0; j < P.length - 2; j++) {
    const p0 = j === 0 ? P[j] : midPt([P[j], P[j + 1]]);
    const p1 = P[j + 1];
    const p2 = j === P.length - 3 ? P[j + 2] : midPt([P[j + 1], P[j + 2]]);

    const pl = 20;
    const jb = j === P.length - 3 ? 1 : 0;
    for (let i = 0; i < pl + jb; i += 1) {
      const t = i / pl;
      // const u = Math.pow(1 - t, 2) + 2 * t * (1 - t) * w + t * t;
      const a0 = (1 - t) * (1 - t);
      const a1 = 2 * t * (1 - t);
      const a2 = t * t;
      const x = a0 * p0.x + a1 * p1.x + a2 * p2.x;
      const y = a0 * p0.y + a1 * p1.y + a2 * p2.y;
      plist.push(new Point(x, y));
    }
  }
  return plist;
}

export function poly(
  plist: Point[],
  xoff: number = 0,
  yoff: number = 0,
  fill: string = "rgba(0,0,0,0)",
  stroke: string = "rgba(0,0,0,0)",
  strokeWidth: number = 0
): SvgPolyline {
  const off = new Vector(xoff, yoff);

  const polyline = new SvgPolyline(
    plist.map((p: Point) => SvgPoint.from(p.move(off))),
    { fill, stroke, strokeWidth }
  );

  return polyline;
}
