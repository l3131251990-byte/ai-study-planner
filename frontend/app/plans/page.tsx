"use client";

import { FormEvent, useEffect, useState } from "react";
import { CalendarDays, Loader2, Plus } from "lucide-react";
import { createPlan, getPlans, Plan } from "@/lib/api";
import { useLanguage } from "@/lib/i18n";

export default function PlansPage() {
  const { t } = useLanguage();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [status, setStatus] = useState("planned");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadPlans() {
    try {
      setError("");
      setLoading(true);
      setPlans(await getPlans());
    } catch {
      setError(t.common.apiError);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadPlans();
  }, [t.common.apiError]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) {
      setError(t.plans.required);
      return;
    }

    try {
      setSaving(true);
      setError("");
      const created = await createPlan({
        title,
        goal,
        status,
        due_date: dueDate,
      });
      setPlans((current) => [created, ...current]);
      setTitle("");
      setGoal("");
      setStatus("planned");
      setDueDate("");
    } catch {
      setError(t.plans.createFailed);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="space-y-7">
      <div className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-950">{t.plans.title}</h1>
        <p className="mt-2 text-slate-600">{t.plans.subtitle}</p>
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
        <div className="grid gap-3 md:grid-cols-[1fr_160px_180px]">
          <input
            className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
            onChange={(event) => setTitle(event.target.value)}
            placeholder={t.plans.titlePlaceholder}
            value={title}
          />
          <select
            className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
            onChange={(event) => setStatus(event.target.value)}
            value={status}
          >
            <option value="planned">{t.plans.status.planned}</option>
            <option value="active">{t.plans.status.active}</option>
            <option value="finished">{t.plans.status.finished}</option>
          </select>
          <input
            className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
            onChange={(event) => setDueDate(event.target.value)}
            placeholder={t.plans.dueDatePlaceholder}
            value={dueDate}
          />
        </div>
        <textarea
          className="min-h-24 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          onChange={(event) => setGoal(event.target.value)}
          placeholder={t.plans.goalPlaceholder}
          value={goal}
        />
        <button
          className="inline-flex w-fit items-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-400"
          disabled={saving}
          type="submit"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          {t.plans.add}
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-2">
        {loading ? (
          <div className="rounded-md border border-slate-200 bg-white p-5 text-sm text-slate-600">
            {t.plans.loading}
          </div>
        ) : plans.length ? (
          plans.map((plan) => (
            <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm" key={plan.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-950">{plan.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{plan.goal || t.plans.noGoal}</p>
                </div>
                <span className="shrink-0 rounded bg-teal-50 px-2 py-1 text-xs font-medium text-teal-700">
                  {t.plans.status[plan.status as keyof typeof t.plans.status] || plan.status}
                </span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                <CalendarDays className="h-4 w-4" />
                {t.plans.dueDate}: {plan.due_date || t.plans.noDueDate}
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-md border border-slate-200 bg-white p-5 text-sm text-slate-600">
            {t.plans.empty}
          </div>
        )}
      </div>
    </section>
  );
}
