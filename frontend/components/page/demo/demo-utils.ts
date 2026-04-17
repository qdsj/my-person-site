import type { ApiErrorState } from "./demo-types";

export function toApiError(statusCode: number, payload: unknown): ApiErrorState {
  const candidate: Record<string, unknown> =
    typeof payload === "object" && payload !== null ? (payload as Record<string, unknown>) : {};

  return {
    statusCode,
    message: typeof candidate.message === "string" ? candidate.message : "Request failed.",
    errorCode:
      typeof candidate.errorCode === "string" || typeof candidate.errorCode === "number"
        ? candidate.errorCode
        : undefined,
  };
}

export function toThrownApiError(caughtError: unknown): ApiErrorState {
  return {
    statusCode: 0,
    message: caughtError instanceof Error ? caughtError.message : "Request failed.",
  };
}

export function parseEmbeddingInput(value: string) {
  return value
    .split(",")
    .map((item) => Number(item.trim()))
    .filter((item) => !Number.isNaN(item));
}
