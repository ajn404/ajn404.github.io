import * as React from "react";

import { Card, CardContent } from "@shadcn/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@shadcn/ui/carousel";

export default () => {
  return (
    <Carousel className="w-full max-w-xs m-auto">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-auto items-center justify-center p-6">
                  <img
                    src={`/assets/bg/${index + 1}.jpg`}
                    className="w-full h-full"
                    alt=""
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
