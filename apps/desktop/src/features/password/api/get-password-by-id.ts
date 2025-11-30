import type {
  GetPasswordByIdParams,
  GetPasswordByIdResponse,
} from "@ironkey/routes/passwords";
import { useQuery } from "@tanstack/react-query";

import { fetch } from "@/utils/fetch";

export async function getPasswordById({ id }: GetPasswordByIdParams) {
  const response = await fetch<GetPasswordByIdResponse>(`/passwords/${id}`, {
    method: "GET",
  });

  return response.data;
}

interface UsePasswordByIdProps {
  passwordId: string;
  options?: {
    enabled?: boolean;
  };
}

export function usePasswordById({ passwordId, options }: UsePasswordByIdProps) {
  const query = useQuery({
    queryFn: () => getPasswordById({ id: passwordId }),
    queryKey: ["passwords", { passwordId }],
    ...options,
  });

  return { ...query, password: query.data?.password };
}
