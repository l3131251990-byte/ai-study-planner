export default function PromptsPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-950">Prompts</h1>
        <p className="mt-2 text-slate-600">这里用于记录 Prompt、AI 返回内容和关联文件。</p>
      </div>
      <div className="rounded-md border border-slate-200 bg-white p-5">
        <p className="text-sm text-slate-600">
          下一阶段会接入 `/api/prompts`，支持新增 Prompt 日志和列表展示。
        </p>
      </div>
    </section>
  );
}

