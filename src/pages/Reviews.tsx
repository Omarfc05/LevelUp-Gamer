export const Reviews = () => {
  return (
    <>
    {/* Hero Section */}
<header className="hero container py-5">
  <div className="row align-items-center g-4">
    <div className="col-12 text-center">
      <h1 className="display-5 fw-bold title">Reseñas y Calificaciones</h1>
      <p className="lead text-secondary">Deja tu opinión sobre los productos y ayuda a otros jugadores a elegir mejor.</p>
    </div>
  </div>
</header>

{/* Sección de Reseñas */}
<section className="container py-5">
  <div className="row g-4">
    {/* Formulario de reseña */}
    <div className="col-md-6">
      <div className="card bg-dark border-secondary h-100">
        <div className="card-body">
          <h5 className="card-title">Escribe tu reseña</h5>
          <form id="formResena" noValidate>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input type="text" className="form-control bg-dark text-white border-secondary" id="nombre" placeholder="Tu nombre" required />
            </div>
            <div className="mb-3">
              <label htmlFor="producto" className="form-label">Producto</label>
              <select id="producto" className="form-select bg-dark text-white border-secondary" required defaultValue="">
                <option value="" disabled>Selecciona un producto</option>
                <option value="Catan">Catan</option>
                <option value="Carcassonne">Carcassonne</option>
                <option value="Control Xbox Series X">Control Xbox Series X</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="comentario" className="form-label">Comentario</label>
              <textarea className="form-control bg-dark text-white border-secondary" id="comentario" rows={3} placeholder="Escribe tu reseña..." required></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Calificación</label>
              <select id="puntuacion" className="form-select bg-dark text-white border-secondary" required defaultValue="">
                <option value="" disabled>Selecciona una puntuación</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="2">⭐⭐</option>
                <option value="1">⭐</option>
              </select>
            </div>
            <button type="submit" className="btn btn-accent w-100">Enviar Reseña</button>
          </form>
        </div>
      </div>
    </div>

    {/* Lista de reseñas */}
    <div className="col-md-6">
      <div className="card bg-dark border-secondary h-100">
        <div className="card-body">
          <h5 className="card-title">Reseñas recientes</h5>
          <ul id="listaResenas" className="list-group list-group-flush">
            {/* Las reseñas se agregan aquí con JS */}
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}
