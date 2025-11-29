import {
  updatePasswordBody,
  type UpdatePasswordBody,
} from "@ironkey/routes/passwords";
import type { DialogProps } from "@radix-ui/react-dialog";
import { useForm } from "@tanstack/react-form";
import { Wand2Icon } from "lucide-react";
import { toast } from "sonner";

import { TextField } from "@/components/form/text-field";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Separator } from "@/components/ui/separator";

import { generatePassword } from "@/utils/generate-password";
import { useEditPassword } from "../api/edit-password";
import { usePasswordById } from "../api/get-password-by-id";

interface EditPasswordModalProps extends DialogProps {
  passwordId: string;
}

export function EditPasswordModal({
  passwordId,
  children,
  ...props
}: EditPasswordModalProps) {
  const { password } = usePasswordById({
    passwordId,
    options: {
      enabled: !!props.open,
    },
  });
  const { editPassword } = useEditPassword();

  const form = useForm({
    defaultValues: {
      name: password?.name ?? "",
      login: password?.login ?? "",
      siteUrl: password?.siteUrl ?? "",
      password: password?.password ?? "",
    } satisfies UpdatePasswordBody as UpdatePasswordBody,
    validators: {
      onSubmit: updatePasswordBody,
    },
    onSubmit: async (form) => {
      await editPassword({
        passwordId,
        ...form.value,
      });
      props.onOpenChange?.(false);
      toast.success("Senha atualizada com sucesso");
    },
  });

  return (
    <Modal.Root {...props}>
      <Modal.Trigger asChild>{children}</Modal.Trigger>

      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Editar senha</Modal.Title>
          <Modal.Description>
            Atualize as informações da senha salva
          </Modal.Description>
        </Modal.Header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="name"
            children={(field) => (
              <TextField
                label="Nome"
                placeholder="Ex: Email pessoal, Netflix, etc."
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                autoFocus
              />
            )}
          />
          <form.Field
            name="siteUrl"
            children={(field) => (
              <TextField
                label="URL do site"
                placeholder="https://exemplo.com"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          />
          <form.Field
            name="login"
            children={(field) => (
              <TextField
                label="Login"
                placeholder="E-mail ou nome de usuário"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          />
          <form.Field
            name="password"
            children={(field) => (
              <TextField
                label="Senha"
                placeholder="********"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                options={[
                  {
                    icon: Wand2Icon,
                    onClick: () => {
                      field.handleChange(generatePassword());
                    },
                  },
                ]}
              />
            )}
          />

          <Separator />

          <Modal.Footer>
            <Modal.Close asChild>
              <Button>Cancelar</Button>
            </Modal.Close>
            <Button variant="primary" type="submit">
              Atualizar
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </Modal.Root>
  );
}
