import { Slider as SliderPrimitive } from "radix-ui";

export function Slider() {
  return (
    <SliderPrimitive.Root className="flex items-center select-none touch-none h-5 w-full relative">
      <SliderPrimitive.Track className="bg-muted grow rounded-full h-1 relative">
        <SliderPrimitive.Range className="absolute h-full bg-primary rounded-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="size-5 bg-foreground rounded-full block" />
    </SliderPrimitive.Root>
  );
}
