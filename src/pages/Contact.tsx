import { Link } from "react-router-dom"

export const Contact = () => {
  return (
    <>
    {/* Hero Section */}
<header className="hero container py-5 text-center">
  <h1 className="display-5 fw-bold title">Contacto LEVEL-UP GAMER</h1>
  <p className="lead text-secondary">Escríbenos tus dudas, comentarios o sugerencias. Nuestro equipo responderá a la brevedad.</p>
</header>

{/* Formulario de contacto */}
<main className="container py-5" style={{ maxWidth: 720 }}>
  <div className="card bg-dark border-secondary p-4">
    <form id="contactForm" noValidate>
      <div className="mb-3">
        <label htmlFor="contactNombre" className="form-label">Nombre <span className="text-danger">*</span></label>
        <input type="text" className="form-control" id="contactNombre" name="contactNombre" maxLength={100} placeholder="Tu nombre completo" required autoComplete="off" />
        <div className="invalid-feedback">Por favor ingresa tu nombre.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="contactCorreo" className="form-label">Correo <span className="text-danger">*</span></label>
        <input
          type="email"
          className="form-control"
          id="contactCorreo"
          name="contactCorreo"
          maxLength={100}
          placeholder="tu@email.com"
          required
          pattern="^[a-zA-Z0-9._%+-]+@(duoc\\.cl|profesor\\.duoc\\.cl|gmail\\.com)$"
          autoComplete="off"
        />
        <div className="form-text">Solo correos @duoc.cl, @profesor.duoc.cl o @gmail.com</div>
        <div className="invalid-feedback">Por favor ingresa un correo válido con los dominios permitidos.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="contactComentario" className="form-label">Comentario <span className="text-danger">*</span></label>
        <textarea className="form-control" id="contactComentario" name="contactComentario" rows={4} maxLength={500} placeholder="Escribe tu mensaje aquí..." required></textarea>
        <div className="invalid-feedback">El comentario es obligatorio.</div>
      </div>
      <button type="submit" className="btn btn-accent w-100">Enviar</button>
    </form>

    {/* Botón a Reseñas */}
    <div className="mt-4 text-center">
      <Link to="/resenas" className="btn btn-primary">Ver Reseñas</Link>
    </div>
  </div>
</main>
    </>
  )
}
