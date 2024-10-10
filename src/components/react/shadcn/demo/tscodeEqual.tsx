import { Carousel, CarouselContent, CarouselItem } from "@shadcn/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef, type Ref } from "react";

export default () => {
  const plugin: Ref<any> = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[plugin.current]}
      className="w-full m-auto"
      style={{ maxWidth: "calc(100% - 200px)" }}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <img
              src={`/assets/code/Equal${index}.png`}
              className="w-full h-full bg-white"
              alt=""
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
