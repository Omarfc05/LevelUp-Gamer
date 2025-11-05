import { Link } from "react-router-dom"
import { products } from "../data/Products"


export const Products = () => {
  return (
<>
  <header className="container py-5 text-center">
    <h1 className="display-5 fw-bold title">Catálogo de Productos</h1>
    <p className="lead text-secondary">Encuentra consolas, PCs gamer y accesorios para subir tu nivel.</p>
  </header>

  <main className="container py-5">
  <div className="row g-4">
    {products.map((product) => (
      <div className="col-md-4" key={product.id}>
      <div className="card bg-dark text-white h-100 shadow-lg border-secondary">
        <Link to={`/products/${product.id}`} className="text-decoration-none">
          <img src={product.imgSource} className="card-img-top p-4" alt={product.title}/>
        </Link>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">{product.description}</p>
          <p className="fw-bold text-accent mb-3">${product.price}</p>

          <div className="mt-auto d-flex gap-2">
            <Link to={`/products/${product.id}`} className="btn btn-ghost flex-fill">Ver detalle</Link>
            <button className="btn btn-accent flex-fill" type="button">Añadir al carrito</button>
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
