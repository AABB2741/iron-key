import { createFileRoute, Link } from "@tanstack/react-router";
import { LockIcon, MailIcon, UserIcon } from "lucide-react";

import { Form } from "@/components/form";
import { Button } from "@/components/ui/button";
import { useRegister } from "@/features/auth/api/register";
import { getErrorMessage } from "@/utils/get-error-message";
import { signUpBody, type SignUpBody } from "@ironkey/routes/auth";
import { useForm } from "@tanstack/react-form";

export const Route = createFileRoute("/auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const { register } = useRegister();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    } satisfies SignUpBody,
    validators: {
      onSubmit: signUpBody,
    },
    onSubmit: async (form) => {
      try {
        await register({
          name: form.value.name,
          email: form.value.email,
          password: form.value.password,
        });
      } catch (error) {
        console.log("Registration error:", error);
        form.formApi.setErrorMap({
          onSubmit: {
            fields: {},
            form: getErrorMessage(error),
          },
        });
      }
    },
  });

  console.log(form.state.errorMap.onSubmit);

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <UserIcon className="text-primary mx-auto size-8" />
      <h1 className="text-center font-bold text-4xl">Criar conta</h1>
      <p className="text-center text-muted-foreground">
        Registre-se para sincronizar suas senhas na nuvem
      </p>

      <form.Field
        name="name"
        children={(field) => (
          <Form.TextField
            label="Nome"
            icon={UserIcon}
            placeholder="Seu nome"
            containerLabelClassName="w-full"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            error={field.state.meta.errorMap.onSubmit}
            autoFocus
          />
        )}
      />

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
            error={field.state.meta.errorMap.onSubmit}
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
            error={field.state.meta.errorMap.onSubmit}
          />
        )}
      />

      {form.state.errorMap.onSubmit && (
        <p className="text-destructive">
          {getErrorMessage(form.state.errorMap.onSubmit)}
        </p>
      )}

      <Button variant="primary" className="p-6 w-full" type="submit">
        Cadastrar-se
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
