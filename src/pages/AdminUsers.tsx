import { useEffect, useState } from "react";
import { api } from "../api/client";

type User = {
  id: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
};

type CreateUserForm = {
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
};

const emptyCreateForm: CreateUserForm = {
  name: "",
  email: "",
  password: "",
  role: "USER",
};

export const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [createForm, setCreateForm] = useState<CreateUserForm>(emptyCreateForm);
  const [creating, setCreating] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get<User[]>("/admin/users");
      setUsers(res.data);
      setError(null);
    } catch (e) {
      console.error(e);
      setError("No se pudieron cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleChange = async (id: number, newRole: "USER" | "ADMIN") => {
    try {
      setSavingId(id);
      await api.put(`/admin/users/${id}/role`, { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
      );
    } catch (e) {
      console.error(e);
      alert("No se pudo actualizar el rol.");
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;

    try {
      setDeletingId(id);
      await api.delete(`/admin/users/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (e) {
      console.error(e);
      alert("No se pudo eliminar el usuario.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleCreateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCreateForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!createForm.name.trim() || !createForm.email.trim() || !createForm.password.trim()) {
      alert("Nombre, correo y contraseña son obligatorios.");
      return;
    }

    try {
      setCreating(true);
      await api.post("/admin/users", {
        name: createForm.name.trim(),
        email: createForm.email.trim(),
        password: createForm.password,
        role: createForm.role,
      });

      setCreateForm(emptyCreateForm);
      await loadUsers();
    } catch (e: any) {
      console.error(e);
      if (e.response?.status === 409) {
        alert("Ya existe un usuario con ese correo.");
      } else {
        alert("No se pudo crear el usuario.");
      }
    } finally {
      setCreating(false);
    }
  };

  return (
    <main className="container py-5 admin-panel">
      <h1 className="h3 fw-bold text-accent mb-4 admin-card-title">
        Panel de administración – Usuarios
      </h1>

      {/* FORM CREAR USUARIO */}
      <section className="admin-card p-4 rounded-4 mb-4">
        <h2 className="h5 admin-card-title mb-2">Crear nuevo usuario</h2>
        <p className="text-secondary small mb-3">
          Completa los datos para registrar un usuario manualmente. Podrás asignarle rol USER o ADMIN.
        </p>

        <form className="row g-3" onSubmit={handleCreateSubmit}>
          <div className="col-md-3">
            <label htmlFor="name" className="form-label">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control admin-input"
              value={createForm.name}
              onChange={handleCreateChange}
              required
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="email" className="form-label">
              Correo
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control admin-input"
              value={createForm.email}
              onChange={handleCreateChange}
              required
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control admin-input"
              value={createForm.password}
              onChange={handleCreateChange}
              required
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="role" className="form-label">
              Rol
            </label>
            <select
              id="role"
              name="role"
              className="form-select admin-input"
              value={createForm.role}
              onChange={handleCreateChange}
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          <div className="col-12 d-flex gap-2 mt-2">
            <button
              type="submit"
              className="btn btn-admin-primary"
              disabled={creating}
            >
              {creating ? "Creando usuario…" : "Crear usuario"}
            </button>
          </div>
        </form>
      </section>

      {/* TABLA DE USUARIOS */}
      {loading && <p>Cargando usuarios…</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <section className="admin-table-wrapper p-3 rounded-4">
          <h2 className="h5 admin-card-title mb-3">Listado de usuarios</h2>

          <div className="table-responsive">
            <table className="table table-dark admin-table align-middle mb-0">
              <thead>
                <tr>
                  <th style={{ width: 60 }}>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th style={{ width: 130 }}>Rol</th>
                  <th style={{ width: 150 }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center">
                      No hay usuarios.
                    </td>
                  </tr>
                )}

                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <select
                        className="form-select form-select-sm admin-input"
                        value={u.role}
                        disabled={savingId === u.id}
                        onChange={(e) =>
                          handleRoleChange(
                            u.id,
                            e.target.value as "USER" | "ADMIN"
                          )
                        }
                      >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-admin-delete"
                        onClick={() => handleDelete(u.id)}
                        disabled={deletingId === u.id}
                      >
                        {deletingId === u.id ? "Eliminando…" : "Eliminar"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </main>
  );
};
