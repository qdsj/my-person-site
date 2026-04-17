import type { DemoPanel } from "../demo-types";

export function DemoSelector({
  panel,
  onChange,
}: {
  panel: DemoPanel;
  onChange: (panel: DemoPanel) => void;
}) {
  return (
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
          onChange={(event) => onChange(event.target.value as DemoPanel)}
          className="w-full rounded-[18px] border border-black/10 bg-[var(--surface)] px-4 py-3 outline-none transition focus:border-[var(--accent)]"
        >
          <option value="mysql-connection">MySQL 连接测试</option>
          <option value="user-table">User 表测试</option>
          <option value="milvus-debug">Milvus 调试</option>
        </select>
      </label>
    </section>
  );
}
