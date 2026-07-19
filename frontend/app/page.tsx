"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Clock3, ListTodo, Server } from "lucide-react";
import { getPrompts, getTasks, PromptLog, Task } from "@/lib/api";
import { useLanguage } from "@/lib/i18n";

export default function DashboardPage() {
  const { t } = useLanguage();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [prompts, setPrompts] = useState<PromptLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setApiError("");
        setLoading(true);
        const [taskData, promptData] = await Promise.all([getTasks(), getPrompts()]);
        setTasks(taskData);
        setPrompts(promptData);
      } catch {
        setApiError(t.common.apiError);
      } finally {
        setLoading(false);
      }
    }

    void loadDashboard();
  }, [t.common.apiError]);

  const doneCount = useMemo(
    () => tasks.filter((task) => task.status === "done").length,
    [tasks],
  );

  const cards = [
    { label: t.dashboard.totalTasks, value: tasks.length, icon: ListTodo },
    { label: t.dashboard.completed, value: doneCount, icon: CheckCircle2 },
    { label: t.dashboard.promptLogs, value: prompts.length, icon: Clock3 },
    {
      label: t.dashboard.apiStatus,
      value: apiError ? t.dashboard.offline : loading ? t.dashboard.checking : t.dashboard.online,
      icon: Server,
    },
  ];

  return (
    <section className="space-y-7">
      <div className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-950">{t.dashboard.title}</h1>
        <p className="mt-2 text-slate-600">
          {t.dashboard.subtitle}
        </p>
      </div>

      {apiError ? (
        <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {apiError}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm" key={card.label}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">{card.label}</span>
                <span className="grid h-9 w-9 place-items-center rounded-md bg-teal-50">
                  <Icon className="h-5 w-5 text-teal-700" />
                </span>
              </div>
              <p className="mt-4 text-2xl font-semibold text-slate-950">{card.value}</p>
            </article>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">{t.dashboard.recentTasks}</h2>
          <div className="mt-4 space-y-3">
            {tasks.slice(0, 3).map((task) => (
              <div className="border-b border-slate-100 pb-3 last:border-0 last:pb-0" key={task.id}>
                <div className="font-medium text-slate-900">{task.title}</div>
                <div className="mt-1 text-sm text-slate-500">{task.status}</div>
              </div>
            ))}
            {!tasks.length ? <p className="text-sm text-slate-500">{t.dashboard.noTasks}</p> : null}
          </div>
        </article>

        <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">{t.dashboard.recentPrompts}</h2>
          <div className="mt-4 space-y-3">
            {prompts.slice(0, 3).map((item) => (
              <div className="border-b border-slate-100 pb-3 last:border-0 last:pb-0" key={item.id}>
                <div className="line-clamp-2 text-sm text-slate-700">{item.prompt}</div>
                <div className="mt-1 text-xs text-slate-500">{item.related_file || t.common.emptyFile}</div>
              </div>
            ))}
            {!prompts.length ? <p className="text-sm text-slate-500">{t.dashboard.noPrompts}</p> : null}
          </div>
        </article>
      </div>
    </section>
  );
}
