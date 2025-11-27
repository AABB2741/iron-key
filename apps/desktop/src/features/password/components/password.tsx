import { CopyIcon, EyeIcon, PenIcon, Trash2Icon } from "lucide-react";

import { TextField } from "@/components/form/text-field";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Separator } from "@/components/ui/separator";

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
        <Modal.Root>
          <Modal.Trigger asChild>
            <Button size="icon">
              <EyeIcon />
            </Button>
          </Modal.Trigger>

          <Modal.Content>
            <Modal.Title>Nome da senha</Modal.Title>

            <TextField
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

            <Separator />

            <p className="text-xs text-muted-foreground">
              Criado em 12/12/2012
            </p>

            <Modal.Close asChild>
              <Button className="w-full" variant="primary">
                Ok
              </Button>
            </Modal.Close>
          </Modal.Content>
        </Modal.Root>
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
