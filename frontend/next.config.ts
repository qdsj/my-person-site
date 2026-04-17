import path from "node:path";
import type { NextConfig } from "next";

const buildTime = new Date().toISOString();
const isDev = process.env.NODE_ENV === "development";
const appBasePath = "/person-site";
const apiBasePath = "/server";
const baseUrl = isDev ? appBasePath : "/";

const nextConfig: NextConfig = {
	output: "standalone",
	outputFileTracingRoot: path.join(__dirname, ".."),
	basePath: appBasePath,
	trailingSlash: true,
	async rewrites() {
		if (process.env.NODE_ENV !== "development") {
			return [];
		}

		return [
			{
				source: "/server/:path*",
				destination: "http://localhost:3002/:path*",
			},
		];
	},
	env: {
		NEXT_PUBLIC_BUILD_TIME: buildTime,
		NEXT_PUBLIC_BASE_URL: baseUrl,
		NEXT_PUBLIC_API_BASE_PATH: apiBasePath,
	},
};

export default nextConfig;
