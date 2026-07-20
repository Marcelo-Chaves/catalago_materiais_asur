import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {

  const token =
    localStorage.getItem("token");

  const usuario =
    JSON.parse(
      localStorage.getItem("usuario")
    );


  if (
    !token ||
    !usuario
  ) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  if (
    usuario.role !== "admin"
  ) {

    return (
      <Navigate
        to="/"
        replace
      />
    );

  }


  return children;

}