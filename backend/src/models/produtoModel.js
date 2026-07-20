
/**
* ============================================================ 
* produtoModel.js 
* ------------------------------------------------------------ 
* Responsável pelas operações de acesso ao banco de dados 
* relacionadas aos produtos. 
* 
* Funções disponíveis: 
* • Criar produto. 
* • Listar produtos. 
* • Buscar produto por ID. 
* • Atualizar produto. 
* • Excluir produto. 
* 
* Observação: 
* Este arquivo contém apenas consultas ao banco de dados. 
* As validações e regras de negócio são tratadas pelos 
* Controllers. 
* ============================================================
*/

import { db } from "../config/database.js";

/* ============================================================ 
* Cadastro de Produtos 
* ============================================================ 
*/

/** 
* Cadastra um novo produto. 
* 
* @param {string} nome - Nome do produto. 
* @param {string} descricao - Descrição do produto. 
* @param {number} categoria_id - ID da categoria. 
* @param {number} quantidade - Quantidade disponível. 
* @param {string} imagem - URL da imagem do produto. 
* 
* @returns {Object} Produto recém-cadastrado. 
*/

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
/* ============================================================ 
* Consulta de Produtos 
* ============================================================ 
*/ 
/** 
* Lista os produtos cadastrados. 
* 
* Permite: 
* • Paginação. 
* • Pesquisa por nome. 
* • Filtro por categoria. 
* 
* Os produtos são retornados do mais recente para o mais antigo. 
* 
* @param {number} page - Página atual. 
* @param {number} limit - Quantidade de registros por página. 
* @param {string} nome - Texto para pesquisa por nome. 
* @param {number|null} categoria_id - Categoria utilizada como filtro. 
* 
* @returns {Array} Lista de produtos. 
*/

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

  /** 
  * Aplica filtro pelo nome do produto. 
  */

  if (nome) {
    query += ` AND LOWER(p.nome) LIKE LOWER($${index})`;
    values.push(`%${nome}%`);
    index++;
  }
  /** 
  * Aplica filtro pela categoria. 
  */

  if (categoria_id) {
    query += ` AND p.categoria_id = $${index}`;
    values.push(categoria_id);
    index++;
  }
  /** 
  * Ordena os produtos do mais recente para o mais antigo 
  * e aplica a paginação da consulta. 
  */

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
/**
* Busca um produto pelo seu identificador. 
* 
* @param {number} id - ID do produto. 
* 
* @returns {Object|undefined} Produto encontrado. 
*/

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
/* ============================================================ 
* Atualização de Produtos 
* ============================================================ 
*/ 
/** 
* Atualiza os dados de um produto. 
* 
* Caso uma nova imagem seja enviada, 
* ela também será atualizada. 
* 
* @returns {Object} Produto atualizado. 
*/

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
/* ============================================================ 
* Exclusão de Produtos 
* ============================================================ 
*/ 
/** 
* Remove um produto do banco de dados. 
* 
* @param {number} id - Identificador do produto. 
*/
export async function excluirProduto(id) {
  await db.query(
    "DELETE FROM produtos WHERE id = $1",
    [id]
  );
}