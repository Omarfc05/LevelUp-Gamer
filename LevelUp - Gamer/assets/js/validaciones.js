// validaciones.js

document.addEventListener("DOMContentLoaded", () => {
    const run = document.getElementById("regRun");
    const nombre = document.getElementById("regNombre");
    const apellidos = document.getElementById("regApellidos");
    const email = document.getElementById("regEmail");
    const fechaNac = document.getElementById("regFechaNac");
    const region = document.getElementById("regRegion");
    const comuna = document.getElementById("regComuna");
    const direccion = document.getElementById("regDireccion");

    // 🧠 FUNCIONES DE VALIDACIÓN

    const soloLetras = str => /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(str);
    const correoValido = str =>
        /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(str);
    const runValido = run => /^[0-9]{7,8}[0-9Kk]$/.test(run);
    const mayorDe18 = fecha => {
        const hoy = new Date();
        const nac = new Date(fecha);
        let edad = hoy.getFullYear() - nac.getFullYear();
        const m = hoy.getMonth() - nac.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--;
        return edad >= 18;
    };

    // ✍️ EVENT LISTENERS

    run.addEventListener("input", () => {
        validarCampo(run, runValido(run.value.trim()));
    });

    nombre.addEventListener("input", () => {
        validarCampo(nombre, soloLetras(nombre.value.trim()) && nombre.value.trim().length <= 50);
    });

    apellidos.addEventListener("input", () => {
        validarCampo(apellidos, soloLetras(apellidos.value.trim()) && apellidos.value.trim().length <= 100);
    });

    email.addEventListener("input", () => {
        validarCampo(email, correoValido(email.value.trim()));
    });

    fechaNac.addEventListener("change", () => {
        if (!fechaNac.value) return;
        validarCampo(fechaNac, mayorDe18(fechaNac.value));
    });

    region.addEventListener("change", () => {
        validarCampo(region, region.value !== "");
    });

    comuna.addEventListener("change", () => {
        validarCampo(comuna, comuna.value !== "");
    });

    direccion.addEventListener("input", () => {
        validarCampo(direccion, direccion.value.trim().length > 0 && direccion.value.trim().length <= 300);
    });

    // ✅ FUNCIÓN REUTILIZABLE PARA VALIDAR
    function validarCampo(input, condicion) {
        if (condicion) {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
        } else {
            input.classList.add("is-invalid");
            input.classList.remove("is-valid");
        }
    }
});
