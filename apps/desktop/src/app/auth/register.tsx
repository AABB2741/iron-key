import { createFileRoute, Link } from "@tanstack/react-router";
import { LockIcon, MailIcon, UserIcon } from "lucide-react";

import { Form } from "@/components/form";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <form className="space-y-4">
      <UserIcon className="text-primary mx-auto size-8" />
      <h1 className="text-center font-bold text-4xl">Criar conta</h1>
      <p className="text-center text-muted-foreground">
        Registre-se para sincronizar suas senhas na nuvem
      </p>

      <Form.TextField
        label="Nome"
        icon={UserIcon}
        placeholder="Seu nome"
        containerLabelClassName="w-full"
      />
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
      <Form.TextField
        label="Confirmar senha"
        icon={LockIcon}
        placeholder="********"
        type="password"
        containerLabelClassName="w-full"
      />
      <Button variant="primary" className="p-6 w-full">
        Entrar
      </Button>
      <p className="text-center">
        Já tem uma conta?{" "}
        <Link className="text-primary" to="/auth/login">
          Entrar
        </Link>
      </p>
    </form>
  );
}
