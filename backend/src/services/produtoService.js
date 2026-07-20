/**
 * ============================================================
 * produtoService.js
 * ------------------------------------------------------------
 * Responsável por disponibilizar as operações relacionadas
 * aos produtos para os Controllers.
 *
 * Atualmente este Service funciona como uma camada de
 * comunicação entre o Controller e o Model, realizando apenas
 * o reenvio das funções responsáveis pelo acesso aos dados.
 *
 * Caso novas regras de negócio sejam necessárias, como:
 * • Validações adicionais.
 * • Tratamento de informações.
 * • Integrações externas.
 * • Processamentos antes do banco de dados.
 *
 * Elas deverão ser implementadas nesta camada.
 * ============================================================
 */

import {
  criarProduto,
  listarProdutos,
  buscarProdutoPorId,
  atualizarProduto,
  excluirProduto
} from "../models/produtoModel.js";

/**
 * Exporta as operações disponíveis para gerenciamento
 * dos produtos do catálogo.
 */
export {
  criarProduto,
  listarProdutos,
  buscarProdutoPorId,
  atualizarProduto,
  excluirProduto
};