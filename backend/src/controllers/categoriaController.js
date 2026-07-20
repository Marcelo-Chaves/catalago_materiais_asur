
/**
 * ============================================================
 * categoriaController.js
 * ------------------------------------------------------------
 * Responsável por receber e processar as requisições HTTP
 * relacionadas às categorias do sistema.
 *
 * Responsabilidades:
 * • Validar os dados recebidos.
 * • Chamar os serviços responsáveis pelas regras de negócio.
 * • Retornar as respostas HTTP ao cliente.
 *
 * Observação:
 * Este Controller não acessa diretamente o banco de dados.
 * Toda a lógica de negócio é executada pelo categoriaService.
 * ============================================================
 */

import {
  criarCategoria,
  listarCategorias,
  buscarCategoriaPorId,
  atualizarCategoria,
  excluirCategoria
} from "../services/categoriaService.js";

import {
  categoriaSchema
} from "../validations/categoriaValidation.js";

/* ============================================================
 * Cadastro de Categorias
 * ============================================================
 */

/**
 * Realiza o cadastro de uma nova categoria.
 *
 * Fluxo:
 * 1. Valida os dados recebidos.
 * 2. Chama o serviço de cadastro.
 * 3. Retorna a categoria criada.
 */
export async function create(req, res) {
  try {

    // Valida os dados enviados na requisição.
    categoriaSchema.parse(req.body);

    const {
      nome,
      descricao
    } = req.body;

    // Executa o cadastro da categoria.
    const categoria =
      await criarCategoria(
        nome,
        descricao
      );

    // Retorna sucesso na criação.
    return res
      .status(201)
      .json(categoria);

  } catch (error) {

    // Retorna erro de validação ou cadastro.
    return res
      .status(400)
      .json({
        erro: error.message
      });

  }
}

/* ============================================================
 * Consulta de Categorias
 * ============================================================
 */

/**
 * Lista todas as categorias cadastradas.
 */
export async function findAll(req, res) {
  try {

    // Obtém todas as categorias cadastradas.
    const categorias =
      await listarCategorias();

    return res.json(categorias);

  } catch (error) {

    // Retorna erro interno da aplicação.
    return res
      .status(500)
      .json({
        erro: error.message
      });

  }
}

/**
 * Busca uma categoria pelo seu identificador.
 */
export async function findById(req, res) {
  try {

    // Busca a categoria informada.
    const categoria =
      await buscarCategoriaPorId(
        req.params.id
      );

    // Retorna erro caso a categoria não exista.
    if (!categoria) {
      return res.status(404).json({
        erro: "Categoria não encontrada"
      });
    }

    return res.json(categoria);

  } catch (error) {

    // Retorna erro interno da aplicação.
    return res
      .status(500)
      .json({
        erro: error.message
      });

  }
}

/* ============================================================
 * Atualização de Categorias
 * ============================================================
 */

/**
 * Atualiza os dados de uma categoria existente.
 *
 * Fluxo:
 * 1. Valida os dados recebidos.
 * 2. Atualiza a categoria.
 * 3. Retorna a categoria atualizada.
 */
export async function update(req, res) {
  try {

    // Valida os dados enviados na requisição.
    categoriaSchema.parse(req.body);

    const {
      nome,
      descricao
    } = req.body;

    // Executa a atualização da categoria.
    const categoria =
      await atualizarCategoria(
        req.params.id,
        nome,
        descricao
      );

    return res.json(categoria);

  } catch (error) {

    // Retorna erro de validação ou atualização.
    return res
      .status(400)
      .json({
        erro: error.message
      });

  }
}

/* ============================================================
 * Exclusão de Categorias
 * ============================================================
 */

/**
 * Remove uma categoria do sistema.
 */
export async function remove(req, res) {
  try {

    // Executa a exclusão da categoria.
    await excluirCategoria(
      req.params.id
    );

    return res.json({
      mensagem:
        "Categoria removida com sucesso"
    });

  } catch (error) {

    // Retorna erro interno da aplicação.
    return res
      .status(500)
      .json({
        erro: error.message
      });

  }
}

