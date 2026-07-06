import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function Dashboard() {

  const [usuario, setUsuario] =
    useState(null);

  useEffect(() => {

    const usuarioStorage =
      localStorage.getItem("usuario");

    if (usuarioStorage) {
      setUsuario(
        JSON.parse(usuarioStorage)
      );
    }

  }, []);

  return (
    <Layout>

      <h1>Dashboard</h1>

      {usuario && (
        <>
          <p>
            Nome: {usuario.nome}
          </p>

          <p>
            E-mail: {usuario.email}
          </p>

          <p>
            Perfil: {usuario.role}
          </p>
        </>
      )}

    </Layout>
  );
}