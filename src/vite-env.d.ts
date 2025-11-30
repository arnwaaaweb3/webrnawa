/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_IG_TOKEN: string;
  // tambahkan env var lain di sini jika ada
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}