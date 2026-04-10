const rawBaseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
const rawApiBasePath = process.env.NEXT_PUBLIC_API_BASE_PATH as string;

export const baseUrl = normalizeBaseUrl(rawBaseUrl);
export const apiBasePath = normalizeBasePath(rawApiBasePath);

export function getApiUrl(path: string) {
	return joinPath(joinPath(baseUrl, apiBasePath), path);
}

function normalizeBaseUrl(value: string) {
	if (!value || value === "/") {
		return "/";
	}

	return value.replace(/\/+$/g, "");
}

function normalizeBasePath(value: string) {
	if (!value || value === "/") {
		return "/";
	}

	return `/${value.replace(/^\/+|\/+$/g, "")}`;
}

function joinPath(base: string, path: string) {
	if (!path || path === "/") {
		return base === "/" ? "/" : base;
	}

	const normalizedPath = path.replace(/^\/+/, "");

	if (base === "/") {
		return `/${normalizedPath}`;
	}

	return `${base}/${normalizedPath}`;
}
