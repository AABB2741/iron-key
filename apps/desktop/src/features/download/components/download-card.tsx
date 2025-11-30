import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { DownloadIcon, TriangleIcon } from "lucide-react";

interface DownloadOption {
  label: string;
  url: string;
}

interface DownloadCardProps {
  title: string;
  version?: string;
  size?: string;
  options: DownloadOption[];
}

export function DownloadCard({
  title,
  version,
  size,
  options,
}: DownloadCardProps) {
  return (
    <div className="border border-border rounded-xl p-4 gap-4 flex flex-col">
      <div className="flex-1 space-y-4">
        <h3 className="font-bold text-xl">{title}</h3>
        <div>
          {version && <p>{version}</p>}
          {size && <p>{size}</p>}
        </div>
      </div>
      {options.length === 0 && (
        <Button
          variant="primary"
          className="w-full cursor-not-allowed"
          disabled
        >
          Em breve
        </Button>
      )}
      {options.length === 1 && (
        <Button variant="primary" className="w-full">
          <DownloadIcon />
          <span>Baixar ({options[0].label})</span>
        </Button>
      )}
      {options.length > 1 && (
        <Popover.Root>
          <Popover.Trigger asChild>
            <Button variant="primary" className="w-full">
              <span>Escolha uma opção</span>
              <TriangleIcon className="fill-current rotate-180 size-2!" />
            </Button>
          </Popover.Trigger>

          <Popover.Content>
            <Popover.Label>Escolha uma opção de download</Popover.Label>
            {options.map((option) => (
              <Popover.Option
                key={option.url}
                label={option.label}
                onClick={() => {
                  console.log("clicked");
                  window.open(option.url, "_blank");
                }}
              />
            ))}
          </Popover.Content>
        </Popover.Root>
      )}
    </div>
  );
}
