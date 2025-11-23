import { type LucideIcon } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface TextFieldOption {
  icon: LucideIcon;
  value?: string;
  onClick?: () => void;
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
        {options?.map(({ icon: Icon, onClick }, index) => (
          <Button onClick={onClick} key={index}>
            <Icon className="text-muted-foreground size-4" />
          </Button>
        ))}
      </div>
    </div>
  );
}
