import { Link } from "react-router-dom"
import { useCart } from "../contexts/CartContext"

export const Navbar = () => {
  const { items } = useCart();
  const totalQty = items.reduce((acc, it) => acc + it.qty, 0);

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary sticky-top">
    <div className="container">
      <Link to={"/"} className="navbar-brand d-flex align-items-center gap-2">
        <img src="/img/iconav.png" alt="Logo" width={100} height={35} className="brand-icon" />
        <span className="logo-text">LEVEL-UP <span className="text-accent">GAMER</span></span>
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navmenu">
        <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
          <li className="nav-item"><Link to={"/"} className="nav-link">Inicio</Link></li>
          <li className="nav-item"><Link to={"/products"} className="nav-link">Catálogo</Link></li>
          <li className="nav-item"><Link to={"/resenas"} className="nav-link">Reseñas</Link></li>
          <li className="nav-item"><Link to={"/contacto"} className="nav-link">Contacto</Link></li>

          <li className="nav-item" id="registerBtn">
            <Link to={"/register"} className="btn btn-sm btn-accent">Registrarse</Link>
          </li>

          <li className="nav-item">
            <Link to="/carrito" className="nav-link position-relative">
              🛒 Carrito
              {totalQty > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger cart-badge"
                  aria-live="polite"
                  aria-label={`Productos en carrito: ${totalQty}`}
                >
                  {totalQty}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    </>
  )
}
