import { type LucideIcon } from "lucide-react";
import type React from "react";

import { twMerge } from "tailwind-merge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface TextFieldOption extends React.ComponentProps<"button"> {
  icon: LucideIcon;
}

interface TextFieldProps extends React.ComponentProps<"input"> {
  icon?: LucideIcon;
  label?: string;
  options?: TextFieldOption[];
  containerLabelClassName?: string;
}

export function TextField({
  icon: Icon,
  label,
  options,
  containerLabelClassName,
  ...props
}: TextFieldProps) {
  return (
    <div className="space-y-2">
      {!!label && <p>{label}</p>}
      <div className="flex gap-2">
        {Icon ? (
          <label
            className={twMerge(
              "border border-border rounded-md flex flex-row items-center px-3 gap-2 has-focus:ring-2 ring-primary",
              containerLabelClassName,
            )}
            htmlFor={props.id}
          >
            <Icon className="size-5 text-muted-foreground" />
            <Input
              {...props}
              className={twMerge(
                "flex-1 border-none p-0 outline-none",
                props.className,
              )}
            />
          </label>
        ) : (
          <Input {...props} className={twMerge("flex-1", props.className)} />
        )}
        {options?.map(({ icon: Icon, ...props }, index) => (
          <Button {...props} key={index}>
            <Icon className="text-muted-foreground size-4" />
          </Button>
        ))}
      </div>
    </div>
  );
}
