import { z } from "zod";

const envSchema = z.object({
  VITE_WEB_URL: z
    .url()
    .transform((v) => (v.endsWith("/") ? v.slice(0, -1) : v)),
  VITE_API_URL: z
    .url()
    .transform((v) => (v.endsWith("/") ? v.slice(0, -1) : v)),
});

export const env = envSchema.parse(import.meta.env);
