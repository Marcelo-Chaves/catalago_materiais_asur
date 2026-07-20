/**
 * ============================================================
 * categoriaValidation.js
 * ------------------------------------------------------------
 * Responsável pela validação dos dados utilizados no
 * gerenciamento de categorias do catálogo.
 *
 * Utiliza a biblioteca Zod para garantir que os dados enviados
 * pelo cliente atendam aos requisitos mínimos antes de serem
 * processados pela aplicação.
 *
 * Validações realizadas:
 * • Nome da categoria.
 * ============================================================
 */

import { z } from "zod";

/**
 * Schema de validação para criação e atualização
 * de categorias.
 *
 * Regras:
 * • Nome obrigatório.
 * • Deve possuir no mínimo 2 caracteres.
 */
export const categoriaSchema = z.object({

  // Valida o nome informado para a categoria.
  nome: z
    .string()
    .min(
      2,
      "Nome deve ter pelo menos 2 caracteres"
    )

});