"use client";

import { useState, useTransition } from "react";
import { getApiUrl } from "@/lib/api";
import type { Locale } from "@/lib/site-content";

export function AdminLoginForm({ locale }: { locale: Locale }) {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(() => {
      setFeedback(
        locale === "zh"
          ? `登录表单已就位，接下来把它接到 POST ${getApiUrl("/auth/login")} 即可。`
          : `The form is ready. The next step is wiring it to POST ${getApiUrl("/auth/login")}.`,
      );
    });
  }

  return (
    <div className="mx-auto max-w-xl rounded-[28px] border border-black/8 bg-white/82 p-6 sm:rounded-[32px] sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block space-y-2">
          <span className="text-sm text-black/55">
            {locale === "zh" ? "账号" : "Username"}
          </span>
          <input
            type="text"
            placeholder="admin@example.com"
            className="w-full rounded-2xl border border-black/10 bg-[var(--surface)] px-4 py-3 outline-none focus:border-[var(--accent)]"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm text-black/55">
            {locale === "zh" ? "密码" : "Password"}
          </span>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full rounded-2xl border border-black/10 bg-[var(--surface)] px-4 py-3 outline-none focus:border-[var(--accent)]"
          />
        </label>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex w-full items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
        >
          {isPending
            ? locale === "zh"
              ? "处理中..."
              : "Submitting..."
            : locale === "zh"
              ? "登录后台"
              : "Sign in"}
        </button>
      </form>

      <p className="text-safe-wrap mt-5 text-sm leading-7 text-black/55">
        {feedback ??
          (locale === "zh"
            ? `预期后端入口：${getApiUrl("/auth/login")}`
            : `Expected backend endpoint: ${getApiUrl("/auth/login")}`)}
      </p>
    </div>
  );
}
