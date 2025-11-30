import type {
  ListPasswordsItem,
  ListPasswordsResponse,
} from "@ironkey/routes/passwords";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { api } from "@/lib/axios";
import { isDesktop } from "@/utils/is-desktop";
import { merge } from "@/utils/merge.ts";

export type Password = ListPasswordsItem & {
  isSavedLocally?: boolean;
};

interface ListPasswordsResult {
  passwords: Password[];
  error?: unknown;
}

export async function listPasswords(): Promise<ListPasswordsResult> {
  const onlinePasswords: ListPasswordsItem[] = [];
  let error: unknown;

  try {
    const result = await api.get<ListPasswordsResponse>("/passwords");

    return result.data;
  } catch (caughtError) {
    if (!isDesktop()) {
      throw caughtError;
    }

    error = caughtError;
  } finally {
    if (isDesktop()) {
      const { passwordsStore } = await import("../stores/passwords-store.ts");
      const savedPasswords = await passwordsStore.listAll();

      for (const password of onlinePasswords) {
        const savedPassword = savedPasswords.find((p) => p.id === password.id);

        if (!savedPassword) {
          await passwordsStore.add(password);
          continue;
        }

        if (new Date(savedPassword.updatedAt) < new Date(password.updatedAt)) {
          await passwordsStore.update(password.id, password);
        }
      }

      return {
        passwords: merge(
          savedPasswords.map((p) => ({ ...p, isSavedLocally: true })),
          onlinePasswords,
          (a, b) => a.id === b.id,
        ),
        error,
      };
    }
  }

  return { passwords: onlinePasswords };
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
