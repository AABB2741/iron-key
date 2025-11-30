import type { SignUpBody, SignUpResponse } from "@ironkey/routes/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      queryClient.clear();
    },
  });

  return { ...mutation, register: mutation.mutateAsync };
}
