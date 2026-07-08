import { useEffect, useState } from "react";

import { listarProdutos } from "../api/produtoApi";

//import "../styles/Catalago.scss";

export default function Catalogo() {

const [produtos, setProdutos] = useState([]);
const [loading, setLoading] = useState(true);
const [erro, setErro] = useState("");


async function carregarProdutos() {

try {

  setLoading(true);

  const response = await listarProdutos();

  console.log("RESPOSTA COMPLETA API:", response);


  const dados = response?.data ?? [];


  console.log("DADOS:", dados);
  console.log("QUANTIDADE:", dados.length);


  setProdutos(dados);


} catch (error) {

  console.error("ERRO AO CARREGAR PRODUTOS:", error);

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



useEffect(() => {

  console.log(
    "PRODUTOS NO ESTADO:",
    produtos
  );

}, [produtos]);

console.log("ANTES DO RETURN:", produtos);

return (

<div className="catalogo">

  <header className="catalogo__header">

    <h1 style={{ color: "white" }}>
      CATALOGO DE MATERIAIS 
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

      {
        produtos.map((produto) => {

          console.log(
            "RENDERIZANDO:",
            produto.id,
            produto.nome
          );

          return (

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

                <h3 style={{color:"red", fontSize:"30px"}}>
                    {produto.nome}
                </h3>


                <span>
                  {produto.categoria_nome || "Sem departamento"}
                </span>

              </div>


            </div>

          );

        })
      }

    </div>

  )}


</div>

);

}