import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import { listarProdutos } from "../api/produtoApi";
import { listarCategorias } from "../api/categoriaApi";

import "../styles/Dashboard.scss";

export default function Dashboard() {

  // Armazena os dados do usuário logado
  const [usuario, setUsuario] = useState(null);

  // Armazena a quantidade de materiais
  const [totalProdutos, setTotalProdutos] = useState(0);

  // Armazena a quantidade de categorias
  const [totalCategorias, setTotalCategorias] = useState(0);

  // Executa apenas uma vez ao carregar a página
  useEffect(() => {

    carregarDashboard();

  }, []);

  // Carrega as informações do Dashboard
  async function carregarDashboard() {

    try {

      // Recupera o usuário salvo no navegador
      const usuarioStorage =
        localStorage.getItem("usuario");

      if (usuarioStorage) {

        setUsuario(
          JSON.parse(usuarioStorage)
        );

      }

      // Busca os produtos cadastrados
      const produtos =
        await listarProdutos();

      // Busca as categorias cadastradas
      const categorias =
        await listarCategorias();

      // Atualiza a quantidade de produtos
      setTotalProdutos(
        produtos.data.length
      );

      // Atualiza a quantidade de categorias
      setTotalCategorias(
        categorias.length
      );

    } catch (error) {

      console.error(
        "Erro ao carregar Dashboard:",
        error
      );

    }

  }

  return (

    <Layout>

      <section className="dashboard">

        <div className="dashboard__header">

          <h1>
            Painel Administrativo
          </h1>

          <p>
            Gerencie os materiais do Catálogo ASUR.
          </p>

        </div>

        <div className="dashboard__cards">

          <div className="dashboard__card">

            <h3>
              📚 Materiais
            </h3>

            <span>
              {totalProdutos}
            </span>

          </div>

          <div className="dashboard__card">

            <h3>
              📁 Categorias
            </h3>

            <span>
              {totalCategorias}
            </span>

          </div>

        </div>

        {usuario && (

          <div className="dashboard__perfil">

            <h2>
              Informações do Administrador
            </h2>

            <div className="dashboard__item">

              <strong>
                Nome
              </strong>

              <span>
                {usuario.nome}
              </span>

            </div>

            <div className="dashboard__item">

              <strong>
                E-mail
              </strong>

              <span>
                {usuario.email}
              </span>

            </div>

            <div className="dashboard__item">

              <strong>
                Perfil
              </strong>

              <span>
                {usuario.role}
              </span>

            </div>

          </div>

        )}

      </section>

    </Layout>

  );

}