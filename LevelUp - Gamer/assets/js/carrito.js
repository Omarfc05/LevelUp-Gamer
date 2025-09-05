function obtenerCarrito(){ return JSON.parse(localStorage.getItem('cart')||'[]'); }
function guardarCarrito(c){ localStorage.setItem('cart', JSON.stringify(c)); actualizarContadorCarrito(); mostrarCarrito(); }

function agregarAlCarrito(code){
  const p = PRODUCTOS.find(x=>x.code===code);
  if(!p) return;
  const cart = obtenerCarrito();
  const item = cart.find(i=>i.code===code);
  if(item) item.qty += 1; else cart.push({code, qty:1});
  guardarCarrito(cart);
  alert('Producto añadido al carrito.');
}

function quitarDelCarrito(code){
  guardarCarrito(obtenerCarrito().filter(i=>i.code!==code));
}

function cambiarCantidad(code, qty){
  qty = parseInt(qty)||1;
  const cart = obtenerCarrito().map(i=> i.code===code? {...i, qty:Math.max(1, qty)}: i );
  guardarCarrito(cart);
}

function mostrarCarrito(){
  const tbody = document.getElementById('cuerpoCarrito');
  if(!tbody) return;
  const cart = obtenerCarrito();
  if(cart.length===0){
    tbody.innerHTML = '<tr><td colspan="5" class="text-center text-secondary">Tu carrito está vacío.</td></tr>';
    document.getElementById('totalCarrito').textContent = clp(0);
    document.getElementById('mensajeDescuento').textContent = '';
    return;
  }
  let total = 0;
  tbody.innerHTML = cart.map(i=>{
    const p = PRODUCTOS.find(x=>x.code===i.code);
    const sub = p.price * i.qty;
    total += sub;
    return `<tr>
      <td>${p.name}</td>
      <td>${clp(p.price)}</td>
      <td style="max-width:120px"><input type="number" min="1" value="${i.qty}" class="form-control" onchange="cambiarCantidad('${i.code}', this.value)"></td>
      <td>${clp(sub)}</td>
      <td><button class="btn btn-sm btn-outline-accent" onclick="quitarDelCarrito('${i.code}')">Quitar</button></td>
    </tr>`;
  }).join('');

  const email = (localStorage.getItem('correoUsuario')||'').toLowerCase();
  let discount = 0;
  if(email.endsWith('@duoc.cl') || email.endsWith('@profesor.duoc.cl')){
    discount = total * 0.2; // 20% de por vida para DUOC
    document.getElementById('mensajeDescuento').textContent = `Descuento DUOC aplicado (-${clp(discount)})`;
  }else{
    document.getElementById('mensajeDescuento').textContent = '';
  }

  document.getElementById('totalCarrito').textContent = clp(total - discount);
}

document.addEventListener('DOMContentLoaded', ()=>{
  const btn = document.getElementById('btnCheckout');
  if(btn){
    btn.addEventListener('click', ()=>{
      if(obtenerCarrito().length===0) return alert('Agrega productos antes.');
      alert('Gracias por tu compra (demo).');
      localStorage.removeItem('cart');
      mostrarCarrito();
      actualizarContadorCarrito();
    });
  }
  mostrarCarrito();
});
