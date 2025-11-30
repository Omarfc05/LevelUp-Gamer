import { createContext, useContext, useState, type ReactNode } from "react";

export type Product = {
  id: number;
  title: string;
  description?: string;
  category?: string;
  price: number;
  imageSrc: string;
};

export type CartItem = Product & { qty: number };

type CartContextType = {
  items: CartItem[];
  addToCart: (p: Product) => void;
  removeOne: (id: number) => void;
  removeAll: (id: number) => void;
  clearCart: () => void;
  formatCLP: (n: number) => string;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  //Definimos el useState de los items del carrito
  const [items, setItems] = useState<CartItem[]>([]);

  //Definimos la funcion para añadir al carro. Si el producto existe, añade 1 a la cantidad.
  const addToCart = (p: Product) => {
    setItems((prev) => {
      const exists = prev.find((it) => it.id === p.id);
      if (!exists) return [...prev, { ...p, qty: 1 }];
      return prev.map((it) =>
        it.id === p.id ? { ...it, qty: it.qty + 1 } : it
      );
    });
  };

  //Definimos la funcion para remover del carro.
  const removeOne = (id: number) => {
    setItems((prev) => {
      const it = prev.find((x) => x.id === id);
      if (!it) return prev;
      if (it.qty === 1) return prev.filter((x) => x.id !== id);
      return prev.map((x) => (x.id === id ? { ...x, qty: x.qty - 1 } : x));
    });
  };

  //FUNCION APRA ELIMINAR TODOS LOS PRODUCTOS DE UNA MISMA ID
  const removeAll = (id: number) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  //LIMPIAR EL CARRITO POR COMPLETO
  const clearCart = () => setItems([]);

  //DAMOS FORMATO DE PRECIO CHILENO
  const formatCLP = (n: number) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(n);

  //Devolvemos el PROVIDER con todas las funciones para que esten disponibles a nivel global
  return (
    <CartContext.Provider
      value={{ items, addToCart, removeOne, removeAll, clearCart, formatCLP }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  //Creamos un contexto con CartContext
  const ctx = useContext(CartContext);
  //si el contexto no existe aun (es NaN o null) enviar un error
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
};
