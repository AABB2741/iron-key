import { createFileRoute, Link } from "@tanstack/react-router";
import { LogInIcon } from "lucide-react";

import { PasswordGeneratorCard } from "@/features/password/components/password-generator-card";
import { SavedPasswordsCard } from "@/features/password/components/saved-passwords-card";

import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <Layout.Container>
      <header className="flex gap-4 justify-end">
        <Link to="/auth/login">
          <Button>
            <LogInIcon />
            <span>Entrar</span>
          </Button>
        </Link>
      </header>

      <div className="text-center space-y-2">
        <h1 className="font-black text-4xl">IronKey</h1>
        <p className="text-secondary">
          Crie senhas fortes e seguras instantaneamente
        </p>
      </div>

      <div className="flex flex-col items-stretch justify-center gap-6 md:flex-row md:items-start">
        <PasswordGeneratorCard />
        <SavedPasswordsCard />
      </div>
    </Layout.Container>
  );
}
