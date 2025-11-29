import { Link } from "@tanstack/react-router";
import { DownloadIcon, LockIcon } from "lucide-react";

import { Layout } from "@/components/layout";
import { WebOnly } from "@/components/platform-only";
import { Button } from "@/components/ui/button";

import { usePasswords } from "../api/list-passwords";
import { Password } from "./password";

export function SavedPasswordsCard() {
  const { passwords } = usePasswords();

  if (passwords) {
    return (
      <div className="space-y-4 flex-1">
        <Banner />
        {passwords.length === 0 && (
          <Layout.Card>
            <div className="flex justify-center items-center text-center flex-col gap-2">
              <LockIcon className="size-12 text-muted-foreground" />
              <p className="text-lg">Nenhuma senha salva ainda</p>
              <p className="text-sm text-muted-foreground">
                Gere uma senha e clique em "Salvar" para começar.
              </p>
            </div>
          </Layout.Card>
        )}
        {passwords
          ?.sort((a, b) => {
            if (!a.name) {
              return 1;
            }

            if (!b.name) {
              return -1;
            }

            return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
          })
          .map((item) => (
            <Password
              id={item.id}
              key={item.id}
              name={item.name}
              url={item.siteUrl}
              login={item.login}
              password={item.password}
            />
          ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 flex-1">
      <Banner />
      <Layout.Card>
        <div className="flex justify-center items-center text-center flex-col gap-2">
          <LockIcon className="size-12 text-muted-foreground" />
          <p className="text-lg">Nenhuma senha salva ainda</p>
          <p className="text-sm text-muted-foreground">
            Gere uma senha e clique em "Salvar" para começar.
          </p>
        </div>
      </Layout.Card>
    </div>
  );
}

function Banner() {
  return (
    <WebOnly>
      <Layout.Card className="space-y-1">
        <p className="font-bold">Desbloqueie o máximo do IronKey</p>
        <p className="text-sm">
          Faça o download do nosso app desktop e acesse suas senhas sem precisar
          de internet. Não custa nada.
        </p>
        <Link to="/download">
          <Button className="mt-3" variant="primary">
            <DownloadIcon />
            <span>Baixar</span>
          </Button>
        </Link>
      </Layout.Card>
    </WebOnly>
  );
}
