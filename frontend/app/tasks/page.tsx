"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Check, Loader2, Plus, Trash2 } from "lucide-react";
import { createTask, deleteTask, getTasks, Task, updateTask } from "@/lib/api";
import { useLanguage } from "@/lib/i18n";

export default function TasksPage() {
  const { t } = useLanguage();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadTasks() {
    try {
      setError("");
      setLoading(true);
      setTasks(await getTasks());
    } catch {
      setError(t.common.apiError);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadTasks();
  }, [t.common.apiError]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) {
      setError(t.tasks.titleRequired);
      return;
    }

    try {
      setSaving(true);
      setError("");
      const task = await createTask({ title, description, status });
      setTasks((current) => [task, ...current]);
      setTitle("");
      setDescription("");
      setStatus("todo");
    } catch {
      setError(t.tasks.createFailed);
    } finally {
      setSaving(false);
    }
  }

  async function handleStatusChange(task: Task) {
    const nextStatus = task.status === "done" ? "todo" : "done";
    try {
      const updated = await updateTask(task.id, { status: nextStatus });
      setTasks((current) =>
        current.map((item) => (item.id === task.id ? updated : item)),
      );
    } catch {
      setError(t.tasks.updateFailed);
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteTask(id);
      setTasks((current) => current.filter((task) => task.id !== id));
    } catch {
      setError(t.tasks.deleteFailed);
    }
  }

  const completionRate = useMemo(() => {
    if (!tasks.length) return 0;
    const doneCount = tasks.filter((task) => task.status === "done").length;
    return Math.round((doneCount / tasks.length) * 100);
  }, [tasks]);

  return (
    <section className="space-y-7">
      <div className="flex flex-col justify-between gap-4 rounded-md border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-semibold text-slate-950">{t.tasks.title}</h1>
          <p className="mt-2 text-slate-600">
            {t.tasks.subtitle}
          </p>
        </div>
        <div className="rounded-md border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-800">
          {t.tasks.completion} <span className="font-semibold text-teal-950">{completionRate}%</span>
        </div>
      </div>

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <form
        className="grid gap-3 rounded-md border border-slate-200 bg-white p-5 shadow-sm"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-3 md:grid-cols-[1fr_180px]">
          <input
            className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
            onChange={(event) => setTitle(event.target.value)}
            placeholder={t.tasks.titlePlaceholder}
            value={title}
          />
          <select
            className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
            onChange={(event) => setStatus(event.target.value)}
            value={status}
          >
            <option value="todo">{t.tasks.status.todo}</option>
            <option value="doing">{t.tasks.status.doing}</option>
            <option value="done">{t.tasks.status.done}</option>
          </select>
        </div>
        <textarea
          className="min-h-24 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          onChange={(event) => setDescription(event.target.value)}
          placeholder={t.tasks.descriptionPlaceholder}
          value={description}
        />
        <button
          className="inline-flex w-fit items-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-400"
          disabled={saving}
          type="submit"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          {saving ? t.tasks.saving : t.tasks.add}
        </button>
      </form>

      <div className="space-y-3">
        {loading ? (
          <div className="rounded-md border border-slate-200 bg-white p-5 text-sm text-slate-600">
            {t.tasks.loading}
          </div>
        ) : tasks.length ? (
          tasks.map((task) => (
            <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm" key={task.id}>
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-slate-950">{task.title}</h2>
                    <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600">
                      {t.tasks.status[task.status as keyof typeof t.tasks.status] || task.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{task.description || t.tasks.noDescription}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50"
                    onClick={() => void handleStatusChange(task)}
                    type="button"
                  >
                    <Check className="h-4 w-4" />
                    {task.status === "done" ? t.tasks.reopen : t.tasks.complete}
                  </button>
                  <button
                    className="inline-flex items-center gap-2 rounded-md border border-red-200 px-3 py-2 text-sm text-red-700 hover:bg-red-50"
                    onClick={() => void handleDelete(task.id)}
                    type="button"
                  >
                    <Trash2 className="h-4 w-4" />
                    {t.tasks.delete}
                  </button>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-md border border-slate-200 bg-white p-5 text-sm text-slate-600">
            {t.tasks.empty}
          </div>
        )}
      </div>
    </section>
  );
}
