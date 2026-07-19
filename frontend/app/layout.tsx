import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Study Planner",
  description: "A full-stack study planner for AI-assisted programming practice.",
};

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/tasks", label: "Tasks" },
  { href: "/prompts", label: "Prompts" },
  { href: "/review", label: "Review" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="min-h-screen">
          <header className="border-b border-slate-200 bg-white">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
              <Link className="text-lg font-semibold text-slate-950" href="/">
                AI Study Planner
              </Link>
              <div className="flex gap-2">
                {navItems.map((item) => (
                  <Link
                    className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                    href={item.href}
                    key={item.href}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          </header>
          <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}

