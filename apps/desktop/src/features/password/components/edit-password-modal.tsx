import { TextField } from "@/components/form/text-field";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Separator } from "@/components/ui/separator";
import { CopyIcon, Wand2Icon } from "lucide-react";

interface EditPasswordModalProps extends React.PropsWithChildren {}

export function EditPasswordModal({ children }: EditPasswordModalProps) {
  return (
    <Modal.Root>
      <Modal.Trigger asChild>{children}</Modal.Trigger>

      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Editar senha</Modal.Title>
          <Modal.Description>
            Atualize as informações da senha salva
          </Modal.Description>
        </Modal.Header>

        <TextField
          label="Nome"
          placeholder="Ex: Email pessoal, Netflix, etc."
          options={[
            {
              icon: CopyIcon,
            },
          ]}
        />
        <TextField
          label="URL do site"
          placeholder="https://exemplo.com"
          options={[
            {
              icon: CopyIcon,
            },
          ]}
        />
        <TextField
          label="Login"
          placeholder="E-mail ou nome de usuário"
          options={[
            {
              icon: CopyIcon,
            },
          ]}
        />
        <TextField
          label="Senha"
          placeholder="********"
          autoFocus
          options={[
            {
              icon: Wand2Icon,
            },
            {
              icon: CopyIcon,
            },
          ]}
        />

        <Separator />

        <Modal.Footer>
          <Button>Cancelar</Button>
          <Button variant="primary">Atualizar</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
