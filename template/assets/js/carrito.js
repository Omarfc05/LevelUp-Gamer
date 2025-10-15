// Definición de productos
const PRODUCTOS = [
  { code: 'PS5', name: 'PlayStation 5', price: 649990 },
  { code: 'XBOXX', name: 'Xbox Series X', price: 629990 },
  { code: 'PC1', name: 'PC Gamer RGB', price: 1199990 },
  { code: 'KB1', name: 'Teclado Mecánico RGB', price: 89990 },
  { code: 'MOUSE1', name: 'Mouse Gamer Logitech G Pro', price: 69990 },
  { code: 'HEAD1', name: 'Auriculares HyperX Cloud II', price: 79990 }
];

// Formato CLP
function clp(n) {
  return `$${n.toLocaleString('es-CL')}`;
}

// Helpers de carrito
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}
function guardarCarrito(c) {
  localStorage.setItem('cart', JSON.stringify(c));
  actualizarContadorCarrito();
  mostrarCarrito();
}

// Agregar producto
function agregarAlCarrito(code) {
  const p = PRODUCTOS.find(x => x.code === code);
  if (!p) return;
  const cart = obtenerCarrito();
  const item = cart.find(i => i.code === code);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({ code, qty: 1 });
  }
  guardarCarrito(cart);
  alert(`${p.name} añadido al carrito.`);
}

// Quitar producto
function quitarDelCarrito(code) {
  const nuevoCarrito = obtenerCarrito().filter(i => i.code !== code);
  guardarCarrito(nuevoCarrito);
}

// Cambiar cantidad
function cambiarCantidad(code, qty) {
  qty = parseInt(qty) || 1;
  const cart = obtenerCarrito().map(i =>
    i.code === code ? { ...i, qty: Math.max(1, qty) } : i
  );
  guardarCarrito(cart);
}

// Mostrar carrito en tabla
function mostrarCarrito() {
  const tbody = document.getElementById('cuerpoCarrito');
  if (!tbody) return;

  const cart = obtenerCarrito();
  if (cart.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="5" class="text-center text-secondary">Tu carrito está vacío.</td></tr>';
    document.getElementById('totalCarrito').textContent = clp(0);
    document.getElementById('mensajeDescuento').textContent = '';
    return;
  }

  let total = 0;
  tbody.innerHTML = cart
    .map(i => {
      const p = PRODUCTOS.find(x => x.code === i.code);
      if (!p) return ''; // Evita error si no existe el producto
      const sub = p.price * i.qty;
      total += sub;
      return `<tr>
        <td>${p.name}</td>
        <td>${clp(p.price)}</td>
        <td style="max-width:120px">
          <input type="number" min="1" value="${i.qty}" 
                 class="form-control"
                 onchange="cambiarCantidad('${i.code}', this.value)">
        </td>
        <td>${clp(sub)}</td>
        <td>
          <button class="btn btn-sm btn-outline-danger" 
                  onclick="quitarDelCarrito('${i.code}')">
            Quitar
          </button>
        </td>
      </tr>`;
    })
    .join('');

  // Aplicar descuento si corresponde
  const email = (localStorage.getItem('correoUsuario') || '').toLowerCase();
  let discount = 0;
  if (email.endsWith('@duoc.cl') || email.endsWith('@profesor.duoc.cl')) {
    discount = total * 0.2; // 20% descuento
    document.getElementById('mensajeDescuento').textContent =
      `Descuento DUOC aplicado (-${clp(discount)})`;
  } else {
    document.getElementById('mensajeDescuento').textContent = '';
  }

  document.getElementById('totalCarrito').textContent = clp(total - discount);
}

// Actualizar contador de carrito (total de unidades)
function actualizarContadorCarrito() {
  const contador = document.getElementById('cartCounter');
  if (contador) {
    const totalUnidades = obtenerCarrito().reduce((acc, i) => acc + i.qty, 0);
    contador.textContent = totalUnidades;
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  actualizarContadorCarrito();
  mostrarCarrito();

  const btn = document.getElementById('btnCheckout');
  if (btn) {
    btn.addEventListener('click', () => {
      if (obtenerCarrito().length === 0)
        return alert('Agrega productos antes.');
      alert('Gracias por tu compra (demo).');
      localStorage.removeItem('cart');
      mostrarCarrito();
      actualizarContadorCarrito();
    });
  }
});
