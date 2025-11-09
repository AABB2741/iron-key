import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src"],
  splitting: true,
  format: "esm",
  outDir: "dist",
});
