import { db } from "../config/database.js";

export async function criarCategoria(
  nome,
  descricao
) {
  const query = `
    INSERT INTO categorias (
      nome,
      descricao
    )
    VALUES ($1, $2)
    RETURNING *
  `;

  const result = await db.query(
    query,
    [nome, descricao]
  );

  return result.rows[0];
}

export async function listarCategorias() {
  const result = await db.query(
    "SELECT * FROM categorias ORDER BY id"
  );

  return result.rows;
}

export async function buscarCategoriaPorId(id) {
  const result = await db.query(
    "SELECT * FROM categorias WHERE id = $1",
    [id]
  );

  return result.rows[0];
}

export async function atualizarCategoria(
  id,
  nome,
  descricao
) {
  const result = await db.query(
    `
    UPDATE categorias
    SET nome = $1,
        descricao = $2
    WHERE id = $3
    RETURNING *
    `,
    [nome, descricao, id]
  );

  return result.rows[0];
}

export async function excluirCategoria(id) {
  await db.query(
    "DELETE FROM categorias WHERE id = $1",
    [id]
  );
}