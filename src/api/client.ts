import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Agregar token JWT automáticamente si existe en localStorage
api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("levelup_auth");
  if (stored) {
    try {
      const { token } = JSON.parse(stored) as { token?: string };
      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // si está roto, lo ignoramos
    }
  }
  return config;
});
