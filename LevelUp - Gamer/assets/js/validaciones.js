// ✅ Validación de correo con dominios permitidos y longitud máxima
const emailValido = (email) => {
  if (!email) return false;
  // formato general correo
  const formato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formato.test(email)) return false;
  // dominios permitidos
  const okDomain = /@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(email);
  return okDomain && email.length <= 100;
};

// ✅ Validación de contraseña segura
const passValida = (pass) => {
  if (!pass) return false;
  // entre 4 y 10 caracteres, al menos una letra y un número
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,10}$/.test(pass);
};

// ✅ Validación de RUN chileno (RUT) con módulo 11
function validarRUN(run) {
  const limpio = (run || "").toUpperCase().replace(/[^0-9K]/g, "");
  if (limpio.length < 7 || limpio.length > 9) return false;

  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);

  let suma = 0, m = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * m;
    m = m === 7 ? 2 : m + 1;
  }

  const res = 11 - (suma % 11);
  const dvCalc = res === 11 ? "0" : res === 10 ? "K" : String(res);

  return dv === dvCalc;
}

// ✅ Validación de texto genérica (mín y máx caracteres)
function textoValido(valor, min, max) {
  if (!valor) return false;
  const limpio = valor.trim();
  return limpio.length >= min && limpio.length <= max;
}

