import { createFileRoute } from "@tanstack/react-router";
import { DownloadIcon, LockIcon, LogInIcon } from "lucide-react";

import { Layout } from "@/components/layout";
import { DesktopOnly, WebOnly } from "@/components/platform-only";
import { Button } from "@/components/ui/button";
import { PasswordGeneratorCard } from "@/features/password/components/password-generator-card";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <Layout.Container className="space-y-6">
      <header className="flex gap-4 justify-end">
        <WebOnly>
          <a
            className="bg-muted p-2 rounded-md flex gap-2 items-center"
            href="#"
            target="_blank"
          >
            <DownloadIcon className="size-4" />
            <p className="text-sm">
              Baixe o app desktop para salvar e acessar as senhas localmente e
              offline.
            </p>
          </a>
        </WebOnly>
        <DesktopOnly>
          <Button>
            <LogInIcon />
            <span>Entrar</span>
          </Button>
        </DesktopOnly>
      </header>

      <div className="text-center space-y-2">
        <h1 className="font-black text-4xl">IronKey</h1>
        <p className="text-secondary">
          Crie senhas fortes e seguras instantaneamente
        </p>
      </div>

      <div className="flex flex-col items-stretch gap-6 md:flex-row md:items-start">
        <PasswordGeneratorCard />
        <Layout.Card className="flex-1">
          <div className="flex justify-center items-center text-center flex-col gap-2">
            <LockIcon className="size-12 text-muted-foreground" />
            <p className="text-lg">Nenhuma senha salva ainda</p>
            <p className="text-sm text-muted-foreground">
              Gere uma senha e clique em "Salvar" para começar.
            </p>
          </div>
        </Layout.Card>
      </div>

      <footer>
        <p className="text-muted-foreground text-center">
          Faça login para sincronizar suas senhas na nuvem
        </p>
      </footer>
    </Layout.Container>
  );
}
