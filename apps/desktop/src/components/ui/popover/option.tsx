import { isDesktop } from "@/utils/is-desktop";
import type { LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface PopoverOptionProps {
  icon?: LucideIcon;
  label: string;
  onClick?: () => void;
}

export function PopoverOption({
  icon: Icon,
  label,
  onClick,
}: PopoverOptionProps) {
  return (
    <button
      className={twMerge(
        "flex items-center gap-2 p-2 hover:bg-primary/10 w-full",
        !isDesktop() && "cursor-pointer",
      )}
      onClick={onClick}
    >
      {Icon && <Icon className="size-4 mr-2 inline-block" />}
      <span className="text-sm">{label}</span>
    </button>
  );
}
