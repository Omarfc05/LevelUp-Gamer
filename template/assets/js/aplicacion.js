// aplicacion.js

// Función para generar un código de referido único
function generarCodigoReferido(nombre, apellidos) {
    const base = (nombre + apellidos).toUpperCase().replace(/\s+/g, '');
    const random = Math.floor(Math.random() * 1000);
    return base + random;
}

// Función para actualizar nivel según puntos
function actualizarNivel(usuario) {
    if (usuario.puntos >= 1000) {
        usuario.nivel = "Leyenda";
    } else if (usuario.puntos >= 500) {
        usuario.nivel = "Pro";
    } else {
        usuario.nivel = "Novato";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");

    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Obtener valores del formulario
        const run = document.getElementById("regRun").value.trim();
        const nombre = document.getElementById("regNombre").value.trim();
        const apellidos = document.getElementById("regApellidos").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const fechaNac = document.getElementById("regFechaNac").value;
        const tipoUsuario = document.getElementById("regTipo").value;
        const region = document.getElementById("regRegion").value;
        const comuna = document.getElementById("regComuna").value;
        const direccion = document.getElementById("regDireccion").value.trim();
        const referido = document.getElementById("regReferido").value.trim();

        // Validar campos requeridos
        const campos = [
            { el: "regRun", val: run },
            { el: "regNombre", val: nombre },
            { el: "regApellidos", val: apellidos },
            { el: "regEmail", val: email },
            { el: "regRegion", val: region },
            { el: "regComuna", val: comuna },
            { el: "regDireccion", val: direccion }
        ];

        let formularioValido = true;
        campos.forEach(campo => {
            const input = document.getElementById(campo.el);
            if (!campo.val || input.classList.contains("is-invalid")) {
                input.classList.add("is-invalid");
                input.classList.remove("is-valid");
                formularioValido = false;
            }
        });

        // Validar edad mínima (18 años)
        if (fechaNac) {
            const edad = calcularEdad(fechaNac);
            if (edad < 18) {
                alert("❌ Debes tener al menos 18 años para registrarte.");
                formularioValido = false;
            }
        }

        if (!formularioValido) {
            alert("❌ Por favor, completa correctamente todos los campos obligatorios.");
            return;
        }

        // Usuarios existentes
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Generar código único
        const codigo = generarCodigoReferido(nombre, apellidos);
        let puntos = 0;
        let referidoPor = null;

        // Si ingresó código de referido
        if (referido) {
            const userReferente = usuarios.find(u => u.codigo === referido);
            if (userReferente) {
                userReferente.puntos = (userReferente.puntos || 0) + 50;
                actualizarNivel(userReferente);
                referidoPor = referido;
                alert(`${userReferente.nombre} ganó 50 puntos LevelUp por referirte 🎉`);
            } else {
                alert("⚠️ El código de referido ingresado no es válido.");
                return;
            }
        }

        // Crear nuevo usuario
        const nuevoUsuario = {
            id: Date.now(),
            run,
            nombre,
            apellidos,
            email,
            fechaNacimiento: fechaNac,
            tipoUsuario,
            region,
            comuna,
            direccion,
            codigo,
            referidoPor,
            puntos,
            nivel: "Novato"
        };

        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert(`✅ Registro exitoso. Tu código de referido es: ${codigo}`);
        form.reset();
        form.querySelectorAll(".is-valid").forEach(el => el.classList.remove("is-valid"));
        window.location.href = "perfil.html"; // Cambia esta URL si tienes otra página de destino
    });
});

// Utilidad para calcular edad
function calcularEdad(fecha) {
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad;
}
