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

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000").replace(
  /\/$/,
  "",
);

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

export function createTask(data: {
  title: string;
  description?: string;
  status?: string;
}) {
  return request<Task>("/api/tasks", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateTask(
  id: number,
  data: Partial<Pick<Task, "title" | "description" | "status">>,
) {
  return request<Task>(`/api/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteTask(id: number) {
  return request<{ ok: boolean }>(`/api/tasks/${id}`, {
    method: "DELETE",
  });
}

export function createPrompt(data: {
  prompt: string;
  response: string;
  related_file?: string;
}) {
  return request<PromptLog>("/api/prompts", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
