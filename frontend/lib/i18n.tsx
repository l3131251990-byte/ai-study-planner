"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

export type Language = "zh" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: typeof messages.zh;
};

const messages = {
  zh: {
    appName: "AI 学习计划器",
    nav: {
      dashboard: "仪表盘",
      tasks: "学习任务",
      prompts: "Prompt 日志",
      review: "项目复盘",
    },
    language: {
      zh: "中文",
      en: "English",
      switchTo: "切换语言",
    },
    common: {
      apiError: "无法连接后端 API。请确认 Flask 已启动，或已配置线上后端地址。",
      emptyFile: "未关联文件",
      loading: "加载中...",
    },
    dashboard: {
      title: "学习仪表盘",
      subtitle: "跟踪学习任务、AI Prompt 留痕和全栈项目进度。",
      totalTasks: "任务总数",
      completed: "已完成",
      promptLogs: "Prompt 记录",
      apiStatus: "API 状态",
      offline: "离线",
      checking: "检查中",
      online: "在线",
      recentTasks: "最近任务",
      recentPrompts: "最近 Prompt",
      noTasks: "暂无任务数据。",
      noPrompts: "暂无 Prompt 数据。",
    },
    tasks: {
      title: "学习任务",
      subtitle: "管理实训任务，形成可演示的开发过程记录。",
      completion: "完成率",
      titlePlaceholder: "任务标题",
      descriptionPlaceholder: "任务说明",
      add: "新增任务",
      saving: "保存中",
      loading: "正在加载任务...",
      empty: "暂无任务，先新增一条学习任务。",
      titleRequired: "任务标题不能为空。",
      createFailed: "新增任务失败。",
      updateFailed: "更新任务状态失败。",
      deleteFailed: "删除任务失败。",
      noDescription: "暂无说明",
      complete: "完成",
      reopen: "重开",
      delete: "删除",
      status: {
        todo: "待开始",
        doing: "进行中",
        done: "已完成",
      },
    },
    prompts: {
      title: "Prompt 日志",
      subtitle: "记录 Prompt、AI 回复和关联文件，满足过程留痕要求。",
      promptPlaceholder: "用户 Prompt",
      responsePlaceholder: "AI 原始回复或关键输出",
      filePlaceholder: "关联功能或文件，例如 frontend/app/tasks/page.tsx",
      add: "新增 Prompt",
      loading: "正在加载 Prompt 日志...",
      empty: "暂无 Prompt 日志，先新增一条开发记录。",
      required: "Prompt 和 AI 回复不能为空。",
      createFailed: "新增 Prompt 日志失败。",
      prompt: "Prompt",
      response: "AI 回复",
    },
    review: {
      title: "项目复盘",
      subtitle: "集中整理 AI Code Review、开发阶段和个人总结材料。",
      codeReviewTitle: "AI Code Review",
      codeReviewText: "已将 AI 审查建议、采纳结果和验证记录整理到 code_review.md。",
      summaryTitle: "个人总结",
      summaryText: "summary.md 已补充 500 字以上的实训总结，可作为最终提交材料。",
      deploymentTitle: "部署状态",
      deploymentText: "后端部署在 Render，前端部署在 Vercel，数据库使用 Supabase 免费 PostgreSQL。",
      evidenceTitle: "过程留痕",
      evidenceText: "prompt_log.md 记录了关键 Prompt、AI 回复和对应功能文件。",
    },
  },
  en: {
    appName: "AI Study Planner",
    nav: {
      dashboard: "Dashboard",
      tasks: "Tasks",
      prompts: "Prompts",
      review: "Review",
    },
    language: {
      zh: "中文",
      en: "English",
      switchTo: "Switch language",
    },
    common: {
      apiError: "Cannot connect to the backend API. Start Flask or configure the deployed API URL.",
      emptyFile: "No related file",
      loading: "Loading...",
    },
    dashboard: {
      title: "Dashboard",
      subtitle: "Track study tasks, AI prompt evidence, and full-stack project progress.",
      totalTasks: "Total Tasks",
      completed: "Completed",
      promptLogs: "Prompt Logs",
      apiStatus: "API Status",
      offline: "Offline",
      checking: "Checking",
      online: "Online",
      recentTasks: "Recent Tasks",
      recentPrompts: "Recent Prompts",
      noTasks: "No task data yet.",
      noPrompts: "No prompt data yet.",
    },
    tasks: {
      title: "Tasks",
      subtitle: "Manage study tasks and create visible records for the final demo.",
      completion: "Completion",
      titlePlaceholder: "Task title",
      descriptionPlaceholder: "Task description",
      add: "Add task",
      saving: "Saving",
      loading: "Loading tasks...",
      empty: "No tasks yet. Add one to start tracking progress.",
      titleRequired: "Task title is required.",
      createFailed: "Failed to create task.",
      updateFailed: "Failed to update task status.",
      deleteFailed: "Failed to delete task.",
      noDescription: "No description",
      complete: "Complete",
      reopen: "Reopen",
      delete: "Delete",
      status: {
        todo: "Todo",
        doing: "In Progress",
        done: "Done",
      },
    },
    prompts: {
      title: "Prompts",
      subtitle: "Record prompts, AI responses, and related files for assessment evidence.",
      promptPlaceholder: "User prompt",
      responsePlaceholder: "Original AI response or key output",
      filePlaceholder: "Related feature or file, for example frontend/app/tasks/page.tsx",
      add: "Add prompt",
      loading: "Loading prompt logs...",
      empty: "No prompt logs yet. Add one to document the development process.",
      required: "Prompt and AI response are required.",
      createFailed: "Failed to create prompt log.",
      prompt: "Prompt",
      response: "AI Response",
    },
    review: {
      title: "Review",
      subtitle: "Organize AI code review, development stages, and personal reflection materials.",
      codeReviewTitle: "AI Code Review",
      codeReviewText: "AI review suggestions, accepted changes, and validation records are in code_review.md.",
      summaryTitle: "Final Summary",
      summaryText: "summary.md contains a 500+ Chinese-character reflection for final submission.",
      deploymentTitle: "Deployment",
      deploymentText: "The backend is on Render, the frontend is on Vercel, and the database is Supabase PostgreSQL.",
      evidenceTitle: "Evidence",
      evidenceText: "prompt_log.md records key prompts, AI responses, and related feature files.",
    },
  },
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("zh");

  useEffect(() => {
    const saved = window.localStorage.getItem("language");
    if (saved === "zh" || saved === "en") {
      setLanguageState(saved);
    }
  }, []);

  function setLanguage(nextLanguage: Language) {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("language", nextLanguage);
  }

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: messages[language],
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return value;
}

