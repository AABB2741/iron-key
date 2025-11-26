import { createFileRoute, redirect } from "@tanstack/react-router";
import {
  CheckIcon,
  CloudIcon,
  DownloadIcon,
  LockIcon,
  ShieldIcon,
} from "lucide-react";

import { Footer } from "@/components/footer";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { isDesktop } from "@/utils/is-desktop";

export const Route = createFileRoute("/download")({
  component: RouteComponent,
  beforeLoad: () => {
    if (isDesktop()) {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  return (
    <div className="w-screen min-h-screen">
      <header className="p-4 border-b border-border flex justify-between">
        <div>
          <p>IronKey</p>
        </div>
        <nav>
          <ul>
            <li>
              <a href="#">Login</a>
            </li>
            <li>
              <a href="#">Gerador online</a>
            </li>
          </ul>
        </nav>
      </header>

      <Layout.Container className="space-y-24 p-12 mx-auto">
        <section className="text-center space-y-6">
          <div>Totalmente gratuito</div>
          <h1 className="text-5xl font-bold">Gerador de senhas desktop</h1>
          <p>
            Gere senhas fortes offline no seu computador.
            <br />
            Login opcional para sincronização em nuvem.
          </p>
          <div className="flex justify-center gap-6">
            <Button variant="primary">
              <DownloadIcon />
              <span>Baixar para Windows</span>
            </Button>
            <Button>Ver todas as plataformas</Button>
          </div>
        </section>

        <section>
          <img
            className="w-full rounded-xl"
            src="/screenshot.png"
            alt="IronKey desktop demo"
          />
        </section>
        <section className="text-center space-y-6">
          <h2 className="font-bold text-3xl">Por que usar o IronKey?</h2>
          <div className="flex gap-6 items-start justify-center">
            <div className="border rounded-xl border-border p-4 text-left space-y-4">
              <ShieldIcon className="text-muted-foreground size-12" />
              <h3 className="font-bold text-lg">Completamente gratuito</h3>
              <p>Software livre e open source, sem custos ou limitações.</p>
            </div>
            <div className="border rounded-xl border-border p-4 text-left space-y-4">
              <LockIcon className="text-muted-foreground size-12" />
              <h3 className="font-bold text-lg">Armazenamento local</h3>
              <p>
                Suas senhas ficam salvas no seu dispositivo, totalmente offline.
              </p>
            </div>
            <div className="border rounded-xl border-border p-4 text-left space-y-4">
              <CloudIcon className="text-muted-foreground size-12" />
              <h3 className="font-bold text-lg">Sincronização em nuvem</h3>
              <p>
                Login opcional para backup e acesso em múltiplos dispositivos.
              </p>
            </div>
          </div>
        </section>

        <section className="text-center space-y-6">
          <h2 className="font-bold text-3xl">Escolha sua plataforma</h2>
          <p>Disponível para Windows, macOS e Linux</p>
          <div className="flex items-center gap-6 justify-center">
            <div className="border border-border rounded-xl p-4 space-y-4 flex-1">
              <h3 className="font-bold text-xl">Windows</h3>
              <div>
                <p>v1.0.0</p>
                <p>85MB</p>
              </div>
              <Button variant="primary" className="w-full">
                <DownloadIcon />
                <span>Baixar</span>
              </Button>
            </div>
            <div className="border border-border rounded-xl p-4 space-y-4 flex-1">
              <h3 className="font-bold text-xl">MacOS</h3>
              <div>
                <p>v1.0.0</p>
                <p>85MB</p>
              </div>
              <Button variant="primary" className="w-full">
                <DownloadIcon />
                <span>Baixar</span>
              </Button>
            </div>
            <div className="border border-border rounded-xl p-4 space-y-4 flex-1">
              <h3 className="font-bold text-xl">Linux</h3>
              <div>
                <p>v1.0.0</p>
                <p>85MB</p>
              </div>
              <Button variant="primary" className="w-full">
                <DownloadIcon />
                <span>Baixar</span>
              </Button>
            </div>
          </div>
        </section>

        <section className="text-center space-y-6">
          <h2 className="font-bold text-3xl">Recursos incluídos</h2>
          <div className="grid grid-cols-2 mx-auto max-w-[750px] gap-x-8 gap-y-6">
            <div className="flex items-center gap-4">
              <CheckIcon className="text-success" />
              <span> Geração de senhas com até 64 caracteres</span>
            </div>
            <div className="flex items-center gap-4">
              <CheckIcon className="text-success" />
              <span> Interface moderna e intuitiva</span>
            </div>
            <div className="flex items-center gap-4">
              <CheckIcon className="text-success" />
              <span> Multiplataforma (Windows, Mac, Linux)</span>
            </div>
            <div className="flex items-center gap-4">
              <CheckIcon className="text-success" />
              <span> Totalmente gratuito, sem anúncios</span>
            </div>
            <div className="flex items-center gap-4">
              <CheckIcon className="text-success" />
              <span> Personalização completa de senhas</span>
            </div>
            <div className="flex items-center gap-4">
              <CheckIcon className="text-success" />
              <span> Login opcional para sincronização em nuvem</span>
            </div>
            <div className="flex items-center gap-4">
              <CheckIcon className="text-success" />
              <span> Código aberto e auditável</span>
            </div>
          </div>
        </section>

        <section className="text-center space-y-6">
          <h2 className="font-bold text-3xl">Pronto para começar?</h2>
          <p>Baixe agora e gere senhas seguras em segundos</p>
          <Button variant="primary" className="mx-auto">
            <DownloadIcon />
            <span>Baixar agora</span>
          </Button>
        </section>
      </Layout.Container>

      <Footer />
    </div>
  );
}
