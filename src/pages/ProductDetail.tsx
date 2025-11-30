// src/pages/ProductDetail.tsx
import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";

import type { Product } from "../contexts/CartContext";
import { useCart } from "../contexts/CartContext";
import { getProduct } from "../data/products";

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { addToCart, formatCLP } = useCart();

  useEffect(() => {
    const load = async () => {
      try {
        if (!id) return;
        const data = await getProduct(Number(id));
        setProduct(data);
        setNotFound(false);
      } catch (e: any) {
        console.error(e);
        if (e.response?.status === 404) {
          setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (notFound) {
    // o <Navigate to="/404" replace />
    return <Navigate to="/404" replace />;
  }

  if (loading || !product) {
    return (
      <main className="container py-5">
        <p>Cargando producto…</p>
      </main>
    );
  }

  return (
    <main className="container py-5">
      <div className="row g-4 align-items-center">
        <div className="col-md-6 text-center">
          <img
            src={product.imageSrc}
            alt={product.title}
            className="img-fluid p-4"
          />
        </div>
        <div className="col-md-6">
          <h1 className="h3 mb-3">{product.title}</h1>
          <p className="text-secondary">{product.description}</p>
          <p className="h4 text-accent mb-4">
            {formatCLP(product.price)}
          </p>

          <div className="d-flex gap-2">
            <button
              className="btn btn-accent"
              type="button"
              onClick={() => addToCart(product)}
            >
              Añadir al carrito
            </button>
            <Link to="/products" className="btn btn-ghost">
              ← Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-5">
      <h2 className="gris">Productos Relacionados</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4 mt-3">
        <div className="col">
          <div className="card h-100">
            <img src="/img/seriesX.png" className="card-img-top" alt="Xbox Series X"/>
            <div className="card-body">
              <h5 className="card-title">Xbox Series X</h5>
              <p className="card-text">La consola más poderosa de Xbox, con 1TB SSD y 4K nativo.</p>
              <Link to="/products/2" className="btn btn-accent">Ver más</Link>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img src="/img/xboxcontrol.png" className="card-img-top" alt="Control Xbox"/>
            <div className="card-body">
              <h5 className="card-title">Control Inalámbrico Xbox</h5>
              <p className="card-text">Diseño ergonómico con mejor agarre y latencia reducida.</p>
              <Link to="/404" className="btn btn-accent">Ver más</Link>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img src="/img/gamepass.png" className="card-img-top" alt="Game Pass"/>
            <div className="card-body">
              <h5 className="card-title">Xbox Game Pass</h5>
              <p className="card-text">Suscripción mensual con acceso a cientos de juegos.</p>
              <Link to="/404" className="btn btn-accent">Ver más</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </main>
  );
};
