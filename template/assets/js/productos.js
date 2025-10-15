// productos.js

// Lista de productos disponibles
const PRODUCTOS = [
  {
    code: 'ps5',
    name: 'PlayStation 5',
    price: 649990,
    img: 'assets/images/ps5-console-png-ylf-uz1mld99hjkwi474-Photoroom.png'
  },
  {
    code: 'xboxx',
    name: 'Xbox Series X',
    price: 629990,
    img: 'assets/images/Consola-Xbox-Series-S-768x817-Photoroom.png'
  },
  {
    code: 'pcgamer',
    name: 'PC Gamer RGB',
    price: 1199990,
    img: 'assets/images/pngtree-high-performance-gaming-pc-with-rgb-png-image_20010714-Photoroom.png'
  },
  {
    code: 'tecladorgb',
    name: 'Teclado Mecánico RGB',
    price: 89990,
    img: 'assets/images/GK200-Photoroom.png'
  },
  {
    code: 'mousegamer',
    name: 'Mouse Gamer Logitech G Pro',
    price: 69990,
    img: 'assets/images/plasma-hero-carbon-gallery-4-Photoroom.png'
  },
  {
    code: 'auriculares',
    name: 'Auriculares HyperX Cloud II',
    price: 79990,
    img: 'assets/images/png-transparent-kingston-hyperx-cloud-ii-kingston-hyperx-cloud-core-kingston-hyperx-cloud-stinger-headphones-electronics-cloud-playstation-4-thumbnail-Photoroom.png'
  },
  // Productos destacados de la home
  {
    code: 'catan',
    name: 'Catan',
    price: 29990,
    img: 'assets/images/3DBox_CATAN_BaseGame_NE-Photoroom.png'
  },
  {
    code: 'carcassonne',
    name: 'Carcassonne',
    price: 24990,
    img: 'assets/images/cacasonnenoBG.png'
  },
  {
    code: 'controlxbox',
    name: 'Control Xbox Series X',
    price: 59990,
    img: 'assets/images/oNmXBUydOnE2RCdFrlptBy1PzPufLskAVHYkbsXw.png'
  }
];

// Función opcional para mostrar todos los productos (si quieres generar cards dinámicamente)
function mostrarProductos(containerId) {
  const container = document.getElementById(containerId);
  if(!container) return;
  container.innerHTML = PRODUCTOS.map(p => `
    <div class="col-md-4">
      <div class="card h-100 text-center bg-dark text-white shadow-lg border-secondary">
        <img src="${p.img}" class="card-img-top p-4" alt="${p.name}">
        <div class="card-body">
          <h5 class="card-title">${p.name}</h5>
          <p class="fw-bold text-accent">$${p.price.toLocaleString()}</p>
          <button class="btn btn-accent w-100" onclick="agregarAlCarrito('${p.code}')">Añadir al carrito</button>
        </div>
      </div>
    </div>
  `).join('');
}
