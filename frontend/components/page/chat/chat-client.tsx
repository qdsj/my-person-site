"use client";

import { useState, useTransition } from "react";
import { apiBasePath, getApiUrl } from "@/lib/api";
import { chatPrompts, getLocalizedText, type Locale } from "@/lib/site-content";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function ChatClient({ locale }: { locale: Locale }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        locale === "zh"
          ? "你好，我会基于你的简历、项目资料、技术分享和摄影方向来回答问题，也可以重点介绍 AI Agent 的能力设计。"
          : "Hi, I can answer from your resume, project notes, technical writing, and photography direction, with extra depth on the AI agent capability stack.",
    },
  ]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function sendMessage(message: string) {
    setError(null);
    setMessages((current) => [...current, { role: "user", content: message }]);

    try {
      const response = await fetch(getApiUrl("/public/chat"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locale,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Chat endpoint is not available yet.");
      }

      const data = (await response.json()) as { answer?: string };
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            data.answer ??
            (locale === "zh"
              ? "后端已连接，但暂未返回回答。"
              : "The backend responded, but did not include an answer yet."),
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            locale === "zh"
              ? "当前还没有连接真实 AI 服务，所以我先用占位回答：我会基于已发布的个人资料、项目和 FAQ 来回答，并在语料不足时明确说明。"
              : "The real AI service is not wired yet, so here is the placeholder reply: I will answer from published profile, project, and FAQ content, and I will be explicit when the knowledge base is missing context.",
        },
      ]);
      setError(
        locale === "zh"
          ? "后端 chat 接口尚未启动，页面已展示前端兜底文案。"
          : "The backend chat endpoint is not running yet, so the page is showing the frontend fallback.",
      );
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput("");
    startTransition(() => {
      void sendMessage(trimmed);
    });
  }

  return (
    <div className="grid gap-6 sm:gap-8 lg:grid-cols-[0.85fr_1.15fr]">
      <aside className="space-y-4">
        <div className="rounded-[24px] border border-black/8 bg-white/78 p-5 sm:rounded-[28px] sm:p-6">
          <p className="display-font text-xl sm:text-2xl">
            {locale === "zh" ? "推荐提问" : "Suggested prompts"}
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {chatPrompts.map((prompt) => (
              <button
                key={prompt.id}
                type="button"
                onClick={() => setInput(getLocalizedText(prompt.message, locale))}
                className="min-h-11 w-full rounded-full border border-black/10 px-4 py-2 text-left text-sm leading-5 hover:bg-black/5 sm:w-auto"
              >
                {getLocalizedText(prompt.label, locale)}
              </button>
            ))}
          </div>
        </div>

        <div className="text-safe-wrap rounded-[24px] border border-black/8 bg-[var(--surface)] p-5 text-sm leading-7 text-black/65 sm:rounded-[28px] sm:p-6">
          <p className="font-medium text-black/55">
            {locale === "zh" ? "当前接口约定" : "Current API contract"}
          </p>
          <p className="mt-2">POST {getApiUrl("/public/chat")}</p>
          <p className="mt-3">
            {locale === "zh"
              ? "请求体建议包含 `message`、`locale`、`sessionId`，并允许附带语音、多模态文件或会话上下文；响应返回 `answer`、`sessionId`、引用来源和流式状态。"
              : "The request should include `message`, `locale`, and `sessionId`, and can later carry voice, multimodal files, or conversation context; the response should return `answer`, `sessionId`, source metadata, and streaming state."}
          </p>
        </div>
      </aside>

      <section className="rounded-[28px] border border-black/8 bg-white/82 p-5 sm:rounded-[32px] sm:p-6">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`text-safe-wrap rounded-[20px] px-4 py-3 leading-7 sm:rounded-[24px] sm:px-5 sm:py-4 ${
                message.role === "assistant"
                  ? "bg-[var(--accent-soft)] text-[var(--accent-strong)]"
                  : "bg-black/4 text-black/75"
              }`}
            >
              <p className="mb-2 text-xs uppercase tracking-[0.18em] opacity-70">
                {message.role === "assistant"
                  ? locale === "zh"
                    ? "AI"
                    : "AI"
                  : locale === "zh"
                    ? "访客"
                    : "Visitor"}
              </p>
              <p>{message.content}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 sm:mt-6">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={4}
            placeholder={
              locale === "zh"
                ? "比如：你做过的 AI Agent 能支持哪些能力？"
                : "For example: what capabilities do your AI agents support?"
            }
            className="min-h-32 w-full rounded-[20px] border border-black/10 bg-[var(--surface)] px-4 py-4 outline-none transition focus:border-[var(--accent)] sm:rounded-[24px] sm:px-5"
          />
          <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-safe-wrap text-sm leading-6 text-black/50">
              {error ??
                (locale === "zh"
                  ? "接入后端后可切换为基于简历、项目资料和知识库的真实检索回答。"
                  : "Wire the backend to switch this to retrieval-backed answers grounded in the resume, projects, and knowledge base.")}
            </p>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex w-full items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white disabled:opacity-60 sm:w-auto"
            >
              {isPending
                ? locale === "zh"
                  ? "发送中..."
                  : "Sending..."
                : locale === "zh"
                  ? "发送问题"
                  : "Send message"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
