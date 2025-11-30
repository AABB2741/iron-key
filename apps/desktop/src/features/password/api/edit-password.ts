import type {
  UpdatePasswordBody,
  UpdatePasswordResponse,
} from "@ironkey/routes/passwords";

import { fetch } from "@/utils/fetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface EditPasswordProps extends UpdatePasswordBody {
  passwordId: string;
}

export async function editPassword({ passwordId, ...body }: EditPasswordProps) {
  const response = await fetch<UpdatePasswordResponse, UpdatePasswordBody>(
    `/passwords/${passwordId}`,
    {
      method: "PATCH",
      body,
    },
  );

  return response.data;
}

export function useEditPassword() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: editPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["passwords"] });
    },
  });

  return { ...mutation, editPassword: mutation.mutateAsync };
}
