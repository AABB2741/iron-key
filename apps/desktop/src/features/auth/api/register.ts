import type { SignUpBody, SignUpResponse } from "@ironkey/routes/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

import { fetch, setToken } from "@/utils/fetch";

export async function register({ name, email, password }: SignUpBody) {
  const response = await fetch<SignUpResponse, SignUpBody>("/auth/sign-up", {
    method: "POST",
    body: {
      name,
      email,
      password,
    },
  });

  return response.data;
}

export function useRegister() {
  const queryClient = useQueryClient();
  const [, setCookie] = useCookies();

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      if (!response) {
        return;
      }

      queryClient.clear();
      toast.success(`Bem-vindo, ${response.user.name}!`);
      setCookie("token", response.token, {
        path: "/",
      });
      setToken(response.token);
    },
  });

  return { ...mutation, register: mutation.mutateAsync };
}
