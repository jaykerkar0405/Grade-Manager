// App's External Imports
import react from "@vitejs/plugin-react";
import { loadEnv, defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          secure: false,
          changeOrigin: true,
          target: env.VITE_SERVER_BASE_URL,
        },
      },
    },
  };
});
