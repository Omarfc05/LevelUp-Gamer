import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useCart } from "../contexts/CartContext"

export const Carrito = () => {
  const { items, addToCart, removeOne, removeAll, clearCart, formatCLP } = useCart()
  const [paid, setPaid] = useState(false)
  const navigate = useNavigate()

  const totalAmount = items.reduce((acc, p) => acc + p.price * p.qty, 0)

  const handleFakeCheckout = () => {
    setPaid(true)
    clearCart()
    setTimeout(() => {
      setPaid(false)
      navigate("/carrito")
    }, 1600)
  }

  if (items.length === 0) {
    return (
      <main className="container py-5 text-center">
        <h1 className="display-5 fw-bold title">Carrito</h1>
        <p className="lead text-secondary">Tu carrito está vacío.</p>
        <Link to="/products" className="btn btn-ghost mt-2">Ir al catálogo</Link>
        {paid && (
          <div className="checkout-overlay d-flex align-items-center justify-content-center">
            <div className="checkout-card text-center">
              <div className="checkmark">✓</div>
              <h2 className="h4 mb-2 text-accent">¡Pago realizado!</h2>
              <p className="text-secondary mb-0">Gracias por tu compra</p>
            </div>
          </div>
        )}
      </main>
    )
  }

  return (
    <>
      <main className="container py-5">
        <header className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h1 className="display-6 fw-bold title mb-0">Carrito</h1>
            <small className="text-secondary">Revisa tus productos antes de pagar</small>
          </div>
          <button className="btn btn-ghost text-danger border-danger" onClick={clearCart}>
            Vaciar carrito
          </button>
        </header>

        <section className="row g-4">
          <div className="col-12 col-lg-8">
            <ul className="list-group">
              {items.map((it) => {
                const subtotal = it.price * it.qty
                return (
                  <li
                    key={it.id}
                    className="list-group-item bg-dark text-white border-secondary d-flex align-items-center justify-content-between"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={it.imageSrc}
                        alt={it.title}
                        width={72}
                        height={72}
                        className="object-fit-contain rounded"
                      />
                      <div>
                        <h6 className="mb-1">{it.title}</h6>
                        <small className="text-secondary">{formatCLP(it.price)} c/u</small>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <button className="btn btn-ghost btn-sm qty-btn" onClick={() => removeOne(it.id)}>−</button>
                      <span className="px-2 fw-semibold">{it.qty}</span>
                      <button className="btn btn-accent btn-sm qty-btn" onClick={() => addToCart(it)}>+</button>
                    </div>

                    <div className="text-end" style={{ minWidth: 140 }}>
                      <div className="fw-bold text-accent">{formatCLP(subtotal)}</div>
                      <button className="btn btn-link text-danger p-0 small" onClick={() => removeAll(it.id)}>
                        Eliminar
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          <aside className="col-12 col-lg-4">
            <div className="card bg-dark text-white border-secondary shadow-lg">
              <div className="card-body">
                <h5 className="card-title">Resumen</h5>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Total</span>
                  <span className="fw-bold text-accent">{formatCLP(totalAmount)}</span>
                </div>
                <hr className="border-secondary" />
                <div className="d-grid gap-2">
                  <button className="btn btn-accent py-2" onClick={handleFakeCheckout}>Proceder al pago</button>
                  <Link to="/products" className="btn btn-ghost py-2">Seguir comprando</Link>
                </div>
              </div>
            </div>
          </aside>
        </section>

        {paid && (
          <div className="checkout-overlay d-flex align-items-center justify-content-center">
            <div className="checkout-card text-center">
              <div className="checkmark">✓</div>
              <h2 className="h4 mb-2 text-accent">¡Pago realizado!</h2>
              <p className="text-secondary mb-0">Gracias por tu compra</p>
            </div>
          </div>
        )}
      </main>
    </>
  )
}
