
import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import {
  listarCategorias,
  criarCategoria,
  atualizarCategoria,
  excluirCategoria
} from "../api/categoriaApi";

export default function Categorias() {

  const [nome, setNome] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const [categoriaEditando, setCategoriaEditando] =
    useState(null);

  async function carregarCategorias() {

    try {

      setLoading(true);
      setErro("");

      const dados =
        await listarCategorias();

      setCategorias(dados);

    } catch (error) {

      console.error(error);

      setErro(
        error.response?.data?.erro ||
        "Erro ao carregar categorias"
      );

    } finally {

      setLoading(false);

    }
  }

  async function salvar(e) {

    e.preventDefault();

    if (!nome.trim()) return;

    try {

      if (categoriaEditando) {

        await atualizarCategoria(
          categoriaEditando.id,
          nome
        );

      } else {

        await criarCategoria(nome);

      }

      setNome("");
      setCategoriaEditando(null);

      carregarCategorias();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.erro ||
        "Erro ao salvar categoria"
      );

    }
  }

  function editar(categoria) {

    setCategoriaEditando(categoria);

    setNome(
      categoria.nome || ""
    );
  }

  async function remover(id) {

    if (
      !window.confirm(
        "Deseja excluir?"
      )
    ) {
      return;
    }

    try {

      await excluirCategoria(id);

      carregarCategorias();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.erro ||
        "Erro ao excluir categoria"
      );

    }
  }

  useEffect(() => {
    carregarCategorias();
  }, []);

  return (
    <Layout>

      <h1>Categorias</h1>

      {erro && (
        <p style={{ color: "red" }}>
          {erro}
        </p>
      )}

      <form onSubmit={salvar}>

        <input
          type="text"
          placeholder="Nome da categoria"
          value={nome}
          onChange={(e) =>
            setNome(e.target.value)
          }
        />

        <button type="submit">

          {categoriaEditando
            ? "Atualizar"
            : "Salvar"}

        </button>

        {categoriaEditando && (

          <button
            type="button"
            onClick={() => {

              setCategoriaEditando(
                null
              );

              setNome("");

            }}
          >
            Cancelar
          </button>

        )}

      </form>

      <hr />

      {loading ? (

        <p>Carregando...</p>

      ) : (

        <table
          border="1"
          cellPadding="8"
        >

          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>

            {categorias.map(
              (categoria) => (

                <tr
                  key={categoria.id}
                >

                  <td>
                    {categoria.id}
                  </td>

                  <td>
                    {categoria.nome}
                  </td>

                  <td>

                    <button
                      type="button"
                      onClick={() =>
                        editar(
                          categoria
                        )
                      }
                    >
                      Editar
                    </button>

                    {" "}

                    <button
                      type="button"
                      onClick={() =>
                        remover(
                          categoria.id
                        )
                      }
                    >
                      Excluir
                    </button>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      )}

    </Layout>
  );
}

