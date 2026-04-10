import { DemoClient } from "@/components/page/demo/demo-client";
import { SiteShell } from "@/components/shared/site-shell";
import { defaultLocale } from "@/lib/i18n";

export function DemoPage() {
  return (
    <SiteShell
      locale={defaultLocale}
      currentPath="/demo"
      showLocaleSwitcher={false}
      kicker={{ zh: "隐藏联调页", en: "Hidden debug page" }}
      title={{ zh: "统一 Demo 联调页", en: "Unified integration demo" }}
      description={{
        zh: "这个页面不对外展示，只通过 URL 直接访问。所有测试 API 都集中在这里，通过选择器切换不同联调功能。",
        en: "This page is hidden from navigation and only meant for direct URL access. All debug APIs are grouped here and switched through a selector.",
      }}
    >
      <DemoClient />
    </SiteShell>
  );
}
