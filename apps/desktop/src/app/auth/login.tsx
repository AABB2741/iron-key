import { createFileRoute, Link } from "@tanstack/react-router";
import { LockIcon, MailIcon } from "lucide-react";

import { Form } from "@/components/form";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <form className="space-y-4">
      <LockIcon className="text-primary mx-auto size-8" />
      <h1 className="text-center font-bold text-4xl">Entrar</h1>
      <p className="text-center text-muted-foreground">
        Acesse sua conta para sincronizar suas senhas
      </p>

      <Form.TextField
        label="E-mail"
        icon={MailIcon}
        type="email"
        placeholder="seu@email.com"
        containerLabelClassName="w-full"
      />
      <Form.TextField
        label="Senha"
        icon={LockIcon}
        placeholder="********"
        type="password"
        containerLabelClassName="w-full"
      />
      <Button variant="primary" className="p-6 w-full">
        Entrar
      </Button>
      <p className="text-center">
        Não tem uma conta?{" "}
        <Link className="text-primary" to="/auth/register">
          Criar uma
        </Link>
      </p>
    </form>
  );
}
