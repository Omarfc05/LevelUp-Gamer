// src/api/products.ts

import { api } from "../api/client";
import type { Product } from "../contexts/CartContext";

export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get<Product[]>("/products");
  // si tu back devuelve imgSource, aquí lo normalizamos a imageSrc
  return res.data.map((p: any) => ({
    ...p,
    imageSrc: p.imageSrc ?? p.imgSource ?? p.image, // por si acaso
  }));
};

export const getProduct = async (id: number): Promise<Product> => {
  const res = await api.get<Product>(`/products/${id}`);
  const p: any = res.data;
  return {
    ...p,
    imageSrc: p.imageSrc ?? p.imgSource ?? p.image,
  };
};
