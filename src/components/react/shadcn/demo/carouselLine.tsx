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
    <Carousel className="w-full max-w-[10em] m-auto">
      <CarouselContent>
        {Array.from({ length: 12 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <img
                    src={`/assets/bg/${index + 1}.webp`}
                    className="w-full h-full bg-white"
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
