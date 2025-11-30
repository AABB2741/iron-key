import type { DialogProps } from "@radix-ui/react-dialog";
import dayjs from "dayjs";
import {
  CopyIcon,
  ExternalLinkIcon,
  LaptopMinimalCheckIcon,
} from "lucide-react";

import { TextField } from "@/components/form/text-field";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Separator } from "@/components/ui/separator";

import { copy } from "@/utils/copy";
import { usePasswordById } from "../api/get-password-by-id";

interface ViewPasswordModalProps extends DialogProps {
  passwordId: string;
}

export function ViewPasswordModal({
  passwordId,
  children,
  ...props
}: ViewPasswordModalProps) {
  const { password, isSavedLocally } = usePasswordById({
    passwordId,
    options: {
      enabled: !!props.open,
    },
  });

  return (
    <Modal.Root {...props}>
      <Modal.Trigger asChild>{children}</Modal.Trigger>

      <Modal.Content>
        <Modal.Header>
          <Modal.Title>{password?.name ?? "Senha sem nome"}</Modal.Title>
          {isSavedLocally && (
            <p className="text-sm">
              <LaptopMinimalCheckIcon className="text-success inline size-4" />{" "}
              Salvo localmente
            </p>
          )}
        </Modal.Header>

        {!!password?.password && (
          <TextField
            label="Senha"
            placeholder="********"
            readOnly
            autoFocus
            value={password.password}
            options={[
              {
                icon: CopyIcon,
                onClick: copy(password.password!),
              },
            ]}
          />
        )}

        {!!password?.siteUrl && (
          <TextField
            label="Site"
            placeholder="https://exemplo.com"
            value={password.siteUrl}
            readOnly
            options={[
              {
                icon: ExternalLinkIcon,
                onClick: () => {
                  const a = document.createElement("a");
                  a.target = "_blank";
                  a.href = password.siteUrl!;
                  a.click();
                },
              },
              {
                icon: CopyIcon,
                onClick: copy(password.siteUrl!),
              },
            ]}
          />
        )}

        {password?.login && (
          <TextField
            label="Login"
            placeholder="E-mail ou nome de usuário"
            readOnly
            value={password.login}
            options={[
              {
                icon: CopyIcon,
                onClick: copy(password.login!),
              },
            ]}
          />
        )}

        <Separator />

        <p className="text-xs text-muted-foreground">
          Criado em {dayjs(password?.createdAt).format("DD/MM/YYYY")}
        </p>

        <Modal.Close asChild>
          <Button className="w-full" variant="primary">
            Ok
          </Button>
        </Modal.Close>
      </Modal.Content>
    </Modal.Root>
  );
}
