import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import {
  listarProdutos,
  criarProduto,
  atualizarProduto,
  excluirProduto
} from "../api/produtoApi";

import { listarCategorias } from "../api/categoriaApi";

export default function Produtos() {

  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [imagem, setImagem] = useState(null);

  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  // NOVO
  const [produtoEditando, setProdutoEditando] =
    useState(null);

  // =========================
  // PRODUTOS
  // =========================
  async function carregarProdutos() {
    try {
      setLoading(true);
      setErro("");

      const response = await listarProdutos();

      console.log(
        "RESPOSTA API:",
        response
      );

      const dados =
        Array.isArray(response)
          ? response
          : response?.produtos ||
            response?.data ||
            [];

      setProdutos(dados);

    } catch (error) {

      console.error(error);

      setErro(
        "Erro ao carregar produtos"
      );

    } finally {

      setLoading(false);

    }
  }

  // =========================
  // CATEGORIAS
  // =========================
  async function carregarCategorias() {
    try {

      const response =
        await listarCategorias();

      const dados =
        Array.isArray(response)
          ? response
          : response?.categorias ||
            response?.data ||
            [];

      console.log(
        "DADOS CATEGORIAS:",
        dados
      );

      setCategorias(dados);

    } catch (error) {

      console.error(error);

      setErro(
        "Erro ao carregar categorias"
      );

    }
  }

  // =========================
  // INIT
  // =========================
  useEffect(() => {
    carregarProdutos();
    carregarCategorias();
  }, []);

  // =========================
  // SALVAR / ATUALIZAR
  // =========================
  async function salvar(e) {

    e.preventDefault();

    try {

      const formData =
        new FormData();

      formData.append(
        "nome",
        nome
      );

      formData.append(
        "descricao",
        descricao
      );

      formData.append(
        "categoria_id",
        Number(categoriaId)
      );

      formData.append(
        "quantidade",
        1
      );

      if (imagem) {
        formData.append(
          "imagem",
          imagem
        );
      }

      if (produtoEditando) {

        await atualizarProduto(
          produtoEditando.id,
          formData
        );

      } else {

        await criarProduto(
          formData
        );

      }

      setNome("");
      setDescricao("");
      setCategoriaId("");
      setImagem(null);

      setProdutoEditando(null);

      carregarProdutos();

    } catch (error) {

      console.error(error);

      setErro(
        error.response?.data?.erro ||
        error.message
      );

    }
  }

  // =========================
  // EDITAR
  // =========================
  function editar(produto) {

    setProdutoEditando(produto);

    setNome(
      produto.nome || ""
    );

    setDescricao(
      produto.descricao || ""
    );

    setCategoriaId(
      produto.categoria_id || ""
    );
  }

// =========================
// EXCLUIR
// =========================
async function remover(id) {

  if (!window.confirm("Deseja excluir?")) {
    return;
  }

  try {

    await excluirProduto(id);

    carregarProdutos();

  } catch (error) {

    console.error(error);

    setErro(
      "Erro ao excluir produto"
    );

  }
}

return (
  <Layout>

    <h1>Produtos</h1>

    {erro && (
      <p style={{ color: "red" }}>
        {erro}
      </p>
    )}

    <form onSubmit={salvar}>

      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) =>
          setNome(e.target.value)
        }
      />

      <input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) =>
          setDescricao(e.target.value)
        }
      />

      <select
        value={categoriaId}
        onChange={(e) =>
          setCategoriaId(e.target.value)
        }
      >
        <option value="">
          Selecione categoria
        </option>

        {categorias.map((cat) => (
          <option
            key={cat.id}
            value={cat.id}
          >
            {cat.nome}
          </option>
        ))}
      </select>

      <input
        type="file"
        onChange={(e) =>
          setImagem(
            e.target.files[0]
          )
        }
      />

      <button type="submit">

        {produtoEditando
          ? "Atualizar"
          : "Salvar"}

      </button>

      {produtoEditando && (

        <button
          type="button"
          onClick={() => {

            setProdutoEditando(null);

            setNome("");
            setDescricao("");
            setCategoriaId("");
            setImagem(null);

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
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Imagem</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>

          {produtos.map((p) => (

            <tr key={p.id}>

              <td>{p.id}</td>

              <td>{p.nome}</td>

              <td>
                {p.descricao}
              </td>

              <td>
                {p.categoria_nome ||
                  "Sem categoria"}
              </td>

              <td>

                {p.imagem && (

                  <img
                    src={`http://localhost:3333/uploads/${p.imagem}`}
                    alt={p.nome}
                    width="60"
                  />

                )}

              </td>

              <td>

                <button
                  type="button"
                  onClick={() =>
                    editar(p)
                  }
                >
                  Editar
                </button>

                {" "}

                <button
                  type="button"
                  onClick={() =>
                    remover(p.id)
                  }
                >
                  Excluir
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    )}

  </Layout>
);

}