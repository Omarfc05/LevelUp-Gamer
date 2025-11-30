import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import { api } from "../api/client";
import type { Product } from "../contexts/CartContext";

type FormState = {
  id?: number;
  title: string;
  description: string;
  category: string;
  price: string;
  imageSrc: string;
};

const emptyForm: FormState = {
  title: "",
  description: "",
  category: "",
  price: "",
  imageSrc: "",
};

const formatCLP = (value: number) =>
  value.toLocaleString("es-CL", { style: "currency", currency: "CLP" });

export const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);

  const isEditing = form.id !== undefined;

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts(); // usa /api/products público
      setProducts(data);
      setError(null);
    } catch (e) {
      console.error(e);
      setError("No se pudieron cargar los productos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (p: Product) => {
    setForm({
      id: p.id,
      title: p.title,
      description: p.description ?? "",
      category: p.category ?? "",
      price: String(p.price),
      imageSrc: p.imageSrc,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setForm(emptyForm);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim() || !form.price.trim()) {
      alert("Título y precio son obligatorios.");
      return;
    }

    const priceNum = Number(form.price);
    if (Number.isNaN(priceNum) || priceNum <= 0) {
      alert("Precio inválido.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category.trim(),
      price: priceNum,
      imageSrc: form.imageSrc.trim(),
    };

    try {
      setSaving(true);

      if (isEditing && form.id !== undefined) {
        await api.put(`/admin/products/${form.id}`, payload);
      } else {
        await api.post("/admin/products", payload);
      }

      await loadProducts();
      setForm(emptyForm);
    } catch (e) {
      console.error(e);
      alert("No se pudo guardar el producto.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;

    try {
      setDeletingId(id);
      await api.delete(`/admin/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      console.error(e);
      alert("No se pudo eliminar el producto.");
    } finally {
      setDeletingId(null);
    }
  };

    return (
    <main className="container py-5 admin-panel">
      <h1 className="h3 fw-bold text-accent mb-4 admin-card-title">
        Panel de administración – Productos
      </h1>

      {/* FORMULARIO CREAR / EDITAR */}
      <section className="admin-card p-4 rounded-4 mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h5 mb-1 admin-card-title">
              {isEditing ? "Editar producto" : "Crear nuevo producto"}
            </h2>
            <p className="text-secondary small mb-0">
              {isEditing
                ? `Estás editando el producto #${form.id}. Guarda o cancela para volver al modo creación.`
                : "Completa los campos para agregar un nuevo producto al catálogo."}
            </p>
          </div>
          {isEditing && (
            <span className="badge badge-editing">
              Modo edición
            </span>
          )}
        </div>

        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-3">
            <label className="form-label" htmlFor="title">
              Título
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="form-control admin-input"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label" htmlFor="category">
              Categoría
            </label>
            <input
              id="category"
              name="category"
              type="text"
              className="form-control admin-input"
              placeholder="Consolas, PCs, etc."
              value={form.category}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2">
            <label className="form-label" htmlFor="price">
              Precio
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min={0}
              className="form-control admin-input"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label" htmlFor="imageSrc">
              URL imagen
            </label>
            <input
              id="imageSrc"
              name="imageSrc"
              type="text"
              className="form-control admin-input"
              placeholder="/img/xboxseriess.png"
              value={form.imageSrc}
              onChange={handleChange}
            />
          </div>

          <div className="col-12">
            <label className="form-label" htmlFor="description">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              className="form-control admin-textarea"
              rows={2}
              value={form.description}
              onChange={handleChange}
              placeholder="Descripción breve del producto (opcional)."
            />
          </div>

          <div className="col-12 d-flex flex-wrap gap-2 mt-2">
            <button
              type="submit"
              className="btn btn-admin-primary"
              disabled={saving}
            >
              {saving
                ? isEditing
                  ? "Guardando cambios…"
                  : "Creando…"
                : isEditing
                ? "Guardar cambios"
                : "Crear producto"}
            </button>

            {isEditing && (
              <button
                type="button"
                className="btn btn-admin-ghost"
                onClick={handleCancelEdit}
              >
                Cancelar edición
              </button>
            )}
          </div>
        </form>
      </section>

      {/* TABLA DE PRODUCTOS */}
      {loading && <p>Cargando productos…</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <section className="admin-table-wrapper p-3 rounded-4 mt-3">
          <h2 className="h5 mb-3 admin-card-title">Listado de productos</h2>

          <div className="table-responsive">
            <table className="table table-dark admin-table align-middle mb-0">
              <thead>
                <tr>
                  <th style={{ width: 60 }}>ID</th>
                  <th>Título</th>
                  <th style={{ width: 140 }}>Categoría</th>
                  <th style={{ width: 140 }}>Precio</th>
                  <th style={{ width: 90 }}>Imagen</th>
                  <th style={{ width: 190 }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center">
                      No hay productos.
                    </td>
                  </tr>
                )}

                {products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.title}</td>
                    <td>{p.category}</td>
                    <td>{formatCLP(p.price)}</td>
                    <td>
                      {p.imageSrc ? (
                        <img
                          src={p.imageSrc}
                          alt={p.title}
                          style={{
                            width: 50,
                            height: 40,
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        <span className="text-secondary small">Sin imagen</span>
                      )}
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-admin-edit"
                          onClick={() => handleEditClick(p)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="btn btn-admin-delete"
                          onClick={() => handleDelete(p.id)}
                          disabled={deletingId === p.id}
                        >
                          {deletingId === p.id ? "Eliminando…" : "Eliminar"}
                        </button>
                      </div>
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
}