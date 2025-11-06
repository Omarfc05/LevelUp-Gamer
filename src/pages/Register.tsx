import { useRef, useState } from "react"

const allowedEmail = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/
function normalizeRun(v: string){ return v.replace(/\./g,"").replace(/-/g,"").toUpperCase() }
function dvRut(num: number){
  let s = 1, m = 0
  for (; num; num = Math.floor(num/10)) s = (s + num % 10 * (9 - m++ % 6)) % 11
  return s ? String(s - 1) : "K"
}
function isValidRUN(runRaw: string){
  const v = normalizeRun(runRaw)
  if(!/^\d{7,8}[0-9K]$/.test(v)) return false
  const cuerpo = parseInt(v.slice(0, -1), 10)
  const digito = v.slice(-1)
  return dvRut(cuerpo) === digito
}
function isAdult(isoDate?: string){
  if(!isoDate) return true
  const d = new Date(isoDate)
  if(Number.isNaN(d.getTime())) return true
  const today = new Date()
  const eighteen = new Date(d.getFullYear()+18, d.getMonth(), d.getDate())
  return eighteen <= today
}

export const Register = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = formRef.current!
    const f = new FormData(form)

    const run = String(f.get("regRun") || "")
    const nombre = String(f.get("regNombre") || "")
    const apellidos = String(f.get("regApellidos") || "")
    const email = String(f.get("regEmail") || "")
    const fecha = String(f.get("regFechaNac") || "")
    const region = String(f.get("regRegion") || "")
    const comuna = String(f.get("regComuna") || "")
    const direccion = String(f.get("regDireccion") || "")

    const iRun = form.querySelector("#regRun") as HTMLInputElement
    const iNombre = form.querySelector("#regNombre") as HTMLInputElement
    const iApellidos = form.querySelector("#regApellidos") as HTMLInputElement
    const iEmail = form.querySelector("#regEmail") as HTMLInputElement
    const iFecha = form.querySelector("#regFechaNac") as HTMLInputElement
    const iRegion = form.querySelector("#regRegion") as HTMLSelectElement
    const iComuna = form.querySelector("#regComuna") as HTMLSelectElement
    const iDireccion = form.querySelector("#regDireccion") as HTMLInputElement

    iRun.setCustomValidity("")
    iNombre.setCustomValidity("")
    iApellidos.setCustomValidity("")
    iEmail.setCustomValidity("")
    iFecha.setCustomValidity("")
    iRegion.setCustomValidity("")
    iComuna.setCustomValidity("")
    iDireccion.setCustomValidity("")

    if(!isValidRUN(run)) iRun.setCustomValidity("RUN inválido (sin puntos ni guion, con dígito verificador).")
    if(!nombre.trim()) iNombre.setCustomValidity("El nombre es obligatorio.")
    if(!apellidos.trim()) iApellidos.setCustomValidity("Los apellidos son obligatorios.")
    if(!allowedEmail.test(email)) iEmail.setCustomValidity("Correo no permitido. Usa @duoc.cl, @profesor.duoc.cl o @gmail.com.")
    if(fecha && !isAdult(fecha)) iFecha.setCustomValidity("Debes ser mayor de 18 años.")
    if(!region) iRegion.setCustomValidity("Selecciona una región.")
    if(!comuna) iComuna.setCustomValidity("Selecciona una comuna.")
    if(!direccion.trim()) iDireccion.setCustomValidity("Dirección requerida (máx 300).")

    form.classList.add("was-validated")
    const ok = form.checkValidity()
    if(!ok){ form.reportValidity(); return }

    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      alert("Registro enviado correctamente")
      form.reset()
      form.classList.remove("was-validated")
    }, 600)
  }

  return (
     <main className="container py-5" style={{ maxWidth: 720 }}>
    <div className="glass-card p-4 p-md-5 rounded-4 shadow-lg border-neon">
      <header className="text-center mb-4">
        <div className="badge text-bg-dark-subtle border border-secondary-subtle px-3 py-2 mb-2">🎮 LevelUp</div>
        <h1 className="h3 fw-bold text-accent mb-1">Crea tu cuenta</h1>
        <p className="text-secondary mb-0">Únete y suma puntos con tus compras</p>
      </header>

      <form ref={formRef} id="registerForm" noValidate onSubmit={onSubmit}>
        <div className="row g-3">
          <div className="col-md-4">
            <div className="form-floating">
              <input type="text" className="form-control" id="regRun" name="regRun" placeholder="19011022K" minLength={7} maxLength={9} required autoComplete="off" />
              <label htmlFor="regRun">RUN (sin puntos ni guion) *</label>
              <div className="invalid-feedback">Ingresa un RUN válido.</div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-floating">
              <input type="text" className="form-control" id="regNombre" name="regNombre" placeholder="Tu nombre" maxLength={50} required autoComplete="off" />
              <label htmlFor="regNombre">Nombre *</label>
              <div className="invalid-feedback">El nombre es obligatorio.</div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-floating">
              <input type="text" className="form-control" id="regApellidos" name="regApellidos" placeholder="Tus apellidos" maxLength={100} required autoComplete="off" />
              <label htmlFor="regApellidos">Apellidos *</label>
              <div className="invalid-feedback">Los apellidos son obligatorios.</div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="regEmail"
                name="regEmail"
                placeholder="ejemplo@duoc.cl"
                maxLength={100}
                required
                autoComplete="off"
              />
              <label htmlFor="regEmail">Correo *</label>
            </div>
            <div className="form-text mt-1">Permitidos: @duoc.cl, @profesor.duoc.cl, @gmail.com</div>
            <div className="invalid-feedback d-block small mt-1">Ingresa un correo válido con los dominios permitidos.</div>
          </div>

          <div className="col-md-3">
            <div className="form-floating">
              <input type="date" className="form-control" id="regFechaNac" name="regFechaNac" placeholder="1999-01-01" autoComplete="off" />
              <label htmlFor="regFechaNac">Fecha Nacimiento</label>
              <div className="invalid-feedback">Debes ser mayor de 18 años.</div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="form-floating">
              <select id="regTipo" name="regTipo" className="form-select" defaultValue="Cliente">
                <option value="Cliente">Cliente</option>
                <option value="Vendedor">Vendedor</option>
                <option value="Administrador">Administrador</option>
              </select>
              <label htmlFor="regTipo">Tipo de Usuario</label>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-floating">
              <select id="regRegion" name="regRegion" className="form-select" required defaultValue="">
                <option value="" disabled>Selecciona…</option>
                <option value="RM">Región Metropolitana</option>
              </select>
              <label htmlFor="regRegion">Región *</label>
              <div className="invalid-feedback">Selecciona una región.</div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-floating">
              <select id="regComuna" name="regComuna" className="form-select" required defaultValue="">
                <option value="" disabled>Selecciona…</option>
                <option value="Santiago">Santiago</option>
              </select>
              <label htmlFor="regComuna">Comuna *</label>
              <div className="invalid-feedback">Selecciona una comuna.</div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-floating">
              <input type="text" className="form-control" id="regDireccion" name="regDireccion" placeholder="Tu dirección" maxLength={300} required autoComplete="off" />
              <label htmlFor="regDireccion">Dirección *</label>
              <div className="invalid-feedback">Dirección requerida.</div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-floating">
              <input type="text" className="form-control" id="regReferido" name="regReferido" placeholder="USER123" />
              <label htmlFor="regReferido">Código de Referido (opcional)</label>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3 mt-4">
          <div className="form-text m-0">* Debes ser mayor de 18 años para registrarte.</div>
          <div className="ms-auto small text-secondary">Tarda &lt; 1 min.</div>
        </div>

        <button type="submit" className="btn btn-accent w-100 mt-3 py-2" disabled={submitting}>
          {submitting ? "Enviando…" : "Crear cuenta"}
        </button>
        <p className="mt-3 small text-secondary text-center">🎯 Cada referido registrado otorga <strong>50 puntos LevelUp</strong>.</p>
      </form>
    </div>
  </main>
  )
}
