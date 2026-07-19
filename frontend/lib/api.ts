export type Task = {
  id: number;
  title: string;
  description: string;
  status: "todo" | "doing" | "done" | string;
  created_at: string;
};

export type PromptLog = {
  id: number;
  prompt: string;
  response: string;
  related_file: string;
  created_at: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function getTasks() {
  return request<Task[]>("/api/tasks");
}

export function getPrompts() {
  return request<PromptLog[]>("/api/prompts");
}

