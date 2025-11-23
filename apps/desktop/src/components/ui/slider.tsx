import { Slider as SliderPrimitive } from "radix-ui";

interface SliderProps {
  min?: number;
  max?: number;
  value: number;
  onValueChange: (value: number) => void;
}

export function Slider({
  min = 0,
  max = 64,
  value,
  onValueChange,
}: SliderProps) {
  return (
    <SliderPrimitive.Root
      className="flex items-center select-none touch-none h-5 w-full relative"
      value={[value]}
      min={min}
      max={max}
      step={1}
      onValueChange={(values) => onValueChange(values[0])}
    >
      <SliderPrimitive.Track className="bg-muted grow rounded-full h-1 relative">
        <SliderPrimitive.Range className="absolute h-full bg-primary rounded-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="size-5 bg-foreground rounded-full block" />
    </SliderPrimitive.Root>
  );
}
