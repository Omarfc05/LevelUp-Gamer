import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css'

import { Route, Routes } from "react-router-dom";
import { Index } from "./pages/Index";
import { Products } from "./pages/Products";
import { Contact } from "./pages/Contact";
import { Layout } from "./layout/Layout";
import { ProductDetail } from "./pages/ProductDetail";



import { NotFound } from "./pages/NotFound";
import { Register } from './pages/Register';
import { Reviews } from './pages/Reviews';
import { Carrito } from './pages/Carrito';
import { Login } from './pages/Login';
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminProducts } from "./pages/AdminProducts";
import { AdminUsers } from "./pages/AdminUsers";
import { AdminRoute } from "./routes/AdminRoute";
import { Forbidden } from './pages/Forbidden';






function App() {
  return (
    <Routes>
  <Route element={<Layout />}>
    <Route path="/" element={<Index />} />
    <Route path="/products" element={<Products />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/products/:id" element={<ProductDetail />} />
    <Route path="/404" element={<NotFound />} />
    <Route path="/register" element={<Register />} />
    <Route path="/resenas" element={<Reviews />} />
    <Route path="/contacto" element={<Contact />} />
    <Route path="/carrito" element={<Carrito />} />
    <Route path="/login" element={<Login />} />
    <Route path="/forbidden" element={<Forbidden />} />

    {/* RUTAS ADMIN PROTEGIDAS */}
    <Route
      path="/admin"
      element={
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      }
    />
    <Route
      path="/admin/products"
      element={
        <AdminRoute>
          <AdminProducts />
        </AdminRoute>
      }
    />
    <Route
      path="/admin/users"
      element={
        <AdminRoute>
          <AdminUsers />
        </AdminRoute>
      }
    />
  </Route>
</Routes>
);
  
}

export default App