// ✅ Validación de fecha mayor de 18 años
function mayorDeEdad(fechaStr) {
  if (!fechaStr) return false;
  const fecha = new Date(fechaStr);
  if (isNaN(fecha)) return false;
  const edad = Math.floor((Date.now() - fecha.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
  return edad >= 18;
}

// ✅ Validación de dirección (mín 5, máx 300 caracteres)
function direccionValida(dir) {
  return textoValido(dir, 5, 300);
}

// ✅ Validación de región y comuna
function seleccionValida(valor) {
  return !!valor && valor.trim() !== "";
}

// ========================================
// 🚀 LÓGICA PRINCIPAL
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const reg = document.getElementById("registerForm");
  if (reg) {
    fillRegionesComunas("regRegion", "regComuna");

    reg.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;

      // Limpiar mensajes previos
      const mensajes = reg.querySelectorAll(".invalid-feedback, .form-text");
      mensajes.forEach(m => {
        if(m.classList.contains('form-text')) return; // conservar textos tipo ayuda
        m.textContent = "";
      });

      const run = document.getElementById("regRun");
      if (!run.value.trim()) {
        ok = false;
        run.nextElementSibling.nextElementSibling.textContent = "Completa este campo.";
      } else if (!validarRUN(run.value)) {
        ok = false;
        run.nextElementSibling.nextElementSibling.textContent = "RUN inválido (sin puntos ni guion).";
      }

      const nom = document.getElementById("regNombre");
      if (!nom.value.trim()) {
        ok = false;
        nom.nextElementSibling.textContent = "Completa este campo.";
      } else if (!textoValido(nom.value, 1, 50)) {
        ok = false;
        nom.nextElementSibling.textContent = "Nombre requerido (máx 50).";
      }

      const ape = document.getElementById("regApellidos");
      if (!ape.value.trim()) {
        ok = false;
        ape.nextElementSibling.textContent = "Completa este campo.";
      } else if (!textoValido(ape.value, 1, 100)) {
        ok = false;
        ape.nextElementSibling.textContent = "Apellidos requeridos (máx 100).";
      }

      const email = document.getElementById("regEmail");
      if (!email.value.trim()) {
        ok = false;
        email.nextElementSibling.nextElementSibling.textContent = "Completa este campo.";
      } else if (!emailValido(email.value)) {
        ok = false;
        email.nextElementSibling.nextElementSibling.textContent = "Correo no permitido o muy largo.";
      }

      const f = document.getElementById("regFechaNac");
      if (!f.value.trim()) {
        ok = false;
        f.nextElementSibling.textContent = "Completa este campo.";
      } else if (!mayorDeEdad(f.value)) {
        ok = false;
        f.nextElementSibling.textContent = "Debes ser mayor de 18.";
      }

      const region = document.getElementById("regRegion");
      if (!region.value.trim()) {
        ok = false;
        region.nextElementSibling.textContent = "Completa este campo.";
      }

      const comuna = document.getElementById("regComuna");
      if (!comuna.value.trim()) {
        ok = false;
        comuna.nextElementSibling.textContent = "Completa este campo.";
      }

      const dir = document.getElementById("regDireccion");
      if (!dir.value.trim()) {
        ok = false;
        dir.nextElementSibling.textContent = "Completa este campo.";
      } else if (!direccionValida(dir.value)) {
        ok = false;
        dir.nextElementSibling.textContent = "Dirección requerida (máx 300).";
      }

      if (ok) {
        localStorage.setItem("correoUsuario", email.value);
        localStorage.setItem("tipoUsuario", document.getElementById("regTipo").value);
        alert("Registro exitoso.");
        location.href = "index.html";
      }
    });
  }

  // LOGIN
  const log = document.getElementById("loginForm");
  if (log) {
    log.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      const email = document.getElementById("loginEmail");
      const pass = document.getElementById("loginPassword");

      if (!emailValido(email.value)) {
        ok = false;
        email.nextElementSibling.nextElementSibling.textContent = "Correo inválido.";
      }
      if (!passValida(pass.value)) {
        ok = false;
        pass.nextElementSibling.textContent = "Contraseña 4-10 caracteres, debe incluir letras y números.";
      }

      if (ok) {
        localStorage.setItem("correoUsuario", email.value);
        localStorage.setItem("tipoUsuario", "Cliente");
        alert("Sesión iniciada.");
        location.href = "index.html";
      }
    });
  }

  // CONTACTO
  const contact = document.getElementById("contactForm");
  if (contact) {
    contact.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;

      const nom = document.getElementById("contactNombre");
      if (!textoValido(nom.value, 1, 100)) {
        ok = false;
        nom.nextElementSibling.textContent = "Nombre requerido (máx 100).";
      }

      const cor = document.getElementById("contactCorreo");
      if (cor.value && !emailValido(cor.value)) {
        ok = false;
        cor.nextElementSibling.nextElementSibling.textContent = "Correo inválido.";
      }

      const com = document.getElementById("contactComentario");
      if (!textoValido(com.value, 1, 500)) {
        ok = false;
        com.nextElementSibling.textContent = "Comentario requerido (máx 500).";
      }

      if (ok) {
        alert("Mensaje enviado. ¡Gracias!");
        contact.reset();
      }
    });
  }

  // ADMIN regiones/comunas
  if (document.getElementById("usrRegion")) fillRegionesComunas("usrRegion", "usrComuna");
});

// Regiones y comunas mínimas
const REGIONES = [
  { nombre: "Región Metropolitana", comunas: ["Santiago", "Providencia", "Las Condes", "Maipú"] },
  { nombre: "Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué"] },
  { nombre: "Biobío", comunas: ["Concepción", "Talcahuano", "Chiguayante"] },
  { nombre: "Los Ríos", comunas: ["Valdivia", "La Unión", "Panguipulli"] }
];

function fillRegionesComunas(idRegion, idComuna) {
  const r = document.getElementById(idRegion), c = document.getElementById(idComuna);
  if (!r || !c) return;

  r.innerHTML = '<option value="">Seleccione...</option>' + REGIONES.map(x => `<option>${x.nombre}</option>`).join('');
  r.addEventListener("change", () => {
    const found = REGIONES.find(x => x.nombre === r.value);
    c.innerHTML = found ? found.comunas.map(y => `<option>${y}</option>`).join("") : '<option value="">Seleccione...</option>';
  });
  r.dispatchEvent(new Event("change"));
}
