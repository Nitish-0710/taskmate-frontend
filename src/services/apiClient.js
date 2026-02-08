import { logoutUser } from "./authServices";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AUTH_EXEMPT_ROUTES = [
  "/api/auth/me",
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/logout",
];

export const apiFetch = async (url, options = {}) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    credentials: "include",
    ...options,
  });

  const isAuthExempt = AUTH_EXEMPT_ROUTES.some(route =>
    url.includes(route)
  );

  if (response.status === 401 && !isAuthExempt) {
    await logoutUser();
    window.location.href = "/login";
    throw new Error("Session expired");
  }

  return response;
};
