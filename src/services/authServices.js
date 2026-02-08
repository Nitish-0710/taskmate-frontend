import { apiFetch } from "./apiClient";

export const registerUser = async (email, password) => {
  const response = await apiFetch(`/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Registration failed");
  }

  return response.json();
};

export const loginUser = async (email, password) => {
  const response = await apiFetch(`/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Login Failed");
  }

  return response.json();
};

export const logoutUser = async () => {
  await apiFetch(`/api/auth/logout`, {
    method: "POST",
  });
};
