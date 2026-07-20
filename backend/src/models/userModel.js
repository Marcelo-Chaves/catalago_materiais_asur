/**
 * ============================================================
 * usuarioModel.js
 * ------------------------------------------------------------
 * Responsável pelas operações de acesso ao banco de dados
 * relacionadas aos usuários do sistema.
 *
 * Funções disponíveis:
 * • Criar um novo usuário.
 * • Buscar um usuário pelo e-mail.
 *
 * Observação:
 * Este arquivo contém apenas operações de banco de dados.
 * As regras de negócio (validações, autenticação e geração
 * de tokens) são tratadas pelos Controllers.
 * ============================================================
 */
import { db } from "../config/database.js";
/* ============================================================
 * Cadastro de Usuários
 * ============================================================
 */

/**
 * Cria um novo usuário no banco de dados.
 *
 * Parâmetros:
 * @param {string} nome - Nome do usuário.
 * @param {string} email - E-mail do usuário.
 * @param {string} senhaHash - Senha criptografada (Hash BCrypt).
 *
 * Retorno:
 * @returns {Object} Dados do usuário recém-criado.
 */

export async function criarUsuario(nome, email, senhaHash) {
  const query = `
    INSERT INTO usuarios (nome, email, senha)
    VALUES ($1, $2, $3)
    RETURNING id, nome, email, role, ativo
  `;

  const result = await db.query(query, [
    nome,
    email,
    senhaHash
  ]);

  return result.rows[0];
}
/* ============================================================
 * Consulta de Usuários
 * ============================================================
 */

/**
 * Busca um usuário pelo endereço de e-mail.
 *
 * Esta função é utilizada principalmente durante
 * o processo de autenticação (login).
 *
 * Parâmetros:
 * @param {string} email - E-mail informado pelo usuário.
 *
 * Retorno:
 * @returns {Object|undefined} Usuário encontrado ou undefined.
 */

export async function buscarUsuarioPorEmail(email) {
  const result = await db.query(
    "SELECT * FROM usuarios WHERE email = $1",
    [email]
  );

  return result.rows[0];
}