import { env } from "@/env";
import { api } from "@/lib/axios";
import * as http from "@tauri-apps/plugin-http";
import type { Method } from "axios";
import { isDesktop } from "./is-desktop";

interface FetchParams<Body> {
  method: Method;
  body?: Body;
}

export async function fetch<Response, Request = unknown>(
  path: string,
  params: FetchParams<Request>,
) {
  if (isDesktop()) {
    const response = await http.fetch(`${env.VITE_API_URL}${path}`, {
      method: params.method,
      body: params.body ? JSON.stringify(params.body) : undefined,
      headers: {
        "content-type": "application/json",
      },
    });

    if (!response.ok) {
      const data = await response.json();

      if ("message" in data && typeof data.message === "string") {
        throw new Error(data.message);
      }

      throw new Error("Ocorreu um erro.");
    }

    return response.json() as Promise<Response>;
  }

  const response = await api.request<Response>({
    url: path,
    ...params,
  });

  return response.data;
}
