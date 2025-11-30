import type {
  GetPasswordByIdResponse as ApiGetPasswordByIdResponse,
  GetPasswordByIdParams,
} from "@ironkey/routes/passwords";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { fetch } from "@/utils/fetch";
import { isDesktop } from "@/utils/is-desktop";

interface GetPasswordByIdResponse {
  password: ApiGetPasswordByIdResponse["password"] | null;
  isSavedLocally?: boolean;
}

export async function getPasswordById({
  id,
}: GetPasswordByIdParams): Promise<GetPasswordByIdResponse> {
  try {
    const response = await fetch<GetPasswordByIdResponse>(`/passwords/${id}`, {
      method: "GET",
    });

    return response.data;
  } catch (error) {
    // TODO: handle `fetch` errors
    if (isAxiosError(error) && error.response?.status === 404) {
      return { password: null };
    }

    if (!isDesktop()) {
      throw error;
    }

    const { passwordsStore } = await import("../stores/passwords-store.ts");
    const password = await passwordsStore.getById(id);

    return { password, isSavedLocally: true };
  }
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

  return {
    ...query,
    password: query.data?.password,
    isSavedLocally: query.data?.isSavedLocally,
  };
}
