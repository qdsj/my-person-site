import { SiteShell } from "@/components/shared/site-shell";
import { AdminLoginForm } from "@/components/page/admin-login/login-form";
import type { Locale } from "@/lib/site-content";

export function AdminLoginPage({ locale }: { locale: Locale }) {
  return (
    <SiteShell
      locale={locale}
      currentPath="/admin/login"
      activeNav="/admin"
      kicker={{ zh: "管理员登录", en: "Admin login" }}
      title={{
        zh: "单管理员登录流程占位。",
        en: "Placeholder for the single-admin login flow.",
      }}
      description={{
        zh: "当前页先搭好交互形态，后续接入 HttpOnly Cookie 或会话后即可成为真实登录页。",
        en: "This page sets up the interaction model so it can become a real login screen once HttpOnly cookies or session handling are added.",
      }}
    >
      <AdminLoginForm locale={locale} />
    </SiteShell>
  );
}
