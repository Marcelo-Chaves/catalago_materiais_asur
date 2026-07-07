import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/login";
import Dashboard from "../pages/Dashboard";
import Categorias from "../pages/Categorias";
import Produtos from "../pages/Produto";
import Catalogo from "../pages/Catalogo";

import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Catálogo Público - página inicial */}
        <Route
  path="/"
  element={<Catalogo />}
/>

<Route
  path="/login"
  element={<Login />}
/>

<Route
  path="/dashboard"
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }
/>

<Route
  path="/categorias"
  element={
    <PrivateRoute>
      <Categorias />
    </PrivateRoute>
  }
/>

<Route
  path="/produtos"
  element={
    <PrivateRoute>
      <Produtos />
    </PrivateRoute>
  }
/>
    </Routes>
    </BrowserRouter>
  );
}