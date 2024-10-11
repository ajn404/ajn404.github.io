import React, { useMemo } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@shadcn/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const AutoplayCarousel: React.FC = () => {
  const plugin: any = useMemo(
    () => Autoplay({ delay: 3000, stopOnInteraction: true }),
    []
  );

  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[plugin]}
      className="w-full m-auto max-w-screen-xl"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <img
              src={`/assets/code/Equal${index}.png`}
              className="w-full object-contain"
              alt={`Carousel image ${index + 1}`}
              loading="lazy"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default AutoplayCarousel;
