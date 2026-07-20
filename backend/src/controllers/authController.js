
/**
 * ============================================================
 * authController.js
 * ------------------------------------------------------------
 * Responsável por receber as requisições relacionadas à
 * autenticação dos usuários.
 *
 * Responsabilidades:
 * • Validar os dados recebidos.
 * • Chamar os serviços de autenticação.
 * • Retornar a resposta HTTP ao cliente.
 *
 * Observação:
 * Este Controller não acessa diretamente o banco de dados.
 * Toda a regra de negócio é executada pelo authService.
 * ============================================================
 */

import {
  registrarUsuario,
  loginUsuario
} from "../services/authService.js";

import {
  registerSchema,
  loginSchema
} from "../validations/authValidation.js";

/* ============================================================
 * Cadastro de Usuários
 * ============================================================
 */

/**
 * Realiza o cadastro de um novo usuário.
 *
 * Fluxo:
 * 1. Valida os dados recebidos.
 * 2. Chama o serviço de cadastro.
 * 3. Retorna o usuário criado.
 */
export async function register(
  req,
  res
) {
  try {

    // Valida os dados enviados na requisição.
    registerSchema.parse(req.body);

    const {
      nome,
      email,
      senha
    } = req.body;

    // Executa o cadastro do usuário.
    const usuario =
      await registrarUsuario(
        nome,
        email,
        senha
      );

    // Retorna sucesso na criação.
    return res
      .status(201)
      .json(usuario);

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
 * Autenticação
 * ============================================================
 */

/**
 * Realiza o login do usuário.
 *
 * Fluxo:
 * 1. Valida os dados recebidos.
 * 2. Verifica as credenciais.
 * 3. Retorna o token JWT e os dados do usuário.
 */
export async function login(
  req,
  res
) {
  try {

    // Valida os dados enviados na requisição.
    loginSchema.parse(req.body);

    const {
      email,
      senha
    } = req.body;

    // Executa a autenticação.
    const resultado =
      await loginUsuario(
        email,
        senha
      );

    // Retorna sucesso na autenticação.
    return res
      .status(200)
      .json(resultado);

  } catch (error) {

    // Retorna erro caso as credenciais sejam inválidas.
    return res
      .status(401)
      .json({
        erro: error.message
      });

  }
}

