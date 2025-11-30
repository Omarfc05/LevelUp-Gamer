
import type { User } from "../interface/User";
import { api } from "./client";

export const getUsers = async (token: string): Promise<User[]> => {
  const res = await api.get<User[]>("/admin/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

type CreateUserPayload = {
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
};

export const createUser = async (
  token: string,
  payload: CreateUserPayload
): Promise<User> => {
  const res = await api.post<User>("/admin/users", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

type UpdateUserPayload = {
  name?: string;
  email?: string;
  password?: string;
  role?: "USER" | "ADMIN";
};

export const updateUser = async (
  token: string,
  id: number,
  payload: UpdateUserPayload
): Promise<User> => {
  const res = await api.put<User>(`/admin/users/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteUser = async (token: string, id: number): Promise<void> => {
  await api.delete(`/admin/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
