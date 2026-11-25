import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      enforce: "pre",
      test: /\.(png|jpe?g|webp)$/i,
      include: fileURLToPath(new URL("./app/images/event-flyers/", import.meta.url)),
      loader: fileURLToPath(new URL("./scripts/flyer-thumbnail.cjs", import.meta.url)),
    });
    return config;
  },
};

export default nextConfig;
