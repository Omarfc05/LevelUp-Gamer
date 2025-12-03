import { Link } from "react-router-dom";

export const Forbidden = () => {
  return (
    <main className="container py-5">
      <div className="text-center py-5">
        <h1 className="display-6 fw-bold text-accent">403 — Acceso denegado</h1>
        <p className="lead text-secondary mb-4">
          No tienes permisos para acceder a esta sección. Si crees que esto es un error,
          inicia sesión con una cuenta con privilegios de administrador.
        </p>

        <div className="d-flex justify-content-center gap-2">
          <Link to="/" className="btn btn-ghost">Volver a la tienda</Link>
          <Link to="/login" className="btn btn-accent">Iniciar sesión</Link>
        </div>

        <div className="mt-4 text-muted small">
          Si eres admin y sigues viendo esto, revisa tu rol en la base de datos o vuelve a iniciar sesión.
        </div>
      </div>
    </main>
  );
};
