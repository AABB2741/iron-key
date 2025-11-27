import { Root, type SeparatorProps } from "@radix-ui/react-separator";

export function Separator({ ...props }: SeparatorProps) {
  return (
    <Root
      className="bg-border data-[orientation=horizontal]:h-px data-[orientation=vertical]:w-px"
      {...props}
    />
  );
}
