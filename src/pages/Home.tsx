import { Layout } from "../layout/Layout";

export const Home = () => {
  return (
    <> 
    <Layout/>
  <header className="hero container py-5">
    <div className="row align-items-center g-4">
      <div className="col-lg-6">
        <h1 className="display-5 fw-bold title">Sube de nivel tu setup</h1>
        <p className="lead text-secondary">
          Creado por <strong>Cristóbal Jerez Donoso, Omar Filun Cabrera</strong> y el equipo LEVEL-UP GAMER. Consolas, periféricos, PCs y más. Envíos a todo Chile y un programa de fidelización con puntos
          <span className="fw-bold">LevelUp</span>.
        </p>
        <a href="catalogo.html" className="btn btn-accent btn-lg">Ver catálogo</a>
      </div>
      <div className="col-lg-6 text-center">
        <div className="hero-card p-4 rounded-4 shadow-lg">
          
        </div>
      </div>
    </div>
  </header>

  
  <section className="container py-5">
    <h2 className="h3 mb-4">¡ Productos Destacados !</h2>
    <div className="row g-4">
      
      <div className="col-md-4">
        <a href="notfound.html">
        <div className="card h-100 text-center">
          
          <div className="card-body">
            <h5 className="card-title">Catan</h5>
            <p className="card-text">Juego de estrategia clásico. Ideal para 3-4 jugadores.</p>
            <p className="fw-bold">$29.990 CLP</p>
            
          </div>
        </div>
        </a>
      </div>
      
      <div className="col-md-4">
        <div className="card h-100 text-center">
          
          <div className="card-body">
            <h5 className="card-title">Carcassonne</h5>
            <p className="card-text">Juego de fichas medieval fácil de aprender.</p>
            <p className="fw-bold">$24.990 CLP</p>
            
          </div>
        </div>
      </div>
      
      <div className="col-md-4">
        <div className="card h-100 text-center">
          
          <div className="card-body">
            <h5 className="card-title">Control Xbox Series X</h5>
            <p className="card-text">Control inalámbrico con botones mapeables.</p>
            <p className="fw-bold">$59.990 CLP</p>
          
          </div>
        </div>
      </div>
    </div>
  </section>

  <div className="d-flex justify-content-center">
    <a href="catalogo.html" className="btn btn-secondary">Ver Catálogo Completo</a>
  </div>
    
    </>
  );
};
