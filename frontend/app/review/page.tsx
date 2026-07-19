export default function ReviewPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-950">Review</h1>
        <p className="mt-2 text-slate-600">整理 AI Code Review、开发阶段和个人复盘材料。</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-md border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-950">Code Review</h2>
          <p className="mt-2 text-sm text-slate-600">核心功能完成后，把 AI 审查建议整理到 `code_review.md`。</p>
        </article>
        <article className="rounded-md border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-950">Summary</h2>
          <p className="mt-2 text-sm text-slate-600">最终提交前补全不少于 500 字的个人总结。</p>
        </article>
      </div>
    </section>
  );
}

