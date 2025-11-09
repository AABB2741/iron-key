import { type LucideIcon } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface TextFieldOption {
  icon: LucideIcon;
  onClick?: () => void;
}

interface TextFieldProps {
  label?: string;
  placeholder?: string;
  options?: TextFieldOption[];
}

export function TextField({ label, placeholder, options }: TextFieldProps) {
  return (
    <div className="space-y-2">
      {!!label && <p>{label}</p>}
      <div className="flex gap-2">
        <Input className="flex-1" placeholder={placeholder} />
        {options?.map(({ icon: Icon, onClick }, index) => (
          <Button onClick={onClick} key={index}>
            <Icon className="text-muted-foreground size-4" />
          </Button>
        ))}
      </div>
    </div>
  );
}
