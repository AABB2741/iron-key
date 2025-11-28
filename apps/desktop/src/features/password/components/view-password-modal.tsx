import { CopyIcon } from "lucide-react";
import type React from "react";

import { TextField } from "@/components/form/text-field";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Separator } from "@/components/ui/separator";

interface ViewPasswordModalProps extends React.PropsWithChildren {}

export function ViewPasswordModal({ children }: ViewPasswordModalProps) {
  return (
    <Modal.Root>
      <Modal.Trigger asChild>{children}</Modal.Trigger>

      <Modal.Content>
        <Modal.Title>Nome da senha</Modal.Title>

        <TextField
          readOnly
          label="Senha"
          placeholder="********"
          autoFocus
          options={[
            {
              icon: CopyIcon,
            },
          ]}
        />
        <TextField
          readOnly
          label="URL do site"
          placeholder="https://exemplo.com"
          options={[
            {
              icon: CopyIcon,
            },
          ]}
        />
        <TextField
          readOnly
          label="Login"
          placeholder="E-mail ou nome de usuário"
          options={[
            {
              icon: CopyIcon,
            },
          ]}
        />

        <Separator />

        <p className="text-xs text-muted-foreground">Criado em 12/12/2012</p>

        <Modal.Close asChild>
          <Button className="w-full" variant="primary">
            Ok
          </Button>
        </Modal.Close>
      </Modal.Content>
    </Modal.Root>
  );
}
