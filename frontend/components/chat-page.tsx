"use client";

import { useState, useTransition } from "react";
import { SiteShell } from "@/components/site-shell";
import { useLanguage } from "@/components/language-provider";
import { chatPrompts, getLocalizedText } from "@/lib/site-content";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_PATH ?? "/api/v1";

export function ChatPage() {
  const { locale } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        locale === "zh"
          ? "你好，我是这个网站里代表你的 AI 分身。你可以问我你的经历、项目、风格和合作方式。"
          : "Hi, I am the AI persona behind this site. Ask me about your background, projects, style, or how you collaborate.",
    },
  ]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function sendMessage(message: string) {
    setError(null);
    setMessages((current) => [...current, { role: "user", content: message }]);

    try {
      const response = await fetch(`${API_BASE}/public/chat`, {
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
    <SiteShell
      kicker={{ zh: "AI 分身问答", en: "AI persona chat" }}
      title={{ zh: "让访客通过对话理解你。", en: "Let visitors understand you through conversation." }}
      description={{
        zh: "这个页面已经准备好承接 `POST /api/v1/public/chat`。真实服务接入后，前端将把问题、语言和会话上下文发到 NestJS API，再由 RAG 工作流生成回答。",
        en: "This page is ready to call `POST /api/v1/public/chat`. Once the real service is connected, the frontend will send the message, locale, and session context to the NestJS API and let the RAG workflow respond.",
      }}
    >
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="space-y-4">
          <div className="rounded-[28px] border border-black/8 bg-white/78 p-6">
            <p className="display-font text-2xl">
              {locale === "zh" ? "推荐提问" : "Suggested prompts"}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {chatPrompts.map((prompt) => (
                <button
                  key={prompt.id}
                  type="button"
                  onClick={() => setInput(getLocalizedText(prompt.message, locale))}
                  className="rounded-full border border-black/10 px-4 py-2 text-left text-sm hover:bg-black/5"
                >
                  {getLocalizedText(prompt.label, locale)}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-black/8 bg-[var(--surface)] p-6 text-sm leading-7 text-black/65">
            <p className="font-medium text-black/55">
              {locale === "zh" ? "当前接口约定" : "Current API contract"}
            </p>
            <p className="mt-2">POST {API_BASE}/public/chat</p>
            <p className="mt-3">
              {locale === "zh"
                ? "请求体建议包含 `message`、`locale`、`sessionId`，响应返回 `answer`、`sessionId` 和调试信息。"
                : "The request should include `message`, `locale`, and `sessionId`, and the response should return `answer`, `sessionId`, and debug metadata."}
            </p>
          </div>
        </aside>

        <section className="rounded-[32px] border border-black/8 bg-white/82 p-6">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`rounded-[24px] px-5 py-4 leading-7 ${
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

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              rows={4}
              placeholder={
                locale === "zh"
                  ? "比如：你最想让别人先理解你哪一部分？"
                  : "For example: what do you want people to understand about you first?"
              }
              className="w-full rounded-[24px] border border-black/10 bg-[var(--surface)] px-5 py-4 outline-none transition focus:border-[var(--accent)]"
            />
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-black/50">
                {error ?? (locale === "zh" ? "接入后端后可切换为真实检索回答。" : "Wire the backend to switch this to real retrieval-based answers.")}
              </p>
              <button
                type="submit"
                disabled={isPending}
                className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
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
    </SiteShell>
  );
}
