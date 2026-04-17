"use client";

import { useState } from "react";
import { DemoSelector } from "./components/demo-selector";
import type { DemoPanel } from "./demo-types";
import { MilvusDebugPanel } from "./panels/milvus-debug-panel";
import { MysqlConnectionPanel } from "./panels/mysql-connection-panel";
import { UserTablePanel } from "./panels/user-table-panel";

export function DemoClient() {
  const [panel, setPanel] = useState<DemoPanel>("mysql-connection");

  return (
    <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
      <aside className="space-y-4">
        <DemoSelector panel={panel} onChange={setPanel} />

        <section className="rounded-[24px] border border-black/8 bg-[var(--surface)] p-5 text-sm leading-7 text-black/65 sm:rounded-[28px] sm:p-6">
          <p className="font-medium text-black/55">Current panel</p>
          <p className="mt-3">
            {panel === "mysql-connection"
              ? "检查后端是否能成功连接 `person-site` 数据库。"
              : panel === "user-table"
                ? "通过后端读写 `user` 测试表，验证最小可用数据流。"
                : "通过后端调试接口验证 Milvus 的连接、collection 初始化、增删改查和向量搜索。"}
          </p>
        </section>
      </aside>

      <section className="rounded-[28px] border border-black/8 bg-white/82 p-5 sm:rounded-[32px] sm:p-6">
        {panel === "mysql-connection" ? <MysqlConnectionPanel /> : null}
        {panel === "user-table" ? <UserTablePanel /> : null}
        {panel === "milvus-debug" ? <MilvusDebugPanel /> : null}
      </section>
    </div>
  );
}
