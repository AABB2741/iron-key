import type { SignInBody, SignInResponse } from "@ironkey/routes/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

import { fetch, setToken } from "@/utils/fetch";

export async function login({ email, password }: SignInBody) {
  const response = await fetch<SignInResponse, SignInBody>("/auth/sign-in", {
    method: "POST",
    body: {
      email,
      password,
    },
  });

  return response.data;
}

export function useLogin() {
  const queryClient = useQueryClient();
  const [, setCookie] = useCookies();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: ({ user, token }) => {
      queryClient.clear();
      toast.success(`Bem-vindo de volta, ${user.name}!`);
      setCookie("token", token, {
        path: "/",
      });
      setToken(token);
    },
  });

  return { ...mutation, login: mutation.mutateAsync };
}
