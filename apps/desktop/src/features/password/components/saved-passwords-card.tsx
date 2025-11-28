import { DownloadIcon, LockIcon } from "lucide-react";

import { Layout } from "@/components/layout";
import { WebOnly } from "@/components/platform-only";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Password } from "./password";

export function SavedPasswordsCard() {
  if (0 === 0) {
    return (
      <div className="space-y-4 flex-1">
        <WebOnly>
          <Layout.Card className="space-y-1">
            <p className="font-bold">Desbloqueie o máximo do IronKey</p>
            <p className="text-sm">
              Faça o download do nosso app desktop e acesse suas senhas sem
              precisar de internet. Não custa nada.
            </p>
            <Link to="/download">
              <Button className="mt-3" variant="primary">
                <DownloadIcon />
                <span>Baixar</span>
              </Button>
            </Link>
          </Layout.Card>
        </WebOnly>
        <Password />
        <Password />
        <Password />
        <Password />
      </div>
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
