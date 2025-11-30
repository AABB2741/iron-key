import type {
  CreatePasswordBody,
  CreatePasswordResponse,
} from "@ironkey/routes/passwords";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { fetch } from "@/utils/fetch";

export async function createPassword(body: CreatePasswordBody) {
  const response = await fetch<CreatePasswordResponse, CreatePasswordBody>(
    "/passwords",
    {
      method: "POST",
      body,
    },
  );

  return response.data;
}

export function useCreatePassword() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPassword,
    onSuccess: () => {
      toast.success("Senha salva com sucesso");
      queryClient.invalidateQueries({ queryKey: ["passwords"] });
    },
  });

  return { ...mutation, createPassword: mutation.mutateAsync };
}
