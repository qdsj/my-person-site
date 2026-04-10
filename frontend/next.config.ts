import path from "node:path";
import type { NextConfig } from "next";

const buildTime = new Date().toISOString();
const apiBasePath = process.env.NODE_ENV === "development" ? "/" : "/server";
const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3002" : "/";

const nextConfig: NextConfig = {
	output: "standalone",
	outputFileTracingRoot: path.join(__dirname, ".."),
	basePath: "/person-site",
	trailingSlash: true,
	env: {
		NEXT_PUBLIC_BUILD_TIME: buildTime,
		NEXT_PUBLIC_BASE_URL: baseUrl,
		NEXT_PUBLIC_API_BASE_PATH: apiBasePath,
	},
};

export default nextConfig;
