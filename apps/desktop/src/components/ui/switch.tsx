import { Switch as SwitchPrimitive } from "radix-ui";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function Switch({ checked, onCheckedChange }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      className="w-[42px] h-[25px] bg-foreground/50 rounded-full relative data-[state=checked]:bg-primary"
      checked={checked}
      onCheckedChange={onCheckedChange}
    >
      <SwitchPrimitive.Thumb className="size-[21px] bg-foreground block rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[19px]" />
    </SwitchPrimitive.Root>
  );
}
