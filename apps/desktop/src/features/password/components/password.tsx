import { CopyIcon, EyeIcon, PenIcon, Trash2Icon } from "lucide-react";

import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { DeletePasswordModal } from "./delete-password-modal";
import { EditPasswordModal } from "./edit-password-modal";
import { ViewPasswordModal } from "./view-password-modal";

export function Password() {
  return (
    <Layout.Card className="flex gap-4 items-start space-y-0">
      <div className="flex-1 space-y-1">
        <p>Teste</p>
        <p className="text-sm text-muted-foreground">email@email.com</p>
        <p className="text-xs text-muted-foreground">https://exemplo.com</p>
        <p className="text-muted-foreground">••••••••••••••••••••••••</p>
      </div>
      <div className="flex gap-2">
        <Button size="icon">
          <CopyIcon />
        </Button>
        <ViewPasswordModal>
          <Button size="icon">
            <EyeIcon />
          </Button>
        </ViewPasswordModal>
        <EditPasswordModal>
          <Button size="icon">
            <PenIcon />
          </Button>
        </EditPasswordModal>
        <DeletePasswordModal>
          <Button size="icon">
            <Trash2Icon />
          </Button>
        </DeletePasswordModal>
      </div>
    </Layout.Card>
  );
}
