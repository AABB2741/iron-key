import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { LockIcon, MailIcon } from "lucide-react";

import { Form } from "@/components/form";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/features/auth/api/login";
import { getErrorMessage } from "@/utils/get-error-message";
import { signInBody, type SignInBody } from "@ironkey/routes/auth";
import { useForm } from "@tanstack/react-form";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { login, error } = useLogin();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } satisfies SignInBody,
    validators: {
      onSubmit: signInBody,
    },
    onSubmit: async (form) => {
      await login({
        email: form.value.email,
        password: form.value.password,
      });
      router.navigate({ to: "/" });
    },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <LockIcon className="text-primary mx-auto size-8" />
      <h1 className="text-center font-bold text-4xl">Entrar</h1>
      <p className="text-center text-muted-foreground">
        Acesse sua conta para sincronizar suas senhas
      </p>

      <form.Field
        name="email"
        children={(field) => (
          <Form.TextField
            label="E-mail"
            icon={MailIcon}
            type="email"
            placeholder="seu@email.com"
            containerLabelClassName="w-full"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
          />
        )}
      />
      <form.Field
        name="password"
        children={(field) => (
          <Form.TextField
            label="Senha"
            icon={LockIcon}
            placeholder="********"
            type="password"
            containerLabelClassName="w-full"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
          />
        )}
      />

      {error && (
        <p className="text-red-500 text-center">{getErrorMessage(error)}</p>
      )}

      <Button variant="primary" className="p-6 w-full" type="submit">
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
