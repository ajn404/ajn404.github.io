import { View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { type ReactNode, useEffect } from "react";

import { Item1 } from "./Rings";
import { Item2 } from "./Loop";
import { Item3 } from "./Coins";
import { Item4 } from "./Core";
import { Item5 } from "./Rubik";
import { Item6 } from "./Travel";
import { Item7 } from "./Stagger";
import { Item8 } from "./Balance";
import { Item9 } from "./Pulse";
import { Item10 } from "./Pie";
import { Item11 } from "./Cradle";
import { Item12 } from "./Arrows";

const Wrapper = ({ name, children }: { name: string; children: ReactNode }) => {
  return (
    <div className="relative rounded-md cursor-pointer bg-white/10 card p-[1px]">
      <View className="flex z-[2] bg-[#171717]  aspect-square  relative rounded-t-md">
        {children}
      </View>
    </div>
  );
};

function App({ item }: { item?: string }) {
  const items = [
    { component: Item1, name: "Rings" },
    { component: Item2, name: "Loop" },
    { component: Item3, name: "Coins" },
    { component: Item4, name: "Core" },
    { component: Item5, name: "Rubik" },
    { component: Item6, name: "Travel" },
    { component: Item7, name: "Stagger" },
    { component: Item8, name: "Balance" },
    { component: Item9, name: "Pulse" },
    { component: Item10, name: "Pie" },
    { component: Item11, name: "Newton's Cradle" },
    { component: Item12, name: "Arrows" },
  ];

  const showedItem = items.find(i => i.name === item) || items[0];

  return (
    <>
      {!item && (
        <div className="min-h-screen text-white bg-[#0c0c0c] select-none background hidden md:block">
          <div className="container p-5 pb-20 mx-auto ">
            <div className="relative mt-5 overflow-hidden">
              <div
                className="grid h-full gap-5 overflow-hidden group grid-clos-1 md:grid-cols-2 lg:grid-cols-4"
                data-gird
              >
                {items.map((item, index) => (
                  <Wrapper key={index} name={item.name}>
                    <item.component />
                  </Wrapper>
                ))}
              </div>

              <div className="absolute top-0 left-0 z-20 w-screen h-screen  ">
                <Canvas
                  camera={{
                    zoom: 0.8,
                  }}
                  className="absolute"
                  eventSource={document.getElementById("root")!}
                >
                  <View.Port />
                </Canvas>
              </div>
            </div>
          </div>
        </div>
      )}
      {item && (
        <>
          <div
            className="grid h-full gap-5 overflow-hidden group grid-clos-1 md:grid-cols-2 lg:grid-cols-4"
            data-gird
          >
            <Wrapper name={item}>
              <showedItem.component />
            </Wrapper>
          </div>

          <div className="fixed top-0 left-0 z-20 w-full h-screen pointer-events-none ">
            <Canvas
              camera={{
                zoom: 0.8,
              }}
              className="fixed"
              eventSource={document.getElementById("root")!}
            >
              <View.Port />
            </Canvas>
          </div>
        </>
      )}
    </>
  );
}

export default App;
