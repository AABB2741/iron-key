import { Switch } from "@/components/ui/switch";

interface SwitchFieldProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function SwitchField({
  label,
  checked,
  onCheckedChange,
}: SwitchFieldProps) {
  return (
    <>
      <p>{label}</p>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </>
  );
}
