import { Slider } from "@/components/ui/slider";

import { useFieldContext } from ".";

export function LengthField() {
  const field = useFieldContext<number>();

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <p>Comprimento</p>
        <p className="text-muted-foreground text-sm">{field.state.value}</p>
      </div>
      <Slider
        min={1}
        value={field.state.value}
        onValueChange={field.handleChange}
      />
    </>
  );
}
