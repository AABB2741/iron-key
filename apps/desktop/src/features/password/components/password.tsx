import { CopyIcon, EyeIcon, PenIcon, Trash2Icon } from "lucide-react";

import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";

import { copy } from "@/utils/copy";
import { useState } from "react";
import { DeletePasswordModal } from "./delete-password-modal";
import { EditPasswordModal } from "./edit-password-modal";
import { ViewPasswordModal } from "./view-password-modal";

interface PasswordProps {
  id: string;
  name: string | null;
  login: string | null;
  url: string | null;
  password: string;
}

export function Password({ id, name, login, url, password }: PasswordProps) {
  return (
    <Layout.Card className="flex gap-4 items-start space-y-0">
      <div className="flex-1 space-y-1">
        <p>{name || "Sem nome"}</p>
        {!!login && <p className="text-sm text-muted-foreground">{login}</p>}
        {!!url && <p className="text-xs text-muted-foreground">{url}</p>}
        <p className="text-muted-foreground">{"•".repeat(password.length)}</p>
      </div>
      <div className="flex gap-2">
        <Button size="icon" onClick={copy(password)}>
          <CopyIcon />
        </Button>

        <ViewButton id={id} />
        <EditButton id={id} />
        <DeleteButton id={id} />
      </div>
    </Layout.Card>
  );
}

function ViewButton({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ViewPasswordModal passwordId={id} open={isOpen} onOpenChange={setIsOpen}>
      <Button size="icon">
        <EyeIcon />
      </Button>
    </ViewPasswordModal>
  );
}

function EditButton({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <EditPasswordModal passwordId={id} open={isOpen} onOpenChange={setIsOpen}>
      <Button size="icon">
        <PenIcon />
      </Button>
    </EditPasswordModal>
  );
}

function DeleteButton({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DeletePasswordModal passwordId={id} open={isOpen} onOpenChange={setIsOpen}>
      <Button size="icon">
        <Trash2Icon />
      </Button>
    </DeletePasswordModal>
  );
}
