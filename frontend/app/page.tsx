import { CheckCircle2, Clock3, ListTodo } from "lucide-react";
import { getPrompts, getTasks } from "@/lib/api";

export default async function DashboardPage() {
  let taskCount = 0;
  let doneCount = 0;
  let promptCount = 0;
  let apiError = "";

  try {
    const [tasks, prompts] = await Promise.all([getTasks(), getPrompts()]);
    taskCount = tasks.length;
    doneCount = tasks.filter((task) => task.status === "done").length;
    promptCount = prompts.length;
  } catch {
    apiError = "后端 API 暂未连接，完成部署或本地启动后会显示真实数据。";
  }

  const cards = [
    { label: "Total Tasks", value: taskCount, icon: ListTodo },
    { label: "Completed", value: doneCount, icon: CheckCircle2 },
    { label: "Prompt Logs", value: promptCount, icon: Clock3 },
  ];

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-950">Dashboard</h1>
        <p className="mt-2 text-slate-600">跟踪学习任务、AI Prompt 留痕和项目复盘进度。</p>
      </div>
      {apiError ? (
        <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {apiError}
        </div>
      ) : null}
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article className="rounded-md border border-slate-200 bg-white p-5" key={card.label}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">{card.label}</span>
                <Icon className="h-5 w-5 text-slate-500" />
              </div>
              <p className="mt-4 text-3xl font-semibold text-slate-950">{card.value}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

