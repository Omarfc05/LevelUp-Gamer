import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { api } from "../api/client";

type User = {
  id: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthStorage = {
  token: string;
  user: User;
};

const STORAGE_KEY = "levelup_auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Cargar info desde localStorage al iniciar la app
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed: AuthStorage = JSON.parse(stored);
      setUser(parsed.user);
      setToken(parsed.token);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post<AuthStorage>("/auth/login", {
      email,
      password,
    });

    const data = res.data;
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
};
