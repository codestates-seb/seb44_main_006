/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_API_SERVER_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
