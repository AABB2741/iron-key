import * as http from "@tauri-apps/plugin-http";
import type { Method } from "axios";

import { env } from "@/env";
import { api } from "@/lib/axios";

import { isDesktop } from "./is-desktop";

interface FetchParams<Body> {
  method: Method;
  body?: Body;
}

let token: string | null = null;

export async function fetch<Response, Request = unknown>(
  path: string,
  params: FetchParams<Request>,
) {
  if (isDesktop()) {
    const headers: Record<string, string> = {};

    if (params.body) {
      headers["content-type"] = "application/json";
    }

    if (token) {
      headers["authorization"] = `Bearer ${token}`;
    }

    const response = await http.fetch(`${env.VITE_API_URL}${path}`, {
      method: params.method,
      body: params.body ? JSON.stringify(params.body) : undefined,
      headers,
    });

    if (!response.ok) {
      const data = await response.json();

      if ("message" in data && typeof data.message === "string") {
        throw new Error(data.message);
      }

      throw new Error("Ocorreu um erro.");
    }

    console.log("Transforming to json:", response);
    try {
      return (await response.json()) as Response;
    } catch (error) {
      return null as Response;
    }
  }

  const response = await api.request<Response>({
    url: path,
    method: params.method,
    data: params.body,
  });

  return response.data;
}

export function setToken(newToken: string) {
  token = newToken;
  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${newToken}`;
    return config;
  });
}
