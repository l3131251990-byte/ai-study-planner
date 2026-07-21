"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

export type Language = "zh" | "en";

const messages = {
  zh: {
    appName: "AI 学习计划器",
    nav: {
      dashboard: "仪表盘",
      tasks: "学习任务",
      plans: "学习计划",
      notes: "学习笔记",
    },
    language: {
      switchTo: "切换语言",
    },
    common: {
      apiError: "无法连接后端 API。请确认 Flask 已启动，或已配置线上后端地址。",
      loading: "加载中...",
    },
    dashboard: {
      title: "学习仪表盘",
      subtitle: "跟踪任务、计划、笔记和全栈项目进度。",
      totalTasks: "任务总数",
      completed: "已完成",
      plans: "学习计划",
      notes: "学习笔记",
      apiStatus: "API 状态",
      offline: "离线",
      checking: "检查中",
      online: "在线",
      recentTasks: "最近任务",
      recentPlans: "最近计划",
      noTasks: "暂无任务数据。",
      noPlans: "暂无计划数据。",
    },
    tasks: {
      title: "学习任务",
      subtitle: "管理实训任务，形成可演示的学习进度记录。",
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
    plans: {
      title: "学习计划",
      subtitle: "按阶段规划学习目标、截止时间和当前状态。",
      titlePlaceholder: "计划名称，例如 后端 API 阶段",
      goalPlaceholder: "阶段目标",
      dueDatePlaceholder: "截止日期，例如 2026-07-21",
      add: "新增计划",
      loading: "正在加载学习计划...",
      empty: "暂无学习计划，先创建一个阶段计划。",
      required: "计划名称不能为空。",
      createFailed: "新增学习计划失败。",
      goal: "目标",
      dueDate: "截止",
      noGoal: "暂无目标说明",
      noDueDate: "未设置",
      status: {
        planned: "计划中",
        active: "执行中",
        finished: "已完成",
      },
    },
    notes: {
      title: "学习笔记",
      subtitle: "记录问题、解决过程、部署经验和技术总结。",
      titlePlaceholder: "笔记标题",
      contentPlaceholder: "笔记内容",
      categoryPlaceholder: "分类，例如 deployment / frontend / backend",
      add: "新增笔记",
      loading: "正在加载学习笔记...",
      empty: "暂无学习笔记，先记录一次问题解决过程。",
      required: "标题和内容不能为空。",
      createFailed: "新增学习笔记失败。",
      category: "分类",
    },
  },
  en: {
    appName: "AI Study Planner",
    nav: {
      dashboard: "Dashboard",
      tasks: "Tasks",
      plans: "Plans",
      notes: "Notes",
    },
    language: {
      switchTo: "Switch language",
    },
    common: {
      apiError: "Cannot connect to the backend API. Start Flask or configure the deployed API URL.",
      loading: "Loading...",
    },
    dashboard: {
      title: "Dashboard",
      subtitle: "Track tasks, plans, notes, and full-stack project progress.",
      totalTasks: "Total Tasks",
      completed: "Completed",
      plans: "Plans",
      notes: "Notes",
      apiStatus: "API Status",
      offline: "Offline",
      checking: "Checking",
      online: "Online",
      recentTasks: "Recent Tasks",
      recentPlans: "Recent Plans",
      noTasks: "No task data yet.",
      noPlans: "No plan data yet.",
    },
    tasks: {
      title: "Tasks",
      subtitle: "Manage study tasks and create visible progress records.",
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
    plans: {
      title: "Plans",
      subtitle: "Plan learning goals, deadlines, and status by stage.",
      titlePlaceholder: "Plan name, for example Backend API stage",
      goalPlaceholder: "Stage goal",
      dueDatePlaceholder: "Due date, for example 2026-07-21",
      add: "Add plan",
      loading: "Loading plans...",
      empty: "No plans yet. Create a stage plan first.",
      required: "Plan title is required.",
      createFailed: "Failed to create plan.",
      goal: "Goal",
      dueDate: "Due",
      noGoal: "No goal description",
      noDueDate: "Not set",
      status: {
        planned: "Planned",
        active: "Active",
        finished: "Finished",
      },
    },
    notes: {
      title: "Notes",
      subtitle: "Record issues, solutions, deployment lessons, and technical summaries.",
      titlePlaceholder: "Note title",
      contentPlaceholder: "Note content",
      categoryPlaceholder: "Category, for example deployment / frontend / backend",
      add: "Add note",
      loading: "Loading notes...",
      empty: "No notes yet. Record one problem-solving process first.",
      required: "Title and content are required.",
      createFailed: "Failed to create note.",
      category: "Category",
    },
  },
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: typeof messages.zh;
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
