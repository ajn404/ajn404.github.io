import { prng } from "./prng";

function random(...args) {
  if (Array.isArray(args[0])) {
    const targetArray = args[0];
    const randomIndex = Math.floor(prng() * targetArray.length);
    return targetArray[randomIndex];
  } else {
    const [min, max, clamp = false] = args;
    const val = prng() * (max - min) + min;
    return clamp ? Math.round(val) : val;
  }
}

export default random;
