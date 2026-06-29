import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), "../../.env.bridgehub") });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
