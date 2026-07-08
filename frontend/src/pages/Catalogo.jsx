import { useEffect, useState } from "react";

import { listarProdutos } from "../api/produtoApi";

// import "../styles/Catalago.scss";

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

      console.error(
        "ERRO AO CARREGAR PRODUTOS:",
        error
      );

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



  console.log(
    "ANTES DO RETURN:",
    produtos
  );



  return (

    <div
      style={{
        padding:"20px",
        background:"#eee",
        minHeight:"100vh"
      }}
    >


      <h1
        style={{
          color:"black"
        }}
      >
        CATÁLOGO DE MATERIAIS
      </h1>



      {erro && (

        <p style={{color:"red"}}>
          {erro}
        </p>

      )}




      {loading ? (

        <h2>
          Carregando...
        </h2>


      ) : (


        <div>


          {
            produtos.map((produto)=>{


              console.log(
                "RENDERIZANDO:",
                produto.id,
                produto.nome
              );


              return (


                <div
                  key={produto.id}
                  style={{
                    border:"2px solid red",
                    background:"#fff",
                    padding:"20px",
                    margin:"15px 0"
                  }}
                >



                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    style={{
                      width:"150px"
                    }}
                  />



                  <h2
                    style={{
                      color:"red",
                      fontSize:"30px"
                    }}
                  >
                    {produto.nome}
                  </h2>



                  <p>
                    {produto.categoria_nome}
                  </p>


                </div>


              );


            })
          }



        </div>


      )}



    </div>


  );


}