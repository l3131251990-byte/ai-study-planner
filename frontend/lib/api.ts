export type Task = {
  id: number;
  title: string;
  description: string;
  status: "todo" | "doing" | "done" | string;
  created_at: string;
};

export type Plan = {
  id: number;
  title: string;
  goal: string;
  status: "planned" | "active" | "finished" | string;
  due_date: string;
  created_at: string;
};

export type Note = {
  id: number;
  title: string;
  content: string;
  category: string;
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

export function getPlans() {
  return request<Plan[]>("/api/plans");
}

export function getNotes() {
  return request<Note[]>("/api/notes");
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

export function createPlan(data: {
  title: string;
  goal?: string;
  status?: string;
  due_date?: string;
}) {
  return request<Plan>("/api/plans", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function createNote(data: {
  title: string;
  content: string;
  category?: string;
}) {
  return request<Note>("/api/notes", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
