// aplicacion.js

// Función para generar un código de referido único
function generarCodigoReferido() {
    return 'REF-' + Math.random().toString(36).substr(2, 6).toUpperCase();
}

// Registrar un nuevo usuario
document.addEventListener("DOMContentLoaded", () => {
    const formRegistro = document.getElementById("formRegistro");

    if (formRegistro) {
        formRegistro.addEventListener("submit", (e) => {
            e.preventDefault();

            const nombre = document.getElementById("nombre").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const referido = document.getElementById("referido").value.trim();

            let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

            // Generar código de referido único
            const miCodigo = generarCodigoReferido();

            let nuevoUsuario = {
                id: Date.now(),
                nombre,
                email,
                password,
                puntos: 0,
                nivel: "Novato",
                codigo: miCodigo,
                referidoPor: referido || null
            };

            // Si el usuario ingresó un código de referido válido
            if (referido) {
                let usuarioQueRefirio = usuarios.find(u => u.codigo === referido);
                if (usuarioQueRefirio) {
                    usuarioQueRefirio.puntos += 100; // Suma puntos al que refirió
                    actualizarNivel(usuarioQueRefirio);
                    alert(`${usuarioQueRefirio.nombre} ganó 100 puntos LevelUp por referirte 🎉`);
                } else {
                    alert(" Código de referido no válido");
                }
            }

            usuarios.push(nuevoUsuario);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            alert(`✅ Registro exitoso. Tu código de referido es: ${miCodigo}`);
            formRegistro.reset();
        });
    }
});

// Función para actualizar el nivel según los puntos
function actualizarNivel(usuario) {
    if (usuario.puntos >= 1000) {
        usuario.nivel = "Leyenda";
    } else if (usuario.puntos >= 500) {
        usuario.nivel = "Pro";
    } else {
        usuario.nivel = "Novato";
    }
}
