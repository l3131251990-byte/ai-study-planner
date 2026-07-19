"use client";

import { ClipboardCheck, FileText, Rocket, ScrollText } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function ReviewPage() {
  const { t } = useLanguage();

  const cards = [
    {
      title: t.review.codeReviewTitle,
      text: t.review.codeReviewText,
      icon: ClipboardCheck,
    },
    {
      title: t.review.summaryTitle,
      text: t.review.summaryText,
      icon: FileText,
    },
    {
      title: t.review.deploymentTitle,
      text: t.review.deploymentText,
      icon: Rocket,
    },
    {
      title: t.review.evidenceTitle,
      text: t.review.evidenceText,
      icon: ScrollText,
    },
  ];

  return (
    <section className="space-y-7">
      <div className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-950">{t.review.title}</h1>
        <p className="mt-2 text-slate-600">{t.review.subtitle}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm" key={card.title}>
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-teal-50 text-teal-700">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-slate-950">{card.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{card.text}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
