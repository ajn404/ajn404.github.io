export const dp = (p: Array<number>, n: number): number => {
  console.log(p);
  let r = new Array(n + 1).fill(0);
  let s = new Array(n).fill(0);

  for (let i = 1; i <= n; i++) {
    let q = -Infinity;
    for (let j = 0; j < i; j++) {
      if (q < p[j] + r[i - j]) {
        q = p[j] + r[i - j];
        s[i] = j;
      }
    }
    r[i] = q;
    console.log(`r[${i}]=`, r[i]);
  }

  console.log("s", s);
  console.log("r", r);

  return r[n - 1];
};
