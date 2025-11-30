import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  role?: string;
};

export const getUserRole = () => {
  const stored = localStorage.getItem("levelup_auth") ?? localStorage.getItem("token");
  if (!stored) return null;

  try {
    const token = stored.startsWith("{") ? JSON.parse(stored).token : stored;
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.role ?? null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getToken = () => {
  const stored = localStorage.getItem("levelup_auth") ?? localStorage.getItem("token");
  if (!stored) return null;
  try {
    return stored.startsWith("{") ? JSON.parse(stored).token : stored;
  } catch {
    return null;
  }
};
