import { DownloadIcon, LockIcon } from "lucide-react";

import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { isDesktop } from "@/utils/is-desktop";
import { Link } from "@tanstack/react-router";

export function SavedPasswordsCard() {
  if (!isDesktop()) {
    return (
      <Layout.Card className="flex-1">
        <div className="flex justify-center items-center text-center flex-col gap-2">
          <DownloadIcon className="size-12 text-muted-foreground" />
          <p className="text-lg">Baixe o app desktop agora mesmo!</p>
          <p className="text-sm text-muted-foreground">
            Faça o download gratuito do app desktop para salvar e gerenciar suas
            senhas na nuvem.
          </p>
          <Link className="mt-4" to="/download">
            <Button variant="primary">
              <DownloadIcon />
              <span>Baixar o app</span>
            </Button>
          </Link>
        </div>
      </Layout.Card>
    );
  }

  return (
    <Layout.Card className="flex-1">
      <div className="flex justify-center items-center text-center flex-col gap-2">
        <LockIcon className="size-12 text-muted-foreground" />
        <p className="text-lg">Nenhuma senha salva ainda</p>
        <p className="text-sm text-muted-foreground">
          Gere uma senha e clique em "Salvar" para começar.
        </p>
      </div>
    </Layout.Card>
  );
}
