import { SiteShell } from "@/components/shared/site-shell";
import { ChatClient } from "@/components/page/chat/chat-client";
import { getApiUrl } from "@/lib/api";
import type { Locale } from "@/lib/site-content";

export function ChatPage({ locale }: { locale: Locale }) {
  return (
    <SiteShell
      locale={locale}
      currentPath="/chat"
      activeNav="/chat"
      kicker={{ zh: "AI 分身问答", en: "AI persona chat" }}
      title={{
        zh: "让访客通过对话快速理解你的能力边界。",
        en: "Let visitors understand your capabilities through conversation.",
      }}
      description={{
        zh: `页面已经准备好承接 \`POST ${getApiUrl("/public/chat")}\`。真实服务接入后，这里会基于已上传资料、项目信息和个人知识库进行检索增强问答，并进一步支持语音交互与流式组件输出。`,
        en: `This page is ready to call \`POST ${getApiUrl("/public/chat")}\`. Once the real service is connected, it will answer from uploaded materials, project data, and a personal knowledge base, with room for voice interaction and streaming UI components.`,
      }}
    >
      <ChatClient locale={locale} />
    </SiteShell>
  );
}
