"use client";

import { useEffect, useState } from "react";
import { getApiUrl } from "@/lib/api";
import { ErrorCard } from "../components/error-card";
import { InputField } from "../components/input-field";
import { MetricCard } from "../components/metric-card";
import {
  DEFAULT_MILVUS_EDITOR,
  type ApiErrorState,
  type MilvusBootstrapSuccess,
  type MilvusConnectionSuccess,
  type MilvusDebugItem,
  type MilvusDeleteSuccess,
  type MilvusFailure,
  type MilvusItemsSuccess,
  type MilvusMutationSuccess,
  type MilvusSearchResult,
  type MilvusSearchSuccess,
} from "../demo-types";
import { parseEmbeddingInput, toApiError, toThrownApiError } from "../demo-utils";

export function MilvusDebugPanel() {
  const [milvusConnectionStatus, setMilvusConnectionStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [milvusConnectionData, setMilvusConnectionData] =
    useState<MilvusConnectionSuccess | null>(null);
  const [milvusConnectionError, setMilvusConnectionError] = useState<ApiErrorState | null>(null);
  const [milvusItemsStatus, setMilvusItemsStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [milvusItems, setMilvusItems] = useState<MilvusDebugItem[]>([]);
  const [milvusItemsError, setMilvusItemsError] = useState<ApiErrorState | null>(null);
  const [milvusActionStatus, setMilvusActionStatus] = useState<
    "idle" | "bootstrapping" | "saving" | "deleting" | "searching"
  >("idle");
  const [milvusActionMessage, setMilvusActionMessage] = useState<string | null>(null);
  const [milvusActionError, setMilvusActionError] = useState<ApiErrorState | null>(null);
  const [editorMode, setEditorMode] = useState<"create" | "update">("create");
  const [editorValues, setEditorValues] = useState(DEFAULT_MILVUS_EDITOR);
  const [searchVector, setSearchVector] = useState("0.3, 0.8, 0.2, 0.6");
  const [searchLimit, setSearchLimit] = useState("3");
  const [searchResults, setSearchResults] = useState<MilvusSearchResult[]>([]);
  const [searchResultVector, setSearchResultVector] = useState<number[] | null>(null);

  async function runMilvusConnectionCheck({ resetStatus }: { resetStatus: boolean }) {
    if (resetStatus) {
      setMilvusConnectionStatus("loading");
      setMilvusConnectionError(null);
      setMilvusActionMessage(null);
    }

    try {
      const response = await fetch(getApiUrl("/debug/milvus/connection"), {
        method: "GET",
        cache: "no-store",
      });

      const payload = (await response.json()) as MilvusConnectionSuccess | MilvusFailure;

      if (!response.ok || !payload.ok) {
        setMilvusConnectionData(null);
        setMilvusConnectionStatus("error");
        setMilvusConnectionError(toApiError(response.status, payload));
        return;
      }

      setMilvusConnectionData(payload);
      setMilvusConnectionStatus("success");
    } catch (caughtError) {
      setMilvusConnectionData(null);
      setMilvusConnectionStatus("error");
      setMilvusConnectionError(toThrownApiError(caughtError));
    }
  }

  async function loadMilvusItems({ resetStatus }: { resetStatus: boolean }) {
    if (resetStatus) {
      setMilvusItemsStatus("loading");
      setMilvusItemsError(null);
      setMilvusActionMessage(null);
    }

    try {
      const response = await fetch(getApiUrl("/debug/milvus/items"), {
        method: "GET",
        cache: "no-store",
      });

      const payload = (await response.json()) as MilvusItemsSuccess | MilvusFailure;

      if (!response.ok || !payload.ok) {
        setMilvusItems([]);
        setMilvusItemsStatus("error");
        setMilvusItemsError(toApiError(response.status, payload));
        return;
      }

      setMilvusItems(payload.items);
      setMilvusItemsStatus("success");
    } catch (caughtError) {
      setMilvusItems([]);
      setMilvusItemsStatus("error");
      setMilvusItemsError(toThrownApiError(caughtError));
    }
  }

  async function handleBootstrapMilvus() {
    setMilvusActionStatus("bootstrapping");
    setMilvusActionError(null);
    setMilvusActionMessage(null);

    try {
      const response = await fetch(getApiUrl("/debug/milvus/bootstrap"), {
        method: "POST",
      });
      const payload = (await response.json()) as MilvusBootstrapSuccess | MilvusFailure;

      if (!response.ok || !payload.ok) {
        setMilvusActionError(toApiError(response.status, payload));
        return;
      }

      setMilvusActionMessage(
        `已初始化 ${payload.collectionName}，写入 ${payload.count} 条 mock 数据。`,
      );
      setMilvusItems(payload.items);
      setMilvusItemsStatus("success");
      await runMilvusConnectionCheck({ resetStatus: false });
    } catch (caughtError) {
      setMilvusActionError(toThrownApiError(caughtError));
    } finally {
      setMilvusActionStatus("idle");
    }
  }

  async function handleSubmitMilvusItem(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMilvusActionStatus("saving");
    setMilvusActionError(null);
    setMilvusActionMessage(null);

    try {
      const payload = {
        id: editorValues.id.trim(),
        title: editorValues.title.trim(),
        category: editorValues.category.trim(),
        summary: editorValues.summary.trim(),
        embedding: parseEmbeddingInput(editorValues.embedding),
      };

      const path =
        editorMode === "create"
          ? "/debug/milvus/items"
          : `/debug/milvus/items/${encodeURIComponent(payload.id)}`;
      const method = editorMode === "create" ? "POST" : "PATCH";

      const response = await fetch(getApiUrl(path), {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as MilvusMutationSuccess | MilvusFailure;
      if (!response.ok || !data.ok) {
        setMilvusActionError(toApiError(response.status, data));
        return;
      }

      setMilvusActionMessage(
        editorMode === "create" ? `已新增 ${data.item.id}。` : `已更新 ${data.item.id}。`,
      );
      setEditorValues(DEFAULT_MILVUS_EDITOR);
      setEditorMode("create");
      await loadMilvusItems({ resetStatus: false });
    } catch (caughtError) {
      setMilvusActionError(toThrownApiError(caughtError));
    } finally {
      setMilvusActionStatus("idle");
    }
  }

  async function handleDeleteMilvusItem(id: string) {
    setMilvusActionStatus("deleting");
    setMilvusActionError(null);
    setMilvusActionMessage(null);

    try {
      const response = await fetch(getApiUrl(`/debug/milvus/items/${encodeURIComponent(id)}`), {
        method: "DELETE",
      });
      const payload = (await response.json()) as MilvusDeleteSuccess | MilvusFailure;

      if (!response.ok || !payload.ok) {
        setMilvusActionError(toApiError(response.status, payload));
        return;
      }

      setMilvusActionMessage(`已删除 ${payload.id}。`);
      await loadMilvusItems({ resetStatus: false });
    } catch (caughtError) {
      setMilvusActionError(toThrownApiError(caughtError));
    } finally {
      setMilvusActionStatus("idle");
    }
  }

  async function handleMilvusSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMilvusActionStatus("searching");
    setMilvusActionError(null);
    setMilvusActionMessage(null);

    try {
      const response = await fetch(getApiUrl("/debug/milvus/search"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vector: parseEmbeddingInput(searchVector),
          limit: Number(searchLimit),
        }),
      });
      const payload = (await response.json()) as MilvusSearchSuccess | MilvusFailure;

      if (!response.ok || !payload.ok) {
        setSearchResults([]);
        setSearchResultVector(null);
        setMilvusActionError(toApiError(response.status, payload));
        return;
      }

      setSearchResults(payload.results);
      setSearchResultVector(payload.vector);
      setMilvusActionMessage(`已返回 ${payload.count} 条搜索结果。`);
    } catch (caughtError) {
      setSearchResults([]);
      setSearchResultVector(null);
      setMilvusActionError(toThrownApiError(caughtError));
    } finally {
      setMilvusActionStatus("idle");
    }
  }

  useEffect(() => {
    if (milvusConnectionStatus === "idle") {
      const frameId = window.requestAnimationFrame(() => {
        void runMilvusConnectionCheck({ resetStatus: true });
      });

      return () => {
        window.cancelAnimationFrame(frameId);
      };
    }

    return;
  }, [milvusConnectionStatus]);

  useEffect(() => {
    if (milvusItemsStatus !== "idle") {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      void loadMilvusItems({ resetStatus: true });
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [milvusItemsStatus]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-black/45">Milvus debug</p>
          <h2 className="display-font mt-2 text-2xl sm:text-3xl">Debug `debug_person_site_demo`</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              void runMilvusConnectionCheck({ resetStatus: true });
            }}
            className="inline-flex items-center justify-center rounded-full border border-black/10 px-5 py-3 text-sm font-medium text-black/75 transition hover:bg-black/5"
          >
            连接检测
          </button>
          <button
            type="button"
            onClick={() => {
              void loadMilvusItems({ resetStatus: true });
            }}
            className="inline-flex items-center justify-center rounded-full border border-black/10 px-5 py-3 text-sm font-medium text-black/75 transition hover:bg-black/5"
          >
            刷新列表
          </button>
          <button
            type="button"
            onClick={() => {
              void handleBootstrapMilvus();
            }}
            disabled={milvusActionStatus === "bootstrapping"}
            className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
          >
            {milvusActionStatus === "bootstrapping" ? "初始化中..." : "初始化 mock 数据"}
          </button>
        </div>
      </div>

      <div className="rounded-[24px] border border-black/8 bg-[var(--surface)] p-5 text-sm leading-7 text-black/65">
        <p className="font-medium text-black/55">API surface</p>
        <div className="mt-3 space-y-2">
          <p className="text-safe-wrap">GET {getApiUrl("/debug/milvus/connection")}</p>
          <p className="text-safe-wrap">POST {getApiUrl("/debug/milvus/bootstrap")}</p>
          <p className="text-safe-wrap">GET {getApiUrl("/debug/milvus/items")}</p>
          <p className="text-safe-wrap">POST {getApiUrl("/debug/milvus/items")}</p>
          <p className="text-safe-wrap">PATCH {getApiUrl("/debug/milvus/items/:id")}</p>
          <p className="text-safe-wrap">DELETE {getApiUrl("/debug/milvus/items/:id")}</p>
          <p className="text-safe-wrap">POST {getApiUrl("/debug/milvus/search")}</p>
        </div>
      </div>

      {milvusConnectionStatus === "loading" ? (
        <div className="rounded-[24px] border border-dashed border-black/12 bg-[var(--surface)] p-5 text-sm leading-7 text-black/60">
          正在检测 Milvus 连接。
        </div>
      ) : null}

      {milvusConnectionStatus === "success" && milvusConnectionData ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Address" value={milvusConnectionData.address} />
          <MetricCard label="User" value={milvusConnectionData.username} />
          <MetricCard label="Version" value={milvusConnectionData.version} />
          <MetricCard
            label="Health"
            value={milvusConnectionData.healthy ? "healthy" : "unhealthy"}
          />
        </div>
      ) : null}

      {milvusConnectionError ? <ErrorCard error={milvusConnectionError} /> : null}

      {milvusActionMessage ? (
        <div className="rounded-[24px] border border-[rgba(35,118,79,0.18)] bg-[rgba(35,118,79,0.08)] p-5 text-sm leading-7 text-[rgba(35,86,62,0.95)]">
          {milvusActionMessage}
        </div>
      ) : null}

      {milvusActionError ? <ErrorCard error={milvusActionError} /> : null}

      <div className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
        <section className="rounded-[24px] border border-black/8 bg-[var(--surface)] p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm uppercase tracking-[0.16em] text-black/45">Item editor</p>
            <div className="flex rounded-full border border-black/10 p-1 text-sm">
              <button
                type="button"
                onClick={() => setEditorMode("create")}
                className={`rounded-full px-4 py-2 transition ${
                  editorMode === "create" ? "bg-[var(--accent)] text-white" : "text-black/60"
                }`}
              >
                新增
              </button>
              <button
                type="button"
                onClick={() => setEditorMode("update")}
                className={`rounded-full px-4 py-2 transition ${
                  editorMode === "update" ? "bg-[var(--accent)] text-white" : "text-black/60"
                }`}
              >
                更新
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmitMilvusItem} className="mt-4 grid gap-4">
            <InputField
              label="ID"
              value={editorValues.id}
              onChange={(value) => setEditorValues((prev) => ({ ...prev, id: value }))}
              placeholder="mock-item-delta"
            />
            <InputField
              label="Title"
              value={editorValues.title}
              onChange={(value) => setEditorValues((prev) => ({ ...prev, title: value }))}
              placeholder="Demo item title"
            />
            <InputField
              label="Category"
              value={editorValues.category}
              onChange={(value) => setEditorValues((prev) => ({ ...prev, category: value }))}
              placeholder="project / note / profile"
            />
            <label className="block space-y-2">
              <span className="text-sm text-black/55">Summary</span>
              <textarea
                value={editorValues.summary}
                onChange={(event) =>
                  setEditorValues((prev) => ({ ...prev, summary: event.target.value }))
                }
                rows={4}
                placeholder="Describe this mock Milvus record."
                className="w-full rounded-[18px] border border-black/10 bg-white/80 px-4 py-3 outline-none transition focus:border-[var(--accent)]"
              />
            </label>
            <InputField
              label="Embedding"
              value={editorValues.embedding}
              onChange={(value) => setEditorValues((prev) => ({ ...prev, embedding: value }))}
              placeholder="0.1, 0.2, 0.3, 0.4"
            />
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={milvusActionStatus === "saving"}
                className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
              >
                {milvusActionStatus === "saving"
                  ? "提交中..."
                  : editorMode === "create"
                    ? "新增记录"
                    : "更新记录"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditorValues(DEFAULT_MILVUS_EDITOR);
                  setEditorMode("create");
                }}
                className="inline-flex items-center justify-center rounded-full border border-black/10 px-5 py-3 text-sm font-medium text-black/75 transition hover:bg-black/5"
              >
                重置表单
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-[24px] border border-black/8 bg-white/82 p-5">
          <p className="text-sm uppercase tracking-[0.16em] text-black/45">Vector search</p>
          <form onSubmit={handleMilvusSearch} className="mt-4 space-y-4">
            <InputField
              label="Query vector"
              value={searchVector}
              onChange={setSearchVector}
              placeholder="0.3, 0.8, 0.2, 0.6"
            />
            <InputField
              label="Limit"
              value={searchLimit}
              onChange={setSearchLimit}
              placeholder="3"
            />
            <button
              type="submit"
              disabled={milvusActionStatus === "searching"}
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
            >
              {milvusActionStatus === "searching" ? "搜索中..." : "执行搜索"}
            </button>
          </form>

          {searchResultVector ? (
            <div className="mt-6 space-y-4">
              <div className="rounded-[18px] border border-black/8 bg-[var(--surface)] p-4 text-sm leading-7 text-black/65">
                <p className="font-medium text-black/55">Query vector</p>
                <p className="mt-2 text-safe-wrap">{searchResultVector.join(", ")}</p>
              </div>

              {searchResults.length === 0 ? (
                <p className="text-sm leading-7 text-black/60">当前没有命中结果。</p>
              ) : (
                <div className="space-y-3">
                  {searchResults.map((result) => (
                    <article
                      key={`${result.id}-${result.score}`}
                      className="rounded-[18px] border border-black/8 bg-[var(--surface)] p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-base text-black/80">{result.title ?? result.id}</p>
                        <span className="text-sm text-black/45">
                          score {result.score.toFixed(4)}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-black/55">
                        {result.category ?? "-"} · {result.id}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-black/65">
                        {result.summary ?? "No summary returned."}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </section>
      </div>

      {milvusItemsStatus === "loading" ? (
        <div className="rounded-[24px] border border-dashed border-black/12 bg-[var(--surface)] p-5 text-sm leading-7 text-black/60">
          正在读取 Milvus 调试 collection 的数据。
        </div>
      ) : null}

      {milvusItemsStatus === "success" ? (
        <section className="rounded-[24px] border border-black/8 bg-white/82 p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm uppercase tracking-[0.16em] text-black/45">Current rows</p>
            <p className="text-sm text-black/50">{milvusItems.length} rows</p>
          </div>

          {milvusItems.length === 0 ? (
            <p className="mt-4 text-sm leading-7 text-black/60">
              当前还没有调试数据。可以先点击“初始化 mock 数据”。
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {milvusItems.map((item) => (
                <article
                  key={item.id}
                  className="rounded-[20px] border border-black/8 bg-[var(--surface)] p-4"
                >
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-2">
                      <p className="text-lg text-black/80">{item.title}</p>
                      <p className="text-sm text-black/50">
                        {item.category} · {item.id}
                      </p>
                      <p className="text-sm leading-7 text-black/65">{item.summary}</p>
                      <p className="text-xs text-black/45">
                        embedding: {item.embedding.join(", ")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditorMode("update");
                          setEditorValues({
                            id: item.id,
                            title: item.title,
                            category: item.category,
                            summary: item.summary,
                            embedding: item.embedding.join(", "),
                          });
                        }}
                        className="inline-flex items-center justify-center rounded-full border border-black/10 px-4 py-2 text-sm text-black/70 transition hover:bg-black/5"
                      >
                        填入更新表单
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          void handleDeleteMilvusItem(item.id);
                        }}
                        disabled={milvusActionStatus === "deleting"}
                        className="inline-flex items-center justify-center rounded-full border border-[rgba(180,92,61,0.18)] px-4 py-2 text-sm text-[var(--secondary)] transition hover:bg-[rgba(180,92,61,0.08)] disabled:opacity-60"
                      >
                        删除
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      ) : null}

      {milvusItemsError ? <ErrorCard error={milvusItemsError} /> : null}
    </div>
  );
}
