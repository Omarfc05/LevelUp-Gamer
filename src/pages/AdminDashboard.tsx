import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <main className="container py-5 admin-panel">
      <h1 className="h3 fw-bold text-accent mb-3 admin-card-title">
        Panel de administración
      </h1>

      <p className="text-secondary small mb-4">
        {user
          ? `👤 Estás conectado como ${user.name} (${user.role}). Elige una sección para administrar.`
          : "Elige una sección para administrar."}
      </p>

      <div className="row g-4">
        {/* TARJETA: PRODUCTOS */}
        <div className="col-md-6">
          <Link to="/admin/products" className="text-decoration-none">
            <div className="admin-card p-4 h-100">
              <h2 className="h5 admin-card-title mb-2">🧱 Productos</h2>
              <p className="text-secondary small mb-3">
                Crea, edita y elimina productos del catálogo LevelUp Gamer.
              </p>
              <ul className="small text-secondary mb-0">
                <li>Agregar nuevos productos</li>
                <li>Actualizar precios, descripciones e imágenes</li>
                <li>Eliminar productos del catálogo</li>
              </ul>
            </div>
          </Link>
        </div>

        {/* TARJETA: USUARIOS */}
        <div className="col-md-6">
          <Link to="/admin/users" className="text-decoration-none">
            <div className="admin-card p-4 h-100">
              <h2 className="h5 admin-card-title mb-2">👤 Usuarios</h2>
              <p className="text-secondary small mb-3">
                Gestiona cuentas, roles y acceso de los usuarios.
              </p>
              <ul className="small text-secondary mb-0">
                <li>Ver todos los usuarios registrados</li>
                <li>Cambiar rol entre USER / ADMIN</li>
                <li>Eliminar cuentas si es necesario</li>
              </ul>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
};
