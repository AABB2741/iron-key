import {
  createPasswordBody,
  type CreatePasswordBody,
} from "@ironkey/routes/passwords";
import type { DialogProps } from "@radix-ui/react-dialog";
import { useForm } from "@tanstack/react-form";

import { TextField } from "@/components/form/text-field";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

import { useCreatePassword } from "../api/create-password";

interface CreatePasswordModalProps extends DialogProps {
  password: string;
}

export function CreatePasswordModal({
  password,
  children,
  ...props
}: CreatePasswordModalProps) {
  const { createPassword } = useCreatePassword();

  const form = useForm({
    defaultValues: {
      name: "",
      login: "",
      siteUrl: "",
      password,
    } satisfies CreatePasswordBody as CreatePasswordBody,
    validators: {
      onSubmit: createPasswordBody,
    },
    onSubmit: async (form) => {
      await createPassword(form.value);
      props.onOpenChange?.(false);
    },
  });

  return (
    <Modal.Root {...props}>
      <Modal.Trigger disabled={!password} asChild>
        {children}
      </Modal.Trigger>

      <Modal.Content>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <Modal.Header>
            <Modal.Title>Salvar senha</Modal.Title>
          </Modal.Header>

          <form.Field
            name="name"
            children={(field) => (
              <TextField
                label="Nome"
                placeholder="Ex: Netflix, Facebook"
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
                placeholder="Ex: seuemail@exemplo.com"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          />
          <form.Field
            name="siteUrl"
            children={(field) => (
              <TextField
                label="URL do site"
                placeholder="https://exemplo.com"
                type="url"
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
                value={field.state.value}
                disabled
                readOnly
                required
              />
            )}
          />

          <Modal.Footer>
            <Modal.Close asChild>
              <Button>Cancelar</Button>
            </Modal.Close>
            <Button variant="primary" onClick={form.handleSubmit}>
              Salvar
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </Modal.Root>
  );
}
