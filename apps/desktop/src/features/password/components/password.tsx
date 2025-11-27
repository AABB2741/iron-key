import { CopyIcon, EyeIcon, PenIcon, Trash2Icon } from "lucide-react";

import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";

export function Password() {
  return (
    <Layout.Card className="flex gap-4 items-start space-y-0">
      <div className="flex-1">
        <p>Teste</p>
        <p className="text-sm text-muted-foreground">email@email.com</p>
        <p className="text-xs text-muted-foreground">https://exemplo.com</p>
        <p className="text-muted-foreground">••••••••••••••••••••••••</p>
      </div>
      <div className="flex gap-2">
        <Button size="icon">
          <CopyIcon />
        </Button>
        <Button size="icon">
          <EyeIcon />
        </Button>
        <Button size="icon">
          <PenIcon />
        </Button>
        <Button size="icon">
          <Trash2Icon />
        </Button>
      </div>
    </Layout.Card>
  );
}
