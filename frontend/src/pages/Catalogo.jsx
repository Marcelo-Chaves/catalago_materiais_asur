import { useEffect, useState } from "react";

import { listarProdutos } from "../api/produtoApi";

import "../styles/Catalago.scss";

export default function Catalogo() {

const [produtos, setProdutos] = useState([]);
const [loading, setLoading] = useState(true);
const [erro, setErro] = useState("");

async function carregarProdutos() {

try {

  setLoading(true);

  const response =
    await listarProdutos();

  const dados =
    Array.isArray(response)
      ? response
      : response?.data ||
        response?.produtos ||
        [];

  setProdutos(dados);

  console.log("PRODUTOS RECEBIDOS:", dados);

} catch (error) {

  console.error(error);

  setErro(
    "Erro ao carregar produtos"
  );

} finally {

  setLoading(false);

}


}

useEffect(() => {
carregarProdutos();
}, []);

return (


<div className="catalogo">

  <header className="catalogo__header">

    <h1 style={{ color: "red" }}>
      TESTE SUPABASE 12345
    </h1>

    <p>
        Associação Sul de Rondônia
    </p>

  </header>

  <div className="catalogo__aviso">

    Precisa de algum material?
    Procure a secretaria do departamento para realizar sua solicitação.
    Os materiais serão disponibilizados conforme estoque.

  </div>

  <div className="catalogo__contador">

    📦 {produtos.length} materiais cadastrados

  </div>

  {erro && (
    <p className="erro">
      {erro}
    </p>
  )}

  {loading ? (

    <p className="catalogo__loading">
      Carregando...
    </p>

  ) : (

    <div className="catalogo__grid">

      {produtos.map((produto) => (

        <div
          key={produto.id}
          className="catalogo__card"
        >

       {produto.imagem && (
  <img
    src={produto.imagem}
    alt={produto.nome}
    loading="lazy"
  />
)}

          <div className="catalogo__content">

            <h3>
              {produto.nome}
            </h3>

            <span>
              {produto.categoria_nome || "Sem departamento"}
            </span>

          </div>

        </div>

      ))}

    </div>

  )}

</div>


);
}
