import { cn } from "@utils/utils";
import Powerglitch from "@components/react/little/powerglitch.tsx";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Powerglitch>
      <img
        className={cn("animate-pulse rounded-md bg-muted", className)}
        {...props}
        src={props["data-src"] || "/assets/bg/1.webp"}
      />
    </Powerglitch>
  );
}

export { Skeleton };
