
/**
 * ============================================================
 * produtoController.js
 * ------------------------------------------------------------
 * Responsável por receber e processar as requisições HTTP
 * relacionadas aos produtos do catálogo.
 *
 * Responsabilidades:
 * • Validar os dados recebidos.
 * • Gerenciar o upload de imagens.
 * • Chamar os serviços responsáveis pelas regras de negócio.
 * • Retornar as respostas HTTP ao cliente.
 *
 * Observação:
 * Este Controller não realiza acesso direto ao banco de dados.
 * Toda a lógica de negócio é executada pelo produtoService.
 * ============================================================
 */

import { uploadImagemSupabase } from "../services/supabaseUpload.js";

import {
  criarProduto,
  listarProdutos,
  buscarProdutoPorId,
  atualizarProduto,
  excluirProduto
} from "../services/produtoService.js";

import { produtoSchema } from "../validations/produtoValidation.js";

/**
 * Realiza o cadastro de um novo produto.
 *
 * Fluxo:
 * 1. Recebe os dados enviados pelo cliente.
 * 2. Valida as informações.
 * 3. Faz o upload da imagem (quando enviada).
 * 4. Solicita o cadastro ao Service.
 * 5. Retorna o produto criado.
 */
export async function create(req, res) {
  try {

    console.log("========== NOVO PRODUTO ==========");

    console.log("REQ BODY:", req.body);

    console.log(
      "NOME RECEBIDO:",
      req.body.nome
    );

    console.log(
      "DESCRIÇÃO RECEBIDA:",
      req.body.descricao
    );

    console.log(
      "REQ FILE:",
      req.file
    );

    // Organiza os dados recebidos na requisição.
    const data = {
      nome: req.body.nome,
      descricao: req.body.descricao || "",
      categoria_id: req.body.categoria_id,
      quantidade: req.body.quantidade || 0
    };


    console.log(
      "DATA ANTES DO BANCO:",
      data
    );


    produtoSchema.parse(data);


    let imagem = null;

    // Realiza o upload da imagem para o Supabase,
    // caso um arquivo tenha sido enviado.  
    if (req.file) {

      imagem = await uploadImagemSupabase(
        req.file
      );

    }


    console.log(
      "IMAGEM GERADA:",
      imagem
    );

    // Solicita ao Service o cadastro do produto.
    const produto = await criarProduto(
      data.nome,
      data.descricao,
      data.categoria_id,
      data.quantidade,
      imagem
    );


    console.log(
      "PRODUTO SALVO:",
      produto
    );


    return res.status(201).json(produto);


  } catch (error) {


    console.log(
      "ERRO BACKEND:",
      error
    );


    return res.status(400).json({
      erro: error.message
    });

  }
}
/**
 * Lista os produtos cadastrados.
 *
 * Permite:
 * • Paginação.
 * • Pesquisa por nome.
 * • Filtro por categoria.
 */
export async function findAll(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 200;
    const nome = req.query.nome || "";
    const categoria_id = req.query.categoria_id || null;

    const produtos = await listarProdutos(
      page,
      limit,
      nome,
      categoria_id
    );

    console.log("PRODUTOS RETORNADOS:", produtos);

    return res.json({
      page,
      limit,
      total: produtos.length,
      data: produtos
    });

  } catch (error) {

    console.log("ERRO FINDALL:");
    console.log(error);

    return res.status(500).json({
      erro: error.message
    });
  }
}
/**
 * Busca um produto pelo seu identificador.
 *
 * Fluxo:
 * 1. Recebe o ID enviado pela URL.
 * 2. Solicita ao Service a busca do produto.
 * 3. Verifica se o produto foi encontrado.
 * 4. Retorna o produto ou uma mensagem de erro.
 */
export async function findById(req, res) {
  try {

    // Busca o produto utilizando o ID informado na requisição.
    const produto = await buscarProdutoPorId(req.params.id);

     // Retorna erro caso o produto não exista.
    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }

    // Retorna os dados do produto encontrado.  
    return res.json(produto);

  } catch (error) {

    // Retorna erro interno caso ocorra alguma exceção.
    return res.status(500).json({ erro: error.message });
  }
}

/**
 * Atualiza as informações de um produto existente.
 *
 * Fluxo:
 * 1. Recebe os dados enviados na requisição.
 * 2. Valida as informações do produto.
 * 3. Realiza o upload de uma nova imagem, caso enviada.
 * 4. Solicita ao Service a atualização do produto.
 * 5. Retorna o produto atualizado.
 */
export async function update(req, res) {
  try {

    
    console.log("REQ BODY UPDATE:", req.body);
    console.log("REQ FILE UPDATE:", req.file);

    // Organiza os dados recebidos na requisição.  
    const data = {
      nome: req.body.nome,
      descricao: req.body.descricao || "",
      categoria_id: req.body.categoria_id,
      quantidade: req.body.quantidade || 0
    };

     // Valida os dados do produto.
    produtoSchema.parse(data);

    // Inicializa a variável da imagem.  
    let imagem = null;

    // Realiza o upload da nova imagem, caso um arquivo tenha sido enviado.  
    if (req.file) {
    imagem = await uploadImagemSupabase(req.file);
  }
    // Atualiza o produto utilizando os dados informados.
    const produto = await atualizarProduto(
      req.params.id,
      data.nome,
      data.descricao,
      data.categoria_id,
      data.quantidade,
      imagem
    );

    // Retorna o produto atualizado.  
    return res.json(produto);
  
     // Retorna erro de validação ou atualização.
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
}

/**
 * Remove um produto do catálogo.
 *
 * Fluxo:
 * 1. Recebe o ID do produto pela URL.
 * 2. Solicita ao Service a exclusão do produto.
 * 3. Retorna uma mensagem de sucesso.
 */
export async function remove(req, res) {
  try {

    // Executa a exclusão do produto.
    await excluirProduto(req.params.id);

    // Retorna mensagem confirmando a exclusão.
    return res.json({
      mensagem: "Produto removido com sucesso"
    });

  } catch (error) {
    // Retorna erro interno caso ocorra alguma exceção.
    return res.status(500).json({ erro: error.message });
  }
}

/**
 * Realiza o upload de uma imagem.
 *
 * Fluxo:
 * 1. Verifica se um arquivo foi enviado na requisição.
 * 2. Retorna erro caso nenhum arquivo seja encontrado.
 * 3. Retorna uma mensagem de sucesso com o nome da imagem.
 */
export async function uploadImagem(req, res) {
  try {

    // Verifica se a requisição contém um arquivo.
    if (!req.file) {
      return res.status(400).json({
        erro: "Nenhuma imagem enviada"
      });
    }

    // Retorna confirmação do upload juntamente com o nome do arquivo.
    return res.status(200).json({
      mensagem: "Upload realizado com sucesso",
      imagem: req.file.filename
    });

  } catch (error) {

    // Retorna erro interno caso ocorra alguma exceção.
    return res.status(500).json({
      erro: error.message
    });

  }
}