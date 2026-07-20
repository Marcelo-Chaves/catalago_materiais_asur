
/**
 * ============================================================
 * authService.js
 * ------------------------------------------------------------
 * Responsável pelas regras de negócio relacionadas à
 * autenticação dos usuários.
 *
 * Responsabilidades:
 * • Registrar novos usuários.
 * • Validar credenciais de acesso.
 * • Gerar tokens JWT para autenticação.
 *
 * Observação:
 * Este Service utiliza o userModel para acessar o banco
 * de dados e centraliza toda a lógica de autenticação.
 * ============================================================
 */

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  criarUsuario,
  buscarUsuarioPorEmail
} from "../models/userModel.js";

/* ============================================================
 * Cadastro de Usuários
 * ============================================================
 */

/**
 * Realiza o cadastro de um novo usuário.
 *
 * Fluxo:
 * 1. Verifica se o e-mail já está cadastrado.
 * 2. Criptografa a senha.
 * 3. Solicita ao Model o cadastro do usuário.
 *
 * @param {string} nome - Nome do usuário.
 * @param {string} email - E-mail do usuário.
 * @param {string} senha - Senha informada pelo usuário.
 *
 * @returns {Object} Usuário cadastrado.
 */
export async function registrarUsuario(nome, email, senha) {

  // Verifica se já existe um usuário com o e-mail informado.
  const usuarioExistente =
    await buscarUsuarioPorEmail(email);

  if (usuarioExistente) {
    throw new Error("E-mail já cadastrado");
  }

  // Gera o hash da senha para armazenamento seguro.
  const senhaHash =
    await bcrypt.hash(senha, 10);

  // Realiza o cadastro do usuário.
  return await criarUsuario(
    nome,
    email,
    senhaHash
  );
}

/* ============================================================
 * Autenticação de Usuários
 * ============================================================
 */

/**
 * Realiza a autenticação do usuário.
 *
 * Fluxo:
 * 1. Busca o usuário pelo e-mail.
 * 2. Valida a senha informada.
 * 3. Gera um token JWT.
 * 4. Retorna o token e os dados do usuário.
 *
 * @param {string} email - E-mail do usuário.
 * @param {string} senha - Senha informada.
 *
 * @returns {Object} Token JWT e dados do usuário autenticado.
 */
export async function loginUsuario(email, senha) {

  // Busca o usuário pelo e-mail.
  const usuario =
    await buscarUsuarioPorEmail(email);

  // Verifica se o usuário existe.
  if (!usuario) {
    throw new Error("Usuário ou senha inválidos");
  }

  // Compara a senha informada com a senha armazenada.
  const senhaValida =
    await bcrypt.compare(
      senha,
      usuario.senha
    );

  // Retorna erro caso a senha seja inválida.
  if (!senhaValida) {
    throw new Error("Usuário ou senha inválidos");
  }

  // Gera o token JWT contendo as informações do usuário.
  const token = jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
      role: usuario.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "8h"
    }
  );

  // Retorna o token e os dados do usuário autenticado.
  return {
    token,
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role
    }
  };
}

