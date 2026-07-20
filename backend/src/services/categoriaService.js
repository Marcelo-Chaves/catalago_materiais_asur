
/**
 * ============================================================
 * categoriaService.js
 * ------------------------------------------------------------
 * Responsável por disponibilizar as operações relacionadas
 * às categorias para os Controllers.
 *
 * Atualmente este Service apenas reexporta as funções do
 * categoriaModel, pois não há regras de negócio específicas.
 *
 * Caso novas validações ou processos sejam necessários,
 * eles deverão ser implementados neste arquivo antes da
 * comunicação com o Model.
 * ============================================================
 */

import {
  criarCategoria,
  listarCategorias,
  buscarCategoriaPorId,
  atualizarCategoria,
  excluirCategoria
} from "../models/categoriaModel.js";

/**
 * Exporta as operações disponíveis para gerenciamento
 * das categorias do sistema.
 */
export {
  criarCategoria,
  listarCategorias,
  buscarCategoriaPorId,
  atualizarCategoria,
  excluirCategoria
};

