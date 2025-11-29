import type { SignInBody, SignInResponse } from "@ironkey/routes/auth";
import { useMutation } from "@tanstack/react-query";

import { api } from "@/lib/axios";

export async function login({ email, password }: SignInBody) {
  const response = await api.post<SignInResponse>("/auth/sign-in", {
    email,
    password,
  });
  return response.data;
}

export function useLogin() {
  const mutation = useMutation({
    mutationFn: login,
  });

  return { ...mutation, login: mutation.mutateAsync };
}
