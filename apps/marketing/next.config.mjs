import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const monorepoRoot = resolve(__dirname, "../..");

if (!process.env.VERCEL) {
  const { config } = await import("dotenv");
  config({ path: resolve(monorepoRoot, ".env.bridgehub") });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Monorepo: trace deps from repo root so Vercel includes workspace node_modules.
  outputFileTracingRoot: monorepoRoot,
  webpack: (config, { dev }) => {
    if (dev) {
      // Avoid EMFILE on macOS — polling + ignore heavy handoff HTML only
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: [
          "**/node_modules/**",
          "**/.git/**",
          "**/design/handoff/**",
        ],
      };
    }
    return config;
  },
};

export default nextConfig;
