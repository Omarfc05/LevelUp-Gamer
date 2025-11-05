import { Link } from "react-router-dom"
import { useState } from "react"
import { products } from "../data/products"
import { useCart } from "../contexts/CartContext"


export const Products = () => {
  const { addToCart, formatCLP } = useCart();

  const categories = ["all", ...new Set(products.map((p) => p.category))];
  const prices = products.map((p) => p.price);

  const minPriceProductos = Math.min(...prices);
  const maxPriceProductos = Math.max(...prices);

  const [minPrice, setMinPrice] = useState(minPriceProductos);
  const [maxPrice, setMaxPrice] = useState(maxPriceProductos);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = products.filter((p) => (
    (selectedCategory === "all" || p.category === selectedCategory) &&
    p.price >= minPrice &&
    p.price <= maxPrice
  ));

  const handleReset = () => {
    setSelectedCategory("all");
    setMinPrice(minPriceProductos);
    setMaxPrice(maxPriceProductos);
  };

  return (
<>
  <header className="container py-5 text-center">
    <h1 className="display-5 fw-bold title">Catálogo de Productos</h1>
    <p className="lead text-secondary">Encuentra consolas, PCs gamer y accesorios para subir tu nivel.</p>

    {/* FILTROS */}
    <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-center gap-3 mt-3">

      {/* FILTRO DE CATEGORIA */}
      <div className="d-flex align-items-center gap-2">
        <label htmlFor="category" className="form-label mb-0">Categoría</label>
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
        <label htmlFor="minPrice" className="form-label mb-0">Mín</label>
        <input
          id="minPrice"
          type="number"
          className="form-control form-control-sm bg-dark text-white border-secondary"
          style={{ width: 110 }}
          value={minPrice}
          min={minPriceProductos}
          max={maxPriceProductos}
          onChange={(e) => {
            const v = e.target.value === "" ? minPriceProductos : Number(e.target.value);
            setMinPrice(v);
          }}
        />

        <label htmlFor="maxPrice" className="form-label mb-0">Máx</label>
        <input
          id="maxPrice"
          type="number"
          className="form-control form-control-sm bg-dark text-white border-secondary"
          style={{ width: 110 }}
          value={maxPrice}
          min={minPriceProductos}
          max={maxPriceProductos}
          onChange={(e) => {
            const v = e.target.value === "" ? maxPriceProductos : Number(e.target.value);
            setMaxPrice(v);
          }}
        />

        <button type="button" className="btn btn-ghost" onClick={handleReset}>
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
        <Link to={`/products/${product.id}`} className="text-decoration-none">
          <img src={product.imgSource} className="card-img-top p-4" alt={product.title}/>
        </Link>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">{product.description}</p>
          <p className="fw-bold text-accent mb-3">{formatCLP(product.price)}</p>

          <div className="mt-auto d-flex gap-2">
            <Link to={`/products/${product.id}`} className="btn btn-ghost flex-fill">Ver detalle</Link>
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
  )
}
