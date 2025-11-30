import { Link } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import { useAuth } from "../contexts/AuthContext"

export const Navbar = () => {
  const { items } = useCart();
  const totalQty = items.reduce((acc, it) => acc + it.qty, 0);

  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary sticky-top">
      <div className="container">

        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <img src="/img/iconav.png" alt="Logo" width={100} height={35} className="brand-icon" />
          <span className="logo-text">
            LEVEL-UP <span className="text-accent">GAMER</span>
          </span>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navmenu">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">

            {/* LINKS NORMALES */}
            <li className="nav-item"><Link to="/" className="nav-link">Inicio</Link></li>
            <li className="nav-item"><Link to="/products" className="nav-link">Catálogo</Link></li>
            <li className="nav-item"><Link to="/resenas" className="nav-link">Reseñas</Link></li>
            <li className="nav-item"><Link to="/contacto" className="nav-link">Contacto</Link></li>

            {/* ⭐ SOLO ADMIN → PANEL ADMIN */}
            {user && user.role === "ADMIN" && (
              <li className="nav-item">
                <Link to="/admin" className="btn btn-sm btn-warning fw-bold">
                  ⚙ Panel Admin
                </Link>
              </li>
            )}


            {/* ⭐ SI NO ESTÁS LOGEADO */}
            {!user && (
              <>
                <li className="nav-item">
                  <Link to="/login" className="btn btn-sm btn-outline-light">
                    Iniciar sesión
                  </Link>
                </li>

                <li className="nav-item" id="registerBtn">
                  <Link to="/register" className="btn btn-sm btn-accent">
                    Registrarse
                  </Link>
                </li>
              </>
            )}

            {/* ⭐ SI ESTÁS LOGEADO */}
            {user && (
              <>
                <li className="nav-item d-flex align-items-center">
                  <span className="nav-link disabled text-white-50 small">
                    👤 Hola, <strong className="text-accent">{user.name}</strong>
                  </span>
                </li>

                <li className="nav-item">
                  <button
                    onClick={logout}
                    className="btn btn-sm btn-outline-danger"
                    type="button"
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}

            {/* CARRITO */}
            <li className="nav-item">
              <Link to="/carrito" className="nav-link position-relative">
                🛒 Carrito
                {totalQty > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger cart-badge">
                    {totalQty}
                  </span>
                )}
              </Link>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  )
}
