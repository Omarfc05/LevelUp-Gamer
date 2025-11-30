import { useRef, useState } from "react";
import { api } from "../api/client";

const allowedEmail = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

export const Register = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current!;
    const f = new FormData(form);

    const nombre = String(f.get("regNombre") || "");
    const apellidos = String(f.get("regApellidos") || "");
    const email = String(f.get("regEmail") || "");
    const password = String(f.get("regPassword") || "");

    const iNombre = form.querySelector("#regNombre") as HTMLInputElement;
    const iApellidos = form.querySelector("#regApellidos") as HTMLInputElement;
    const iEmail = form.querySelector("#regEmail") as HTMLInputElement;
    const iPassword = form.querySelector("#regPassword") as HTMLInputElement;

    // reset
    iNombre.setCustomValidity("");
    iApellidos.setCustomValidity("");
    iEmail.setCustomValidity("");
    iPassword.setCustomValidity("");

    // VALIDACIONES
    if (!nombre.trim()) iNombre.setCustomValidity("El nombre es obligatorio.");
    if (!apellidos.trim())
      iApellidos.setCustomValidity("Los apellidos son obligatorios.");
    if (!allowedEmail.test(email))
      iEmail.setCustomValidity(
        "Correo no permitido. Usa @duoc.cl, @profesor.duoc.cl o @gmail.com."
      );
    if (password.length < 6)
      iPassword.setCustomValidity("La contraseña debe tener al menos 6 caracteres.");

    form.classList.add("was-validated");
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Aquí llamamos al backend real
    setSubmitting(true);
    try {
      const payload = {
        name: nombre + " " + apellidos,
        email: email.toLowerCase(),
        password,
      };

      await api.post("/auth/register", payload);

      alert("Cuenta creada correctamente 🎉");
      form.reset();
      form.classList.remove("was-validated");
    } catch (err: any) {
      console.error(err);
      alert(
        err?.response?.data ??
          "No se pudo registrar. Intenta nuevamente."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="container py-5" style={{ maxWidth: 720 }}>
      <div className="glass-card p-4 p-md-5 rounded-4 shadow-lg border-neon">
        <header className="text-center mb-4">
          <div className="badge text-bg-dark-subtle px-3 py-2 mb-2">🎮 LevelUp</div>
          <h1 className="h3 fw-bold text-accent">Crea tu cuenta</h1>
        </header>

        <form ref={formRef} noValidate onSubmit={onSubmit}>
          <div className="row g-3">

            {/* NOMBRE */}
            <div className="col-md-6">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="regNombre"
                  name="regNombre"
                  placeholder="Nombre"
                  required
                />
                <label htmlFor="regNombre">Nombre *</label>
              </div>
            </div>

            {/* APELLIDOS */}
            <div className="col-md-6">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="regApellidos"
                  name="regApellidos"
                  placeholder="Apellidos"
                  required
                />
                <label htmlFor="regApellidos">Apellidos *</label>
              </div>
            </div>

            {/* CORREO */}
            <div className="col-md-6">
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="regEmail"
                  name="regEmail"
                  placeholder="ejemplo@duoc.cl"
                  required
                />
                <label htmlFor="regEmail">Correo *</label>
              </div>
              <div className="form-text mt-1">
                Permitidos: @duoc.cl, @profesor.duoc.cl, @gmail.com
              </div>
            </div>

            {/* CONTRASEÑA */}
            <div className="col-md-6">
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="regPassword"
                  name="regPassword"
                  placeholder="******"
                  required
                />
                <label htmlFor="regPassword">Contraseña *</label>
              </div>
              <div className="form-text mt-1">Mínimo 6 caracteres</div>
            </div>

          </div>

          <button
            type="submit"
            className="btn btn-accent w-100 mt-4 py-2"
            disabled={submitting}
          >
            {submitting ? "Enviando…" : "Crear cuenta"}
          </button>
        </form>
      </div>
    </main>
  );
};
