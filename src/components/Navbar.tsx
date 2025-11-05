import { Link } from "react-router"

 
 export const Navbar = () => {
   return (
     <>
     <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary sticky-top">
    <div className="container">
      <Link to={"/"} className="navbar-brand d-flex align-items-center gap-2">
        
        <span className="logo-text">LEVEL-UP <span className="text-accent">GAMER</span></span>
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navmenu">
        <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
          <li className="nav-item"><Link to={"/"} className="nav-link">Inicio</Link></li>
          <li className="nav-item"><Link to={"/products"}className="nav-link">Catálogo</Link></li>
          <li className="nav-item"><a className="nav-link" href="resenas.html">Reseñas</a></li> 
          <li className="nav-item"><a className="nav-link" href="contacto.html">Contacto</a></li>

          
          <li className="nav-item" id="registerBtn">
            <Link to={"/register"} className="btn btn-sm btn-accent">Registrarse</Link>
          </li>

          
          <li className="nav-item dropdown" id="userDropdown">
            <a className="nav-link dropdown-toggle text-accent" href="#" data-bs-toggle="dropdown" aria-expanded="false" id="userName"></a>
            <ul className="dropdown-menu dropdown-menu-dark">
              <li><a className="dropdown-item" href="perfil.html">Perfil</a></li>
              <li><a className="dropdown-item" href="#" id="logoutBtn">Cerrar sesión</a></li>
            </ul>
          </li>

          
          <li className="nav-item">
            <a className="nav-link position-relative" href="carrito.html">
              🛒 Carrito
              <span id="cartCounter" className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">0</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
     </>
   )
 }
 
  