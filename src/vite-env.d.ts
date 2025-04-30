/// <reference types="vite/client" />

interface ProcessEnv {
  readonly NODE_ENV: "development" | "production" | "test";
  readonly VITE_BACKEND_URLs: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
