"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Clock3, ListTodo, Server } from "lucide-react";
import { getPrompts, getTasks, PromptLog, Task } from "@/lib/api";

export default function DashboardPage() {
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
        setApiError("Backend API is not connected. Start Flask or configure the deployed API URL.");
      } finally {
        setLoading(false);
      }
    }

    void loadDashboard();
  }, []);

  const doneCount = useMemo(
    () => tasks.filter((task) => task.status === "done").length,
    [tasks],
  );

  const cards = [
    { label: "Total Tasks", value: tasks.length, icon: ListTodo },
    { label: "Completed", value: doneCount, icon: CheckCircle2 },
    { label: "Prompt Logs", value: prompts.length, icon: Clock3 },
    { label: "API Status", value: apiError ? "Offline" : loading ? "Checking" : "Online", icon: Server },
  ];

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-950">Dashboard</h1>
        <p className="mt-2 text-slate-600">
          Track study tasks, AI prompt evidence, and full-stack project progress.
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
            <article className="rounded-md border border-slate-200 bg-white p-5" key={card.label}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">{card.label}</span>
                <Icon className="h-5 w-5 text-slate-500" />
              </div>
              <p className="mt-4 text-2xl font-semibold text-slate-950">{card.value}</p>
            </article>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-md border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-950">Recent Tasks</h2>
          <div className="mt-4 space-y-3">
            {tasks.slice(0, 3).map((task) => (
              <div className="border-b border-slate-100 pb-3 last:border-0 last:pb-0" key={task.id}>
                <div className="font-medium text-slate-900">{task.title}</div>
                <div className="mt-1 text-sm text-slate-500">{task.status}</div>
              </div>
            ))}
            {!tasks.length ? <p className="text-sm text-slate-500">No task data yet.</p> : null}
          </div>
        </article>

        <article className="rounded-md border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-950">Recent Prompts</h2>
          <div className="mt-4 space-y-3">
            {prompts.slice(0, 3).map((item) => (
              <div className="border-b border-slate-100 pb-3 last:border-0 last:pb-0" key={item.id}>
                <div className="line-clamp-2 text-sm text-slate-700">{item.prompt}</div>
                <div className="mt-1 text-xs text-slate-500">{item.related_file || "No related file"}</div>
              </div>
            ))}
            {!prompts.length ? <p className="text-sm text-slate-500">No prompt data yet.</p> : null}
          </div>
        </article>
      </div>
    </section>
  );
}
