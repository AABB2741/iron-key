import { createFileRoute } from "@tanstack/react-router";
import {
  CopyIcon,
  DownloadIcon,
  LockIcon,
  LogInIcon,
  RefreshCcwIcon,
  SaveIcon,
} from "lucide-react";

import { Layout } from "@/components/layout";
import { WebOnly } from "@/components/platform-only";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <Layout.Container className="space-y-6">
      <header className="flex gap-4 justify-between">
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
        <Button>
          <LogInIcon />
          <span>Entrar</span>
        </Button>
      </header>

      <div className="text-center space-y-2">
        <h1 className="font-black text-4xl">IronKey</h1>
        <p className="text-secondary">
          Crie senhas fortes e seguras instantaneamente
        </p>
      </div>

      <div className="flex gap-6 items-start">
        <Layout.Card className="flex-1">
          <div className="space-y-2">
            <p>Gerador de senhas</p>
            <div className="flex gap-2">
              <Input
                className="flex-1"
                placeholder="Gere uma senha para vê-la aqui"
              />
              <Button>
                <CopyIcon className="text-muted-foreground size-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <p>Comprimento</p>
              <p className="text-muted-foreground text-sm">16</p>
            </div>
            <Slider />
          </div>

          <div className="space-y-2">
            <label htmlFor="">Opções</label>
            <div className="flex justify-between gap-4 items-center">
              <p>Letras maiúsculas (A-Z)</p>
              <Switch />
            </div>
            <div className="flex justify-between gap-4 items-center">
              <p>Letras minúsculas (a-z)</p>
              <Switch />
            </div>
            <div className="flex justify-between gap-4 items-center">
              <p>Números (0-9)</p>
              <Switch />
            </div>
            <div className="flex justify-between gap-4 items-center">
              <p>Símbolos (!@#$%...)</p>
              <Switch />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button className="flex-1" variant="primary">
              <RefreshCcwIcon />
              <span>Gerar senha</span>
            </Button>
            <Button>
              <SaveIcon />
              <span>Salvar senha</span>
            </Button>
          </div>
        </Layout.Card>
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
