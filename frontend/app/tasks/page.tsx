export default function TasksPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-950">Tasks</h1>
        <p className="mt-2 text-slate-600">这里用于实现学习任务的新增、查看、状态更新和删除。</p>
      </div>
      <div className="rounded-md border border-slate-200 bg-white p-5">
        <p className="text-sm text-slate-600">
          下一阶段会接入 `/api/tasks`，完成表单、列表、状态筛选和异常提示。
        </p>
      </div>
    </section>
  );
}

