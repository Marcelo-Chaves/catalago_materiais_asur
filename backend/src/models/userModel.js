import { db } from "../config/database.js";

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

export async function buscarUsuarioPorEmail(email) {
  const result = await db.query(
    "SELECT * FROM usuarios WHERE email = $1",
    [email]
  );

  return result.rows[0];
}