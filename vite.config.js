// vite.config.js
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";
  let base = isProduction ? "/ball/" : "/";

  return {
    base: base,
  };
});
