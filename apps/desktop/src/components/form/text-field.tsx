import { type LucideIcon } from "lucide-react";
import type React from "react";

import { getErrorMessage } from "@/utils/get-error-message";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface TextFieldOption extends React.ComponentProps<"button"> {
  icon: LucideIcon;
}

interface TextFieldProps extends React.ComponentProps<"input"> {
  icon?: LucideIcon;
  error?: unknown;
  label?: string;
  options?: TextFieldOption[];
  containerLabelClassName?: string;
}

export function TextField({
  icon: Icon,
  error,
  label,
  options,
  containerLabelClassName,
  ...props
}: TextFieldProps) {
  return (
    <div className="space-y-2">
      {!!label && (
        <p>
          {label}{" "}
          {props.required && <span className="text-destructive">*</span>}
        </p>
      )}
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
        {options?.map(({ icon: Icon, type = "button", ...props }, index) => (
          <Button {...props} key={index} type={type}>
            <Icon className="text-muted-foreground size-4" />
          </Button>
        ))}
      </div>
      {!!error && (
        <p className="text-xs text-destructive">{getErrorMessage(error)}</p>
      )}
    </div>
  );
}
