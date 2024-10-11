import React, { useMemo } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@shadcn/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const AutoplayCarousel: React.FC = () => {
  const plugin: any = useMemo(
    () => Autoplay({ delay: 4000, stopOnInteraction: true }),
    []
  );

  // Conditional logging for development environment
  if (process.env.NODE_ENV === "development") {
    console.log(plugin); // Debugging: Ensure plugin is initialized correctly
  }

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
              className="w-full h-full bg-white object-cover"
              alt={`Carousel image ${index + 1}`}
              loading="lazy"
              onError={e => {
                (e.target as HTMLImageElement).src = "/assets/code/default.png";
              }}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default AutoplayCarousel;
