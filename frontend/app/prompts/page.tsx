"use client";

import { FormEvent, useEffect, useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { createPrompt, getPrompts, PromptLog } from "@/lib/api";

export default function PromptsPage() {
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
      setError("Cannot connect to the backend API. Start Flask or configure the deployed API URL.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadPrompts();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!prompt.trim() || !response.trim()) {
      setError("Prompt and AI response are required.");
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
      setError("Failed to create prompt log.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-950">Prompts</h1>
        <p className="mt-2 text-slate-600">
          Record prompts, AI responses, and related files for assessment evidence.
        </p>
      </div>

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <form
        className="grid gap-3 rounded-md border border-slate-200 bg-white p-5"
        onSubmit={handleSubmit}
      >
        <textarea
          className="min-h-24 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="User prompt"
          value={prompt}
        />
        <textarea
          className="min-h-32 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          onChange={(event) => setResponse(event.target.value)}
          placeholder="Original AI response or key output"
          value={response}
        />
        <input
          className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          onChange={(event) => setRelatedFile(event.target.value)}
          placeholder="Related feature or file, for example frontend/app/tasks/page.tsx"
          value={relatedFile}
        />
        <button
          className="inline-flex w-fit items-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-400"
          disabled={saving}
          type="submit"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          Add prompt
        </button>
      </form>

      <div className="space-y-3">
        {loading ? (
          <div className="rounded-md border border-slate-200 bg-white p-5 text-sm text-slate-600">
            Loading prompt logs...
          </div>
        ) : prompts.length ? (
          prompts.map((item) => (
            <article className="rounded-md border border-slate-200 bg-white p-5" key={item.id}>
              <div className="text-xs font-medium text-slate-500">
                {item.related_file || "No related file"}
              </div>
              <h2 className="mt-3 text-sm font-semibold text-slate-950">Prompt</h2>
              <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">{item.prompt}</p>
              <h2 className="mt-4 text-sm font-semibold text-slate-950">AI Response</h2>
              <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">{item.response}</p>
            </article>
          ))
        ) : (
          <div className="rounded-md border border-slate-200 bg-white p-5 text-sm text-slate-600">
            No prompt logs yet. Add one to document the development process.
          </div>
        )}
      </div>
    </section>
  );
}
