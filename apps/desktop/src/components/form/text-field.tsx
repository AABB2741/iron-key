import { type LucideIcon } from "lucide-react";
import type React from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface TextFieldOption extends React.ComponentProps<"button"> {
  icon: LucideIcon;
}

interface TextFieldProps extends React.ComponentProps<"input"> {
  label?: string;
  options?: TextFieldOption[];
}

export function TextField({ label, options, ...props }: TextFieldProps) {
  return (
    <div className="space-y-2">
      {!!label && <p>{label}</p>}
      <div className="flex gap-2">
        <Input className="flex-1" {...props} />
        {options?.map(({ icon: Icon, ...props }, index) => (
          <Button {...props} key={index}>
            <Icon className="text-muted-foreground size-4" />
          </Button>
        ))}
      </div>
    </div>
  );
}
