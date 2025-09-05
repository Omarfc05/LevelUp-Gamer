const emailValido = (email) => {
  const okDomain = /@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(email);
  return okDomain && email.length<=100;
};

// Validación de RUN chileno (RUT) sin puntos ni guion, con dígito verificador (módulo 11)
function validarRUN(run){
  const limpio = (run||'').toUpperCase().replace(/[^0-9K]/g,'');
  if(limpio.length<7 || limpio.length>9) return false;
  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);
  let suma=0, m=2;
  for(let i=cuerpo.length-1;i>=0;i--){
    suma += parseInt(cuerpo[i]) * m;
    m = m===7 ? 2 : m+1;
  }
  const res = 11 - (suma % 11);
  const dvCalc = res===11 ? '0' : res===10 ? 'K' : String(res);
  return dv === dvCalc;
}

// REGISTRO (mayor de 18, dominios válidos, etc.)
document.addEventListener('DOMContentLoaded', ()=>{
  const reg = document.getElementById('registerForm');
  if(reg){
    // Regiones/comunas
    fillRegionesComunas('regRegion','regComuna');
    reg.addEventListener('submit', (e)=>{
      e.preventDefault();
      let ok = true;

      const run = document.getElementById('regRun');
      if(!validarRUN(run.value)){ ok=false; run.nextElementSibling.nextElementSibling.textContent='RUN inválido (sin puntos ni guion).'; }

      const nom = document.getElementById('regNombre');
      if(!nom.value.trim() || nom.value.length>50){ ok=false; nom.nextElementSibling.textContent='Nombre requerido (máx 50).'; }

      const ape = document.getElementById('regApellidos');
      if(!ape.value.trim() || ape.value.length>100){ ok=false; ape.nextElementSibling.textContent='Apellidos requeridos (máx 100).'; }

      const email = document.getElementById('regEmail');
      if(!emailValido(email.value)){ ok=false; email.nextElementSibling.nextElementSibling.textContent='Correo no permitido o muy largo.'; }

      // Mayor de 18 (si hay fecha)
      const f = document.getElementById('regFechaNac').value;
      if(f){
        const edad = Math.floor((Date.now() - new Date(f).getTime())/ (365.25*24*60*60*1000));
        if(edad < 18){ ok=false; document.getElementById('regFechaNac').nextElementSibling.textContent='Debes ser mayor de 18.'; }
      }

      const region = document.getElementById('regRegion');
      const comuna = document.getElementById('regComuna');
      const dir = document.getElementById('regDireccion');
      if(!region.value){ ok=false; region.nextElementSibling.textContent='Selecciona región.'; }
      if(!comuna.value){ ok=false; comuna.nextElementSibling.textContent='Selecciona comuna.'; }
      if(!dir.value.trim() || dir.value.length>300){ ok=false; dir.nextElementSibling.textContent='Dirección requerida (máx 300).'; }

      if(ok){
        localStorage.setItem('correoUsuario', email.value);
        localStorage.setItem('tipoUsuario', document.getElementById('regTipo').value);
        alert('Registro exitoso.');
        location.href='index.html';
      }
    });
  }

  // LOGIN
  const log = document.getElementById('loginForm');
  if(log){
    log.addEventListener('submit', (e)=>{
      e.preventDefault();
      let ok = true;
      const email = document.getElementById('loginEmail');
      const pass = document.getElementById('loginPassword');
      if(!emailValido(email.value)){ ok=false; email.nextElementSibling.nextElementSibling.textContent='Correo inválido.'; }
      if(pass.value.length<4 || pass.value.length>10){ ok=false; pass.nextElementSibling.textContent='Contraseña 4 a 10 caracteres.'; }
      if(ok){
        localStorage.setItem('correoUsuario', email.value);
        localStorage.setItem('tipoUsuario', 'Cliente');
        alert('Sesión iniciada.');
        location.href='index.html';
      }
    });
  }

  // CONTACTO
  const contact = document.getElementById('contactForm');
  if(contact){
    contact.addEventListener('submit', (e)=>{
      e.preventDefault();
      let ok = true;
      const nom = document.getElementById('contactNombre');
      if(!nom.value.trim() || nom.value.length>100){ ok=false; nom.nextElementSibling.textContent='Nombre requerido (máx 100).'; }
      const cor = document.getElementById('contactCorreo');
      if(cor.value && !emailValido(cor.value)){ ok=false; cor.nextElementSibling.nextElementSibling.textContent='Correo inválido.'; }
      const com = document.getElementById('contactComentario');
      if(!com.value.trim() || com.value.length>500){ ok=false; com.nextElementSibling.textContent='Comentario requerido (máx 500).'; }
      if(ok){ alert('Mensaje enviado. ¡Gracias!'); contact.reset(); }
    });
  }

  // ADMIN - selects regiones/comunas
  if(document.getElementById('usrRegion')) fillRegionesComunas('usrRegion','usrComuna');
});

// Regiones y comunas mínimas (puede ampliarse).
const REGIONES = [
  {nombre:'Región Metropolitana', comunas:['Santiago','Providencia','Las Condes','Maipú']},
  {nombre:'Valparaíso', comunas:['Valparaíso','Viña del Mar','Quilpué']},
  {nombre:'Biobío', comunas:['Concepción','Talcahuano','Chiguayante']},
  {nombre:'Los Ríos', comunas:['Valdivia','La Unión','Panguipulli']}
];

function fillRegionesComunas(idRegion,idComuna){
  const r = document.getElementById(idRegion), c = document.getElementById(idComuna);
  if(!r||!c) return;
  r.innerHTML = '<option value="">Seleccione...</option>' + REGIONES.map(x=>`<option>${x.nombre}</option>`).join('');
  r.addEventListener('change', ()=>{
    const found = REGIONES.find(x=>x.nombre===r.value);
    c.innerHTML = found? found.comunas.map(y=>`<option>${y}</option>`).join('') : '<option value="">Seleccione...</option>';
  });
  r.dispatchEvent(new Event('change'));
}
