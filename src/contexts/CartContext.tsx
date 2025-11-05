import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// 🧩 Tipo de producto (basado en tu archivo Products.tsx)
export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  imgSource: string;
};

// 🧩 Tipo para ítem del carrito
export type CartItem = Product & { quantity: number };

// 🧩 Tipo del contexto del carrito
type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: number) => void;
  increment: (productId: number) => void;
  decrement: (productId: number) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
};

// 🧩 Creación del contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "levelup_cart_v1";

// 🧩 Proveedor del carrito
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Cargar carrito desde localStorage
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setCart(JSON.parse(raw));
      } catch (e) {
        console.error("Error al leer carrito:", e);
      }
    }
  }, []);

  // Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // 🧩 Agregar producto al carrito
  const addToCart = (product: Product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (!existing) {
        return [...prev, { ...product, quantity: qty }];
      }
      return prev.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + qty } : p
      );
    });
  };

  // 🧩 Eliminar producto
  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // 🧩 Incrementar cantidad
  const increment = (id: number) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  // 🧩 Decrementar cantidad
  const decrement = (id: number) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(1, p.quantity - 1) } : p
      )
    );
  };

  // 🧩 Vaciar carrito
  const clearCart = () => setCart([]);

  // 🧩 Totales
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increment,
        decrement,
        clearCart,
        totalCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 🧩 Hook para usar el carrito fácilmente
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart debe usarse dentro de un CartProvider");
  return context;
};
