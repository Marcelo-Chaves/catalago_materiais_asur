import { useEffect, useState } from "react";

import { listarProdutos } from "../api/produtoApi";

import "../styles/Catalago.scss";


export default function Catalogo() {


  const [produtos, setProdutos] = useState([]);

  const [produtosFiltrados, setProdutosFiltrados] =
    useState([]);

  const [busca, setBusca] = useState("");

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

      setProdutosFiltrados(dados);



    } catch (error) {


      setErro(
        "Erro ao carregar produtos"
      );


    } finally {


      setLoading(false);


    }

  }



  function pesquisar(valor) {


    setBusca(valor);



    const texto =
      valor.toLowerCase();



    const resultado =
      produtos.filter((produto) => {


        const nome =
          produto.nome
          ?.toLowerCase() || "";



        const categoria =
          produto.categoria_nome
          ?.toLowerCase() || "";



        return (

          nome.includes(texto) ||

          categoria.includes(texto)

        );


      });



    setProdutosFiltrados(resultado);


  }




  useEffect(() => {

    carregarProdutos();

  }, []);




  return (

    <div className="catalogo">


      <header className="catalogo__header">


        <h1>
          CATÁLOGO DE MATERIAIS
        </h1>


        <p>
          Associação Sul de Rondônia
        </p>


      </header>



      <div className="catalogo__aviso">


        Precisa de algum material?

        Procure a secretaria do departamento
        para realizar sua solicitação.


      </div>




      <div className="catalogo__busca">


        <input

          type="text"

          placeholder="Pesquisar material..."

          value={busca}

          onChange={(e) =>
            pesquisar(e.target.value)
          }

        />


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

            produtosFiltrados.map((produto) => (


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

                    {produto.categoria_nome ||
                    "Sem categoria"}

                  </span>



                </div>



              </div>



            ))

          }



        </div>


      )}



    </div>

  );

}