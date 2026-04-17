"use client";

import { useEffect, useState } from "react";
import { getApiUrl } from "@/lib/api";
import { ErrorCard } from "../components/error-card";
import type {
  ApiErrorState,
  MysqlConnectionFailure,
  MysqlConnectionSuccess,
} from "../demo-types";
import { toApiError, toThrownApiError } from "../demo-utils";

export function MysqlConnectionPanel() {
  const [connectionStatus, setConnectionStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [connectionData, setConnectionData] = useState<MysqlConnectionSuccess | null>(null);
  const [connectionError, setConnectionError] = useState<ApiErrorState | null>(null);

  async function runConnectionCheck({ resetStatus }: { resetStatus: boolean }) {
    if (resetStatus) {
      setConnectionStatus("loading");
      setConnectionError(null);
    }

    try {
      const response = await fetch(getApiUrl("/debug/mysql-connection"), {
        method: "GET",
        cache: "no-store",
      });

      const payload = (await response.json()) as MysqlConnectionSuccess | MysqlConnectionFailure;

      if (!response.ok || !payload.ok) {
        setConnectionData(null);
        setConnectionStatus("error");
        setConnectionError(toApiError(response.status, payload));
        return;
      }

      setConnectionData(payload);
      setConnectionStatus("success");
    } catch (caughtError) {
      setConnectionData(null);
      setConnectionStatus("error");
      setConnectionError(toThrownApiError(caughtError));
    }
  }

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      void runConnectionCheck({ resetStatus: false });
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-black/45">Connection result</p>
          <h2 className="display-font mt-2 text-2xl sm:text-3xl">
            {connectionStatus === "loading"
              ? "Checking..."
              : connectionStatus === "success"
                ? "Connected"
                : "Connection failed"}
          </h2>
        </div>
        <button
          type="button"
          onClick={() => {
            void runConnectionCheck({ resetStatus: true });
          }}
          className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--accent-strong)]"
        >
          重新测试
        </button>
      </div>

      <div className="rounded-[24px] border border-black/8 bg-[var(--surface)] p-5 text-sm leading-7 text-black/65">
        <p className="font-medium text-black/55">Endpoint</p>
        <p className="mt-3 text-safe-wrap">GET {getApiUrl("/debug/mysql-connection")}</p>
      </div>

      {connectionStatus === "loading" ? (
        <div className="rounded-[24px] border border-dashed border-black/12 bg-[var(--surface)] p-5 text-sm leading-7 text-black/60">
          正在等待后端返回最新结果。
        </div>
      ) : null}

      {connectionStatus === "success" && connectionData ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-[22px] border border-black/8 bg-[var(--surface)] p-5">
            <p className="text-sm uppercase tracking-[0.16em] text-black/45">Database</p>
            <p className="mt-3 text-safe-wrap text-lg text-black/80">
              {connectionData.databaseName ?? "-"}
            </p>
          </article>
          <article className="rounded-[22px] border border-black/8 bg-[var(--surface)] p-5">
            <p className="text-sm uppercase tracking-[0.16em] text-black/45">Current user</p>
            <p className="mt-3 text-safe-wrap text-lg text-black/80">
              {connectionData.currentUser}
            </p>
          </article>
          <article className="rounded-[22px] border border-black/8 bg-[var(--surface)] p-5">
            <p className="text-sm uppercase tracking-[0.16em] text-black/45">MySQL version</p>
            <p className="mt-3 text-safe-wrap text-lg text-black/80">
              {connectionData.mysqlVersion}
            </p>
          </article>
          <article className="rounded-[22px] border border-black/8 bg-[var(--surface)] p-5">
            <p className="text-sm uppercase tracking-[0.16em] text-black/45">Server time</p>
            <p className="mt-3 text-safe-wrap text-lg text-black/80">
              {new Date(connectionData.serverTime).toLocaleString()}
            </p>
          </article>
        </div>
      ) : null}

      {connectionStatus === "error" && connectionError ? (
        <ErrorCard error={connectionError} />
      ) : null}
    </div>
  );
}
