import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { CartProvider } from "./contexts/CartContext"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "./app.css"
import { AuthProvider } from "./contexts/AuthContext"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
  <AuthProvider>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </AuthProvider>
  </StrictMode>
)
