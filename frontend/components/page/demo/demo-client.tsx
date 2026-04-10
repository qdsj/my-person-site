"use client";

import { useEffect, useState } from "react";
import { getApiUrl } from "@/lib/api";

type DemoPanel = "mysql-connection" | "user-table";

type MysqlConnectionSuccess = {
  ok: boolean;
  databaseName: string | null;
  currentUser: string;
  mysqlVersion: string;
  serverTime: string;
};

type MysqlConnectionFailure = {
  ok: false;
  message: string;
  errorCode?: string;
};

type DemoUser = {
  username: string;
  gender: string;
};

type DebugUsersSuccess = {
  ok: true;
  count: number;
  users: DemoUser[];
};

type DebugUsersFailure = {
  ok: false;
  message: string;
  errorCode?: string;
};

export function DemoClient() {
  const [panel, setPanel] = useState<DemoPanel>("mysql-connection");

  const [connectionStatus, setConnectionStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [connectionData, setConnectionData] = useState<MysqlConnectionSuccess | null>(null);
  const [connectionError, setConnectionError] = useState<{
    statusCode: number;
    message: string;
    errorCode?: string;
  } | null>(null);

  const [usersStatus, setUsersStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [users, setUsers] = useState<DemoUser[]>([]);
  const [usersError, setUsersError] = useState<{
    statusCode: number;
    message: string;
    errorCode?: string;
  } | null>(null);
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        setConnectionError({
          statusCode: response.status,
          message: "message" in payload ? payload.message : "Request failed.",
          errorCode: "errorCode" in payload ? payload.errorCode : undefined,
        });
        return;
      }

      setConnectionData(payload);
      setConnectionStatus("success");
    } catch (caughtError) {
      setConnectionData(null);
      setConnectionStatus("error");
      setConnectionError({
        statusCode: 0,
        message: caughtError instanceof Error ? caughtError.message : "Request failed.",
      });
    }
  }

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
        setUsersError({
          statusCode: response.status,
          message: "message" in payload ? payload.message : "Request failed.",
          errorCode: "errorCode" in payload ? payload.errorCode : undefined,
        });
        return;
      }

      setUsers(payload.users);
      setUsersStatus("success");
    } catch (caughtError) {
      setUsers([]);
      setUsersStatus("error");
      setUsersError({
        statusCode: 0,
        message: caughtError instanceof Error ? caughtError.message : "Request failed.",
      });
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

      const payload = (await response.json()) as
        | { ok: true; user: DemoUser }
        | DebugUsersFailure;

      if (!response.ok || !payload.ok) {
        setUsersError({
          statusCode: response.status,
          message: "message" in payload ? payload.message : "Request failed.",
          errorCode: "errorCode" in payload ? payload.errorCode : undefined,
        });
        return;
      }

      setUsername("");
      setGender("");
      await loadUsers({ resetStatus: false });
    } catch (caughtError) {
      setUsersError({
        statusCode: 0,
        message: caughtError instanceof Error ? caughtError.message : "Request failed.",
      });
    } finally {
      setIsSubmitting(false);
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

  useEffect(() => {
    if (panel !== "user-table" || usersStatus !== "idle") {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      void loadUsers({ resetStatus: true });
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [panel, usersStatus]);

  return (
    <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
      <aside className="space-y-4">
        <section className="rounded-[24px] border border-black/8 bg-white/82 p-5 sm:rounded-[28px] sm:p-6">
          <p className="text-sm uppercase tracking-[0.18em] text-[var(--secondary)]">
            Demo selector
          </p>
          <h2 className="display-font mt-3 text-2xl text-[var(--accent-strong)]">/demo</h2>
          <p className="mt-3 leading-7 text-black/65">
            这个页面不挂到导航中，也设置为 `noindex`。当前所有联调功能都收敛在这里，后续新接口可以继续往这个选择器里加。
          </p>
          <label className="mt-5 block space-y-2">
            <span className="text-sm text-black/55">测试功能</span>
            <select
              value={panel}
              onChange={(event) => setPanel(event.target.value as DemoPanel)}
              className="w-full rounded-[18px] border border-black/10 bg-[var(--surface)] px-4 py-3 outline-none transition focus:border-[var(--accent)]"
            >
              <option value="mysql-connection">MySQL 连接测试</option>
              <option value="user-table">User 表测试</option>
            </select>
          </label>
        </section>

        <section className="rounded-[24px] border border-black/8 bg-[var(--surface)] p-5 text-sm leading-7 text-black/65 sm:rounded-[28px] sm:p-6">
          <p className="font-medium text-black/55">Current panel</p>
          <p className="mt-3">
            {panel === "mysql-connection"
              ? "检查后端是否能成功连接 `person-site` 数据库。"
              : "通过后端读写 `user` 测试表，验证最小可用数据流。"}
          </p>
        </section>
      </aside>

      <section className="rounded-[28px] border border-black/8 bg-white/82 p-5 sm:rounded-[32px] sm:p-6">
        {panel === "mysql-connection" ? (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-black/45">
                  Connection result
                </p>
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
                  <p className="text-sm uppercase tracking-[0.16em] text-black/45">
                    Current user
                  </p>
                  <p className="mt-3 text-safe-wrap text-lg text-black/80">
                    {connectionData.currentUser}
                  </p>
                </article>
                <article className="rounded-[22px] border border-black/8 bg-[var(--surface)] p-5">
                  <p className="text-sm uppercase tracking-[0.16em] text-black/45">
                    MySQL version
                  </p>
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
              <div className="rounded-[24px] border border-[rgba(180,92,61,0.22)] bg-[rgba(180,92,61,0.08)] p-5">
                <p className="text-sm uppercase tracking-[0.16em] text-[var(--secondary)]">
                  Error
                </p>
                <p className="mt-3 text-safe-wrap text-lg text-[var(--accent-strong)]">
                  {connectionError.message}
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[18px] bg-white/65 p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-black/45">
                      HTTP status
                    </p>
                    <p className="mt-2 text-base text-black/75">
                      {connectionError.statusCode}
                    </p>
                  </div>
                  <div className="rounded-[18px] bg-white/65 p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-black/45">Error code</p>
                    <p className="mt-2 text-safe-wrap text-base text-black/75">
                      {connectionError.errorCode ?? "-"}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        {panel === "user-table" ? (
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
                  <p className="text-sm uppercase tracking-[0.16em] text-black/45">
                    Current rows
                  </p>
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

            {usersError ? (
              <div className="rounded-[24px] border border-[rgba(180,92,61,0.22)] bg-[rgba(180,92,61,0.08)] p-5">
                <p className="text-sm uppercase tracking-[0.16em] text-[var(--secondary)]">
                  Error
                </p>
                <p className="mt-3 text-safe-wrap text-lg text-[var(--accent-strong)]">
                  {usersError.message}
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[18px] bg-white/65 p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-black/45">
                      HTTP status
                    </p>
                    <p className="mt-2 text-base text-black/75">{usersError.statusCode}</p>
                  </div>
                  <div className="rounded-[18px] bg-white/65 p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-black/45">Error code</p>
                    <p className="mt-2 text-safe-wrap text-base text-black/75">
                      {usersError.errorCode ?? "-"}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </section>
    </div>
  );
}
