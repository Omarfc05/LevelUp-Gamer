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


function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Index />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/:id" element={<ProductDetail/>} />
        <Route path="/404" element={<NotFound/>} />
        <Route path="/register" element={<Register/>} />
        
      </Route>
    </Routes>  
  );
  
}

export default App
