import { Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useCart, type Product } from "../contexts/CartContext";
import { getProducts } from "../api/products";

export const Products = () => {
  const { addToCart, formatCLP } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // rangos reales según lo que venga del backend
  const [minPriceProductos, setMinPriceProductos] = useState(0);
  const [maxPriceProductos, setMaxPriceProductos] = useState(0);

  // valores que usa el filtro (inputs)
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState("all");

  // cargar productos desde el backend
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProducts();
        setProducts(data);

        if (data.length > 0) {
          const prices = data.map((p) => p.price);
          const min = Math.min(...prices);
          const max = Math.max(...prices);

          setMinPriceProductos(min);
          setMaxPriceProductos(max);
          setMinPrice(min);
          setMaxPrice(max);
        }
      } catch (e) {
        console.error(e);
        setError("No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // categorías dinámicas desde el backend
  const categories = useMemo(
    () => [
      "all",
      ...Array.from(
        new Set(
          products
            .map((p) => p.category)
            .filter((c): c is string => Boolean(c))
        )
      ),
    ],
    [products]
  );

  // mismos filtros que tenías antes, pero sobre products del backend
  const filteredProducts = useMemo(
    () =>
      products.filter(
        (p) =>
          (selectedCategory === "all" || p.category === selectedCategory) &&
          p.price >= minPrice &&
          p.price <= maxPrice
      ),
    [products, selectedCategory, minPrice, maxPrice]
  );

  const handleReset = () => {
    setSelectedCategory("all");
    setMinPrice(minPriceProductos);
    setMaxPrice(maxPriceProductos);
  };

  if (loading) {
    return (
      <header className="container py-5 text-center">
        <h1 className="display-5 fw-bold title">Catálogo de Productos</h1>
        <p className="lead text-secondary">
          Cargando productos...
        </p>
      </header>
    );
  }

  if (error) {
    return (
      <header className="container py-5 text-center">
        <h1 className="display-5 fw-bold title">Catálogo de Productos</h1>
        <p className="lead text-danger">{error}</p>
      </header>
    );
  }

  return (
    <>
      <header className="container py-5 text-center">
        <h1 className="display-5 fw-bold title">Catálogo de Productos</h1>
        <p className="lead text-secondary">
          Encuentra consolas, PCs gamer y accesorios para subir tu nivel.
        </p>

        {/* FILTROS */}
        <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-center gap-3 mt-3">
          {/* FILTRO DE CATEGORIA */}
          <div className="d-flex align-items-center gap-2">
            <label htmlFor="category" className="form-label mb-0">
              Categoría
            </label>
            <select
              name="category"
              id="category"
              className="form-select form-select-sm bg-dark text-white border-secondary"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "Todos" : cat}
                </option>
              ))}
            </select>
          </div>

          {/* FILTRO DE PRECIO MIN Y MAX */}
          <div className="d-flex align-items-center gap-2">
            <label htmlFor="minPrice" className="form-label mb-0">
              Mín
            </label>
            <input
              id="minPrice"
              type="number"
              className="form-control form-control-sm bg-dark text-white border-secondary"
              style={{ width: 110 }}
              value={minPrice}
              min={minPriceProductos}
              max={maxPriceProductos}
              onChange={(e) => {
                const v =
                  e.target.value === ""
                    ? minPriceProductos
                    : Number(e.target.value);
                setMinPrice(v);
              }}
            />

            <label htmlFor="maxPrice" className="form-label mb-0">
              Máx
            </label>
            <input
              id="maxPrice"
              type="number"
              className="form-control form-control-sm bg-dark text-white border-secondary"
              style={{ width: 110 }}
              value={maxPrice}
              min={minPriceProductos}
              max={maxPriceProductos}
              onChange={(e) => {
                const v =
                  e.target.value === ""
                    ? maxPriceProductos
                    : Number(e.target.value);
                setMaxPrice(v);
              }}
            />

            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleReset}
            >
              Restablecer
            </button>
          </div>
        </div>
      </header>

      <main className="container py-5">
        <div className="row g-4">
          {filteredProducts.length === 0 && <p>No hay Productos</p>}

          {filteredProducts.map((product) => (
            <div className="col-md-4" key={product.id}>
              <div className="card bg-dark text-white h-100 shadow-lg border-secondary">
                <Link
                  to={`/products/${product.id}`}
                  className="text-decoration-none"
                >
                  <img
                    src={product.imageSrc}
                    className="card-img-top p-4"
                    alt={product.title}
                  />
                </Link>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="fw-bold text-accent mb-3">
                    {formatCLP(product.price)}
                  </p>

                  <div className="mt-auto d-flex gap-2">
                    <Link
                      to={`/products/${product.id}`}
                      className="btn btn-ghost flex-fill"
                    >
                      Ver detalle
                    </Link>
                    <button
                      className="btn btn-accent flex-fill"
                      type="button"
                      onClick={() => addToCart(product)}
                    >
                      Añadir al carrito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};
