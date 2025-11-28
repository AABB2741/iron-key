import { CopyIcon, RefreshCcwIcon, SaveIcon } from "lucide-react";
import { useState } from "react";

import { TextField } from "@/components/form/text-field";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";

import { generatePassword } from "@/utils/generate-password";
import { toast } from "sonner";
import { usePasswordForm } from "./password-form";

export function PasswordGeneratorCard() {
  const [password, setPassword] = useState("");

  const form = usePasswordForm({
    defaultValues: {
      length: 16,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true,
    },
    onSubmit: (form) => {
      const password = generatePassword({
        length: form.value.length,
        lowercase: form.value.includeLowercase,
        uppercase: form.value.includeUppercase,
        numbers: form.value.includeNumbers,
        symbols: form.value.includeSymbols,
      });

      setPassword(password);
    },
    validators: {
      onSubmit: (form) => {
        console.log("Validating");

        if (
          [
            form.value.includeLowercase,
            form.value.includeUppercase,
            form.value.includeNumbers,
            form.value.includeSymbols,
          ].every((v) => !v)
        ) {
          return "Selecione pelo menos uma opção para gerar a senha.";
        }

        console.log("Ok");
      },
    },
  });

  return (
    <Layout.Card className="flex-1">
      <form.AppForm>
        <form action={form.handleSubmit} className="space-y-4">
          <TextField
            label="Gerador de senhas"
            placeholder="Gere uma senha para vê-la aqui"
            value={password}
            readOnly
            options={[
              {
                icon: CopyIcon,
                disabled: !password,
                type: "button",
                onClick: () => {
                  try {
                    navigator.clipboard.writeText(password);
                    toast.success("Copiado para a área de transferência!");
                  } catch (error) {
                    toast.error("Não foi possível copiar a senha.", {
                      description: String(error),
                    });
                  }
                },
              },
            ]}
          />

          <div className="space-y-2">
            <form.AppField
              name="length"
              children={(field) => <field.LengthField />}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="">Opções</label>
            <div className="flex justify-between gap-4 items-center">
              <form.AppField
                name="includeUppercase"
                children={(field) => (
                  <field.SwitchField
                    label="Letras maiúsculas (A-Z)"
                    checked={field.state.value}
                    onCheckedChange={field.handleChange}
                  />
                )}
              />
            </div>
            <div className="flex justify-between gap-4 items-center">
              <form.AppField
                name="includeLowercase"
                children={(field) => (
                  <field.SwitchField
                    label="Letras minúsculas (a-z)"
                    checked={field.state.value}
                    onCheckedChange={field.handleChange}
                  />
                )}
              />
            </div>
            <div className="flex justify-between gap-4 items-center">
              <form.AppField
                name="includeNumbers"
                children={(field) => (
                  <field.SwitchField
                    label="Números (0-9)"
                    checked={field.state.value}
                    onCheckedChange={field.handleChange}
                  />
                )}
              />
            </div>
            <div className="flex justify-between gap-4 items-center">
              <form.AppField
                name="includeSymbols"
                children={(field) => (
                  <field.SwitchField
                    label="Símbolos (!@#$%...)"
                    checked={field.state.value}
                    onCheckedChange={field.handleChange}
                  />
                )}
              />
            </div>
          </div>

          <div>
            <form.Subscribe
              selector={(form) => form.errorMap.onSubmit}
              children={(error) => <p className="text-red-400">{error}</p>}
            />
          </div>

          <div className="flex items-center gap-2">
            <Button type="submit" className="flex-1" variant="primary">
              <RefreshCcwIcon />
              <span>Gerar senha</span>
            </Button>
            <Button type="button">
              <SaveIcon />
              <span>Salvar senha</span>
            </Button>
          </div>
        </form>
      </form.AppForm>
    </Layout.Card>
  );
}
