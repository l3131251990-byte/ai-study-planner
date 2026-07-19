"use client";

import Link from "next/link";
import { Languages } from "lucide-react";
import { LanguageProvider, useLanguage } from "@/lib/i18n";

const navItems = [
  { href: "/", key: "dashboard" },
  { href: "/tasks", key: "tasks" },
  { href: "/prompts", key: "prompts" },
  { href: "/review", key: "review" },
] as const;

function AppFrame({ children }: { children: React.ReactNode }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between">
          <Link className="flex items-center gap-3 text-lg font-semibold text-slate-950" href="/">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-slate-950 text-sm text-white">AI</span>
            <span>{t.appName}</span>
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            {navItems.map((item) => (
              <Link
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                href={item.href}
                key={item.href}
              >
                {t.nav[item.key]}
              </Link>
            ))}
            <button
              aria-label={t.language.switchTo}
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              onClick={() => setLanguage(language === "zh" ? "en" : "zh")}
              type="button"
            >
              <Languages className="h-4 w-4" />
              {language === "zh" ? "EN" : "中文"}
            </button>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AppFrame>{children}</AppFrame>
    </LanguageProvider>
  );
}

