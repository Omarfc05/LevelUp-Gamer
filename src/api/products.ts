// src/api/products.ts
import { api } from "./client";
import type { Product } from "../contexts/CartContext";

// cómo viene desde el backend
type ApiProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  imgSource: string; // <- nombre del backend
};

export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get<ApiProduct[]>("/products");

  // mapeamos imgSource -> imageSrc para que el front quede feliz
  return res.data.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    category: p.category,
    price: p.price,
    imageSrc: p.imgSource,
  }));
};
