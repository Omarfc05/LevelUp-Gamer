export const Register = () => {
  return (
     <main className="container py-5" style={{ maxWidth: 720 }}>
    <div className="glass-card p-4 p-md-5 rounded-4 shadow-lg border-neon">
      <header className="text-center mb-4">
        <div className="badge text-bg-dark-subtle border border-secondary-subtle px-3 py-2 mb-2">🎮 LevelUp</div>
        <h1 className="h3 fw-bold text-accent mb-1">Crea tu cuenta</h1>
        <p className="text-secondary mb-0">Únete y suma puntos con tus compras</p>
      </header>

      <form id="registerForm" noValidate>
        <div className="row g-3">

          <div className="col-md-4">
            <div className="form-floating">
              <input type="text" className="form-control" id="regRun"
                     placeholder="19011022K" minLength={7} maxLength={9} required autoComplete="off" />
              <label htmlFor="regRun">RUN (sin puntos ni guion) *</label>
            </div>
            <div className="invalid-feedback d-block small mt-1">Ingresa un RUN válido sin puntos ni guion.</div>
          </div>

          <div className="col-md-4">
            <div className="form-floating">
              <input type="text" className="form-control" id="regNombre"
                     placeholder="Tu nombre" maxLength={50} required autoComplete="off" />
              <label htmlFor="regNombre">Nombre *</label>
            </div>
            <div className="invalid-feedback d-block small mt-1">El nombre es obligatorio.</div>
          </div>

          <div className="col-md-4">
            <div className="form-floating">
              <input type="text" className="form-control" id="regApellidos"
                     placeholder="Tus apellidos" maxLength={100} required autoComplete="off" />
              <label htmlFor="regApellidos">Apellidos *</label>
            </div>
            <div className="invalid-feedback d-block small mt-1">Los apellidos son obligatorios.</div>
          </div>

          <div className="col-md-6">
            <div className="form-floating">
              <input type="email" className="form-control" id="regEmail"
                     placeholder="ejemplo@duoc.cl" maxLength={100} required autoComplete="off"
                     pattern="^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$" />
              <label htmlFor="regEmail">Correo *</label>
            </div>
            <div className="form-text mt-1">Permitidos: @duoc.cl, @profesor.duoc.cl, @gmail.com</div>
            <div className="invalid-feedback d-block small mt-1">Por favor ingresa un correo válido con los dominios permitidos.</div>
          </div>

          <div className="col-md-3">
            <div className="form-floating">
              <input type="date" className="form-control" id="regFechaNac" placeholder="1999-01-01" autoComplete="off" />
              <label htmlFor="regFechaNac">Fecha Nacimiento</label>
            </div>
          </div>

          <div className="col-md-3">
            <div className="form-floating">
              <select id="regTipo" className="form-select" defaultValue="Cliente">
                <option value="Cliente">Cliente</option>
                <option value="Vendedor">Vendedor</option>
                <option value="Administrador">Administrador</option>
              </select>
              <label htmlFor="regTipo">Tipo de Usuario</label>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-floating">
              <select id="regRegion" className="form-select" required>
                <option value="">Selecciona...</option>
              </select>
              <label htmlFor="regRegion">Región *</label>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-floating">
              <select id="regComuna" className="form-select" required>
                <option value="">Selecciona...</option>
              </select>
              <label htmlFor="regComuna">Comuna *</label>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-floating">
              <input type="text" className="form-control" id="regDireccion"
                     placeholder="Tu dirección" maxLength={300} required autoComplete="off" />
              <label htmlFor="regDireccion">Dirección *</label>
            </div>
            <div className="invalid-feedback d-block small mt-1">Dirección requerida (máx 300).</div>
          </div>

          <div className="col-md-6">
            <div className="form-floating">
              <input type="text" className="form-control" id="regReferido" placeholder="USER123" />
              <label htmlFor="regReferido">Código de Referido (opcional)</label>
            </div>
          </div>

        </div>

        <div className="d-flex align-items-center gap-3 mt-4">
          <div className="form-text m-0">* Debes ser mayor de 18 años para registrarte.</div>
          <div className="ms-auto small text-secondary">Tarda &lt; 1 min.</div>
        </div>

        <button type="submit" className="btn btn-accent w-100 mt-3 py-2">Crear cuenta</button>
        <p className="mt-3 small text-secondary text-center">🎯 Cada referido registrado otorga <strong>50 puntos LevelUp</strong>.</p>
      </form>
    </div>
  </main>
  )
}
