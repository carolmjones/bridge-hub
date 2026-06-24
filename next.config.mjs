import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.bridgehub") });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
