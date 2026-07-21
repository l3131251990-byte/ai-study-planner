"use client";

import { FormEvent, useEffect, useState } from "react";
import { BookOpenText, Loader2, Plus } from "lucide-react";
import { createNote, getNotes, Note } from "@/lib/api";
import { useLanguage } from "@/lib/i18n";

export default function NotesPage() {
  const { t } = useLanguage();
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadNotes() {
    try {
      setError("");
      setLoading(true);
      setNotes(await getNotes());
    } catch {
      setError(t.common.apiError);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadNotes();
  }, [t.common.apiError]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError(t.notes.required);
      return;
    }

    try {
      setSaving(true);
      setError("");
      const created = await createNote({
        title,
        content,
        category,
      });
      setNotes((current) => [created, ...current]);
      setTitle("");
      setContent("");
      setCategory("");
    } catch {
      setError(t.notes.createFailed);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="space-y-7">
      <div className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-950">{t.notes.title}</h1>
        <p className="mt-2 text-slate-600">{t.notes.subtitle}</p>
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
        <div className="grid gap-3 md:grid-cols-[1fr_240px]">
          <input
            className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
            onChange={(event) => setTitle(event.target.value)}
            placeholder={t.notes.titlePlaceholder}
            value={title}
          />
          <input
            className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
            onChange={(event) => setCategory(event.target.value)}
            placeholder={t.notes.categoryPlaceholder}
            value={category}
          />
        </div>
        <textarea
          className="min-h-32 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          onChange={(event) => setContent(event.target.value)}
          placeholder={t.notes.contentPlaceholder}
          value={content}
        />
        <button
          className="inline-flex w-fit items-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-400"
          disabled={saving}
          type="submit"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          {t.notes.add}
        </button>
      </form>

      <div className="space-y-3">
        {loading ? (
          <div className="rounded-md border border-slate-200 bg-white p-5 text-sm text-slate-600">
            {t.notes.loading}
          </div>
        ) : notes.length ? (
          notes.map((note) => (
            <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm" key={note.id}>
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-teal-50 text-teal-700">
                  <BookOpenText className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs font-medium text-slate-500">
                    {t.notes.category}: {note.category || "general"}
                  </div>
                  <h2 className="mt-2 text-lg font-semibold text-slate-950">{note.title}</h2>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">{note.content}</p>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-md border border-slate-200 bg-white p-5 text-sm text-slate-600">
            {t.notes.empty}
          </div>
        )}
      </div>
    </section>
  );
}
