import { Link, useParams } from "react-router-dom"
import { products } from "../data/Products";


export const ProductDetail = () => {
  const {id} = useParams<{ id: string}>();
  const pid = Number(id);
  const product = products.find((p) => p.id === pid);
  return (
    <>
    <div className="container py-5">
    <div className="row g-5 align-items-center">
      
      <div className="col-md-6 text-center">
        <img src={product?.imgSource} className="img-fluid card-img-top" alt="Xbox Series S"/>
      </div>

      
      <div className="col-md-6">
        <h1 className="titulo">{product?.title}</h1>
        <p>
          {product?.description}
        </p>

        <h3 className="fw-bold text-accent mt-4">${product?.price} CLP</h3>

        <div className="mt-4 d-flex gap-3 flex-wrap">
          <button className="btn btn-primary px-4">Agregar al Carrito</button>
          <Link to={"/products"} className="btn btn-ghost flex-fill">Volver al Catálogo</Link>
        </div>
      </div>
    </div>
    <div className="mt-5">
      <h2 className="gris">Características principales</h2>
      <h1> ¡¡ESTOS SON PLACEHOLDERS ANTERIORES!!</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4 mt-3">
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Rendimiento</h5>
              <p className="card-text">Hasta 120 fps en juegos compatibles para una experiencia fluida y competitiva.</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Almacenamiento</h5>
              <p className="card-text">512 GB SSD ultrarrápido que reduce tiempos de carga y mejora el rendimiento general.</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Game Pass</h5>
              <p className="card-text">Acceso inmediato a una amplia biblioteca de juegos con Xbox Game Pass Ultimate.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-5">
      <h2 className="gris">Productos Relacionados</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4 mt-3">
        <div className="col">
          <div className="card h-100">
            <img src="assets/images/seriesX.png" className="card-img-top" alt="Xbox Series X"/>
            <div className="card-body">
              <h5 className="card-title">Xbox Series X</h5>
              <p className="card-text">La consola más poderosa de Xbox, con 1TB SSD y 4K nativo.</p>
              <a href="producto-seriesx.html" className="btn btn-accent">Ver más</a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img src="assets/images/oNmXBUydOnE2RCdFrlptBy1PzPufLskAVHYkbsXw.png" className="card-img-top" alt="Control Xbox"/>
            <div className="card-body">
              <h5 className="card-title">Control Inalámbrico Xbox</h5>
              <p className="card-text">Diseño ergonómico con mejor agarre y latencia reducida.</p>
              <a href="producto-control.html" className="btn btn-accent">Ver más</a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img src="assets/images/gamepass.png" className="card-img-top" alt="Game Pass"/>
            <div className="card-body">
              <h5 className="card-title">Xbox Game Pass</h5>
              <p className="card-text">Suscripción mensual con acceso a cientos de juegos.</p>
              <a href="producto-gamepass.html" className="btn btn-accent">Ver más</a>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
    </>
  )
}
