/**
 * ============================================================
 * authValidation.js
 * ------------------------------------------------------------
 * Responsável pela validação dos dados recebidos nos processos
 * de autenticação da aplicação.
 *
 * Utiliza a biblioteca Zod para garantir que as informações
 * enviadas pelo cliente estejam no formato esperado antes de
 * serem processadas pelo sistema.
 *
 * Validações realizadas:
 * • Cadastro de usuários.
 * • Login de usuários.
 * ============================================================
 */

import { z } from "zod";

/**
 * Schema de validação para cadastro de usuários.
 *
 * Regras:
 * • Nome obrigatório com no mínimo 3 caracteres.
 * • E-mail deve possuir formato válido.
 * • Senha obrigatória com no mínimo 6 caracteres.
 */
export const registerSchema = z.object({

  // Valida o nome informado pelo usuário.
  nome: z
    .string()
    .min(3, "Nome deve ter no mínimo 3 caracteres"),


  // Valida o formato do e-mail.
  email: z
    .email("E-mail inválido"),


  // Valida o tamanho mínimo da senha.
  senha: z
    .string()
    .min(6, "Senha deve ter no mínimo 6 caracteres")

});


/**
 * Schema de validação para login de usuários.
 *
 * Regras:
 * • E-mail deve possuir formato válido.
 * • Senha obrigatória com no mínimo 6 caracteres.
 */
export const loginSchema = z.object({

  // Valida o formato do e-mail informado.
  email: z
    .email("E-mail inválido"),


  // Valida a senha informada no login.
  senha: z
    .string()
    .min(6, "Senha deve ter no mínimo 6 caracteres")

});