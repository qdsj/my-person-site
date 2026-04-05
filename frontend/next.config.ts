import path from "node:path";
import type { NextConfig } from "next";

function formatBuildTime(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
}

const buildTime = formatBuildTime(new Date());

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname, ".."),
  basePath: "/person-site",
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BUILD_TIME: buildTime,
    NEXT_PUBLIC_API_BASE_PATH: process.env.NEXT_PUBLIC_API_BASE_PATH ?? "/api/v1",
  },
};

export default nextConfig;
