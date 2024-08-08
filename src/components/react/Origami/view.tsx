import { type ReactNode } from "react";
import { View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <View className="flex z-[2] bg-[#171717]  aspect-square  relative rounded-t-md">
        {children}
      </View>
    </>
  );
};
