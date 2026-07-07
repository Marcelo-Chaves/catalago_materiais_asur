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

        {/* Login Administrativo */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Categorias */}
        <Route
          path="/categorias"
          element={
            <PrivateRoute>
              <Categorias />
            </PrivateRoute>
          }
        />

        {/* Produtos */}
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