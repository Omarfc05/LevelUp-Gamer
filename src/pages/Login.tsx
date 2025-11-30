import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/"); // manda al home después de iniciar sesión
    } catch (err: any) {
      console.error(err);
      alert("Correo o contraseña incorrectos.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="container py-5" style={{ maxWidth: 480 }}>
      <div className="glass-card p-4 p-md-5 rounded-4 shadow-lg border-neon">
        <header className="text-center mb-4">
          <h1 className="h4 fw-bold text-accent">Iniciar sesión</h1>
          <p className="text-secondary mb-0">
            Ingresa con tu cuenta LevelUp Gamer
          </p>
        </header>

        <form onSubmit={onSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="loginEmail" className="form-label">
              Correo
            </label>
            <input
              id="loginEmail"
              type="email"
              className="form-control"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="loginPassword" className="form-label">
              Contraseña
            </label>
            <input
              id="loginPassword"
              type="password"
              className="form-control"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-accent w-100 mt-2 py-2"
            disabled={submitting}
          >
            {submitting ? "Ingresando…" : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
};
