"use client";

import { useEffect, useState } from "react";
import { getApiUrl } from "@/lib/api";
import { ErrorCard } from "../components/error-card";
import type {
  ApiErrorState,
  DebugUsersFailure,
  DebugUsersSuccess,
  DemoUser,
} from "../demo-types";
import { toApiError, toThrownApiError } from "../demo-utils";

export function UserTablePanel() {
  const [usersStatus, setUsersStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [users, setUsers] = useState<DemoUser[]>([]);
  const [usersError, setUsersError] = useState<ApiErrorState | null>(null);
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function loadUsers({ resetStatus }: { resetStatus: boolean }) {
    if (resetStatus) {
      setUsersStatus("loading");
      setUsersError(null);
    }

    try {
      const response = await fetch(getApiUrl("/debug/users"), {
        method: "GET",
        cache: "no-store",
      });

      const payload = (await response.json()) as DebugUsersSuccess | DebugUsersFailure;

      if (!response.ok || !payload.ok) {
        setUsers([]);
        setUsersStatus("error");
        setUsersError(toApiError(response.status, payload));
        return;
      }

      setUsers(payload.users);
      setUsersStatus("success");
    } catch (caughtError) {
      setUsers([]);
      setUsersStatus("error");
      setUsersError(toThrownApiError(caughtError));
    }
  }

  async function handleCreateUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setUsersError(null);

    try {
      const response = await fetch(getApiUrl("/debug/users"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          gender,
        }),
      });

      const payload = (await response.json()) as { ok: true; user: DemoUser } | DebugUsersFailure;

      if (!response.ok || !payload.ok) {
        setUsersError(toApiError(response.status, payload));
        return;
      }

      setUsername("");
      setGender("");
      await loadUsers({ resetStatus: false });
    } catch (caughtError) {
      setUsersError(toThrownApiError(caughtError));
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (usersStatus !== "idle") {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      void loadUsers({ resetStatus: true });
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [usersStatus]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-black/45">User table</p>
          <h2 className="display-font mt-2 text-2xl sm:text-3xl">Debug `user` records</h2>
        </div>
        <button
          type="button"
          onClick={() => {
            void loadUsers({ resetStatus: true });
          }}
          className="inline-flex items-center justify-center rounded-full border border-black/10 px-5 py-3 text-sm font-medium text-black/75 transition hover:bg-black/5"
        >
          刷新列表
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[24px] border border-black/8 bg-[var(--surface)] p-5">
          <p className="text-sm uppercase tracking-[0.16em] text-black/45">Create user</p>
          <form onSubmit={handleCreateUser} className="mt-4 space-y-4">
            <label className="block space-y-2">
              <span className="text-sm text-black/55">Username</span>
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="demo-user"
                className="w-full rounded-[18px] border border-black/10 bg-white/80 px-4 py-3 outline-none transition focus:border-[var(--accent)]"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm text-black/55">Gender</span>
              <input
                type="text"
                value={gender}
                onChange={(event) => setGender(event.target.value)}
                placeholder="male / female / other"
                className="w-full rounded-[18px] border border-black/10 bg-white/80 px-4 py-3 outline-none transition focus:border-[var(--accent)]"
              />
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
            >
              {isSubmitting ? "提交中..." : "新增测试用户"}
            </button>
          </form>
        </section>

        <section className="rounded-[24px] border border-black/8 bg-white/82 p-5">
          <p className="text-sm uppercase tracking-[0.16em] text-black/45">API surface</p>
          <div className="mt-4 space-y-3 text-sm leading-7 text-black/65">
            <p className="text-safe-wrap">GET {getApiUrl("/debug/users")}</p>
            <p className="text-safe-wrap">POST {getApiUrl("/debug/users")}</p>
            <p>
              表结构只有两个字段：`username` 和 `gender`。其中 `username` 是主键，用来避免额外加第三个测试字段。
            </p>
          </div>
        </section>
      </div>

      {usersStatus === "loading" ? (
        <div className="rounded-[24px] border border-dashed border-black/12 bg-[var(--surface)] p-5 text-sm leading-7 text-black/60">
          正在拉取 `user` 表中的测试数据。
        </div>
      ) : null}

      {usersStatus === "success" ? (
        <section className="rounded-[24px] border border-black/8 bg-white/82 p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm uppercase tracking-[0.16em] text-black/45">Current rows</p>
            <p className="text-sm text-black/50">{users.length} rows</p>
          </div>

          {users.length === 0 ? (
            <p className="mt-4 text-sm leading-7 text-black/60">
              当前还没有测试数据。可以先在左侧创建一条。
            </p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-3 text-left text-sm text-black/75">
                <thead>
                  <tr className="text-black/45">
                    <th className="pr-4 font-medium">Username</th>
                    <th className="font-medium">Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.username}>
                      <td className="rounded-l-[16px] border border-r-0 border-black/8 bg-[var(--surface)] px-4 py-3">
                        <span className="text-safe-wrap">{user.username}</span>
                      </td>
                      <td className="rounded-r-[16px] border border-black/8 bg-[var(--surface)] px-4 py-3">
                        <span className="text-safe-wrap">{user.gender}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ) : null}

      {usersError ? <ErrorCard error={usersError} /> : null}
    </div>
  );
}
