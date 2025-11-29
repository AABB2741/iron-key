import type { SignUpBody, SignUpResponse } from "@ironkey/routes/auth";
import { useMutation } from "@tanstack/react-query";
import { fetch } from "@tauri-apps/plugin-http";

import { env } from "@/env";
import { api } from "@/lib/axios";
import { isDesktop } from "@/utils/is-desktop";

export async function register({ name, email, password }: SignUpBody) {
  if (isDesktop()) {
    const response = await fetch(`${env.VITE_API_URL}/auth/sign-up`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const data = await response.json();

      if ("message" in data && typeof data.message === "string") {
        throw new Error(data.message);
      }

      throw new Error("Ocorreu um erro.");
    }

    const data = (await response.json()) as SignUpResponse;

    return data;
  }

  const response = await api.post<SignUpResponse>("/auth/sign-up", {
    name,
    email,
    password,
  });

  return response.data;
}

export function useRegister() {
  const mutation = useMutation({
    mutationFn: register,
  });

  return { ...mutation, register: mutation.mutateAsync };
}
