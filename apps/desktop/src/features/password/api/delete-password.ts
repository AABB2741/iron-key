import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { fetch } from "@/utils/fetch";

interface DeletePasswordProps {
  passwordId: string;
}

export async function deletePassword({ passwordId }: DeletePasswordProps) {
  await fetch(`/passwords/${passwordId}`, {
    method: "DELETE",
  });
}

export function useDeletePassword() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deletePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["passwords"] });
      toast.success("Senha deletada com sucesso");
    },
  });

  return { ...mutation, deletePassword: mutation.mutateAsync };
}
