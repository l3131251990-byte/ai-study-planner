"use client";

import { FormEvent, useEffect, useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { createPrompt, getPrompts, PromptLog } from "@/lib/api";
import { useLanguage } from "@/lib/i18n";

export default function PromptsPage() {
  const { t } = useLanguage();
  const [prompts, setPrompts] = useState<PromptLog[]>([]);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [relatedFile, setRelatedFile] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadPrompts() {
    try {
      setError("");
      setLoading(true);
      setPrompts(await getPrompts());
    } catch {
      setError(t.common.apiError);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadPrompts();
  }, [t.common.apiError]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!prompt.trim() || !response.trim()) {
      setError(t.prompts.required);
      return;
    }

    try {
      setSaving(true);
      setError("");
      const created = await createPrompt({
        prompt,
        response,
        related_file: relatedFile,
      });
      setPrompts((current) => [created, ...current]);
      setPrompt("");
      setResponse("");
      setRelatedFile("");
    } catch {
      setError(t.prompts.createFailed);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="space-y-7">
      <div className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-950">{t.prompts.title}</h1>
        <p className="mt-2 text-slate-600">
          {t.prompts.subtitle}
        </p>
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
        <textarea
          className="min-h-24 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          onChange={(event) => setPrompt(event.target.value)}
          placeholder={t.prompts.promptPlaceholder}
          value={prompt}
        />
        <textarea
          className="min-h-32 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          onChange={(event) => setResponse(event.target.value)}
          placeholder={t.prompts.responsePlaceholder}
          value={response}
        />
        <input
          className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          onChange={(event) => setRelatedFile(event.target.value)}
          placeholder={t.prompts.filePlaceholder}
          value={relatedFile}
        />
        <button
          className="inline-flex w-fit items-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-400"
          disabled={saving}
          type="submit"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          {t.prompts.add}
        </button>
      </form>

      <div className="space-y-3">
        {loading ? (
          <div className="rounded-md border border-slate-200 bg-white p-5 text-sm text-slate-600">
            {t.prompts.loading}
          </div>
        ) : prompts.length ? (
          prompts.map((item) => (
            <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm" key={item.id}>
              <div className="text-xs font-medium text-slate-500">
                {item.related_file || t.common.emptyFile}
              </div>
              <h2 className="mt-3 text-sm font-semibold text-slate-950">{t.prompts.prompt}</h2>
              <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">{item.prompt}</p>
              <h2 className="mt-4 text-sm font-semibold text-slate-950">{t.prompts.response}</h2>
              <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">{item.response}</p>
            </article>
          ))
        ) : (
          <div className="rounded-md border border-slate-200 bg-white p-5 text-sm text-slate-600">
            {t.prompts.empty}
          </div>
        )}
      </div>
    </section>
  );
}
