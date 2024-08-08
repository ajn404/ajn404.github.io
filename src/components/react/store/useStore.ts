import { create } from "zustand";

const textures = [
  "/assets/texture/1.jpeg",
  "/assets/texture/2.jpeg",
  "/assets/texture/3.jpeg",
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
