import { db } from "../config/database.js";

export async function criarProduto(
  nome,
  descricao,
  categoria_id,
  quantidade,
  imagem
) {

  console.log("========== ANTES DO INSERT ==========");
  console.log({
    nome,
    descricao,
    categoria_id,
    quantidade,
    imagem
  });

  const query = `
    INSERT INTO produtos (
      nome,
      descricao,
      categoria_id,
      quantidade,
      imagem
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const result = await db.query(query, [
    nome,
    descricao,
    categoria_id,
    quantidade,
    imagem
  ]);

  console.log("========== DEPOIS DO INSERT ==========");
  console.log(result.rows[0]);

  return result.rows[0];
}

export async function listarProdutos(
  page = 1,
  limit = 10,
  nome = "",
  categoria_id = null
) {
  const offset = (page - 1) * limit;
let query = `
  SELECT
    p.id,
    p.nome,
    p.descricao,
    p.categoria_id,
    p.quantidade,
    p.imagem,
    c.nome AS categoria_nome
  FROM produtos p
  LEFT JOIN categorias c
    ON c.id = p.categoria_id
  WHERE 1=1
  
`;

  const values = [];
  let index = 1;

  if (nome) {
    query += ` AND LOWER(p.nome) LIKE LOWER($${index})`;
    values.push(`%${nome}%`);
    index++;
  }

  if (categoria_id) {
    query += ` AND p.categoria_id = $${index}`;
    values.push(categoria_id);
    index++;
  }

  query += `
    ORDER BY p.id DESC
    LIMIT $${index}
    OFFSET $${index + 1}
  `;

  values.push(limit);
  values.push(offset);

  console.log("QUERY FINAL PRODUTOS:");
  console.log(query);

  console.log("VALORES:");
  console.log(values);

  const result = await db.query(query, values);

  return result.rows;
}

export async function buscarProdutoPorId(id) {
  const result = await db.query(
    `
    SELECT
      p.id,
      p.nome,
      p.descricao,
      p.quantidade,
      p.imagem,
      c.nome AS categoria_nome
    FROM produtos p
    LEFT JOIN categorias c
      ON c.id = p.categoria_id
    WHERE p.id = $1
    `,
    [id]
  );

  return result.rows[0];
}

export async function atualizarProduto(
  id,
  nome,
  descricao,
  categoria_id,
  quantidade,
  imagem
) {
  let query;
  let values;

  if (imagem) {
    query = `
      UPDATE produtos
      SET
        nome = $1,
        descricao = $2,
        categoria_id = $3,
        quantidade = $4,
        imagem = $5
      WHERE id = $6
      RETURNING *;
    `;

    values = [
      nome,
      descricao,
      categoria_id,
      quantidade,
      imagem,
      id
    ];
  } else {
    query = `
      UPDATE produtos
      SET
        nome = $1,
        descricao = $2,
        categoria_id = $3,
        quantidade = $4
      WHERE id = $5
      RETURNING *;
    `;

    values = [
      nome,
      descricao,
      categoria_id,
      quantidade,
      id
    ];
  }

  const result = await db.query(query, values);

  return result.rows[0];
}

export async function excluirProduto(id) {
  await db.query(
    "DELETE FROM produtos WHERE id = $1",
    [id]
  );
}