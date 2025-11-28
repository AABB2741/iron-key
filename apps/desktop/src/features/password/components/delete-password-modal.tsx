import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import type React from "react";

interface DeletePasswordModalProps extends React.PropsWithChildren {}

export function DeletePasswordModal({ children }: DeletePasswordModalProps) {
  return (
    <Modal.Root>
      <Modal.Trigger asChild>{children}</Modal.Trigger>

      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Excluir senha</Modal.Title>
          <Modal.Description>
            Tem certeza que deseja excluir esta senha? Não será possível
            recuperar.
          </Modal.Description>
        </Modal.Header>
        <Modal.Footer>
          <Button>Cancelar</Button>
          <Button variant="destructive">Excluir</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
