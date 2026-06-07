import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  criarUsuario,
  buscarUsuarioPorEmail
} from "../models/userModel.js";

export async function registrarUsuario(
  nome,
  email,
  senha
) {
  const usuarioExistente =
    await buscarUsuarioPorEmail(email);

  if (usuarioExistente) {
    throw new Error(
      "E-mail já cadastrado"
    );
  }

  const senhaHash =
    await bcrypt.hash(senha, 10);

  return await criarUsuario(
    nome,
    email,
    senhaHash
  );
}

export async function loginUsuario(
  email,
  senha
) {
  const usuario =
    await buscarUsuarioPorEmail(email);

  if (!usuario) {
    throw new Error(
      "Usuário ou senha inválidos"
    );
  }

  const senhaValida =
    await bcrypt.compare(
      senha,
      usuario.senha
    );

  if (!senhaValida) {
    throw new Error(
      "Usuário ou senha inválidos"
    );
  }

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