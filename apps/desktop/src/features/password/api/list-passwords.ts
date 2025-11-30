import type { ListPasswordsResponse } from "@ironkey/routes/passwords";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { api } from "@/lib/axios";

export async function listPasswords() {
  const result = await api.get<ListPasswordsResponse>("/passwords");

  return result.data;
}

export function usePasswords() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["passwords"],
    queryFn: listPasswords,
  });

  const reset = useCallback(() => {
    queryClient.resetQueries({ queryKey: ["passwords"] });
  }, [queryClient]);

  return {
    ...query,
    passwords: query.data?.passwords,
    reset,
  };
}
