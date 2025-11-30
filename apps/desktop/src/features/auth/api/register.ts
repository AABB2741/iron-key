import type { SignUpBody, SignUpResponse } from "@ironkey/routes/auth";
import { useMutation } from "@tanstack/react-query";

import { fetch } from "@/utils/fetch";

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
  const mutation = useMutation({
    mutationFn: register,
  });

  return { ...mutation, register: mutation.mutateAsync };
}
