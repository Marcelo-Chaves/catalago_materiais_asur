/**
 * ============================================================
 * produtoValidation.js
 * ------------------------------------------------------------
 * Responsável pela validação dos dados utilizados no
 * gerenciamento de produtos do catálogo.
 *
 * Utiliza a biblioteca Zod para garantir que as informações
 * recebidas pela aplicação estejam no formato correto antes
 * de serem enviadas para a camada de serviços e banco de dados.
 *
 * Validações realizadas:
 * • Nome do produto.
 * • Descrição do produto.
 * • Categoria associada.
 * • Quantidade disponível.
 * • Imagem do produto.
 * ============================================================
 */

import { z } from "zod";

/**
 * Schema de validação para criação e atualização
 * de produtos.
 *
 * Regras:
 * • Nome obrigatório com no mínimo 2 caracteres.
 * • Descrição obrigatória com no mínimo 3 caracteres.
 * • Categoria deve ser um número válido.
 * • Quantidade deve ser um número igual ou superior a zero.
 * • Imagem é opcional e pode ser nula.
 */
export const produtoSchema = z.object({

  // Valida o nome do produto.
  nome: z
    .string()
    .min(
      2,
      "Nome deve ter pelo menos 2 caracteres"
    ),


  // Valida a descrição do produto.
  descricao: z
    .string()
    .min(
      3,
      "Descrição obrigatória"
    ),


  /*
   * Converte automaticamente valores recebidos como string
   * para número.
   *
   * Necessário porque dados enviados via formulário
   * geralmente chegam como texto.
   */
  categoria_id: z.coerce.number(),


  /*
   * Converte a quantidade para número e garante
   * que não seja um valor negativo.
   */
  quantidade: z.coerce.number()
    .min(0),


  /*
   * A imagem é opcional porque o cadastro do produto
   * pode ocorrer sem envio de arquivo.
   *
   * Aceita:
   * • URL da imagem.
   * • Valor nulo.
   * • Campo ausente.
   */
  imagem: z
    .string()
    .nullable()
    .optional()

});