import { create } from "zustand";

const textures = [
  "/assets/texture/1.webp",
  "/assets/texture/2.webp",
  "/assets/texture/3.webp",
];

interface Store {
  index: number;
  texture: string;
  setIndex: (num: number) => void;
}

export const useStore = create<Store>(set => ({
  index: 2,
  texture: textures[2],
  setIndex: (num: number) => set({ index: num, texture: textures[num] }),
}));
