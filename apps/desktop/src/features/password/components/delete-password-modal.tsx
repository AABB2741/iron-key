import type { DialogProps } from "@radix-ui/react-dialog";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

import { useDeletePassword } from "../api/delete-password";

interface DeletePasswordModalProps extends DialogProps {
  passwordId: string;
}

export function DeletePasswordModal({
  passwordId,
  children,
  ...props
}: DeletePasswordModalProps) {
  const { deletePassword } = useDeletePassword();

  return (
    <Modal.Root {...props}>
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
          <Button
            variant="destructive"
            onClick={async () => {
              await deletePassword({ passwordId });
              props.onOpenChange?.(false);
            }}
          >
            Excluir
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
