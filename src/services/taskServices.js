import { apiFetch } from "./apiClient";

export const addTaskToServer = async ({
  title,
  description,
  duedate,
  category,
}) => {
  const response = await apiFetch(`/api/task/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ title, description, duedate, category }),
  });
  const task = await response.json();
  return mapServerItemToLocalItem(task);
};

export const getTaskFromServer = async () => {
  const response = await apiFetch(`/api/task/`);
  const tasks = await response.json();
  return tasks.map(mapServerItemToLocalItem);
};

export const updateTaskAtServer = async (id, updatedFields) => {
  const response = await apiFetch(`/api/task/${id}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedFields),
  });
  const task = await response.json();
  return mapServerItemToLocalItem(task);
};

export const deletTaskFromServer = async (id) => {
  const response = await apiFetch(`/api/task/${id}/delete`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete task");
  return true;
};

const mapServerItemToLocalItem = (serverItem) => {
  return {
    id: serverItem._id,
    title: serverItem.title,
    desc: serverItem.description, // you use desc in frontend
    duedate: serverItem.duedate,
    category: serverItem.category,
    createdAt: serverItem.createdAt,
    updatedAt: serverItem.updatedAt,
  };
};
