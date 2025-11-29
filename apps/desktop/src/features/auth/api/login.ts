import type { SignInBody, SignInResponse } from "@ironkey/routes/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { fetch } from "@/utils/fetch";
import { useCookies } from "react-cookie";

export async function login({ email, password }: SignInBody) {
  const response = await fetch<SignInResponse, SignInBody>("/auth/sign-in", {
    method: "POST",
    body: {
      email,
      password,
    },
  });

  return response;
}

export function useLogin() {
  const [, setCookie] = useCookies();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: ({ user, token }) => {
      toast.success(`Bem-vindo de volta, ${user.name}!`);
      setCookie("token", token, {
        path: "/",
      });
    },
  });

  return { ...mutation, login: mutation.mutateAsync };
}
