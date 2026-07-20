/**
* ============================================================ 
* categoriaModel.js 
* ------------------------------------------------------------ 
* Responsável pelas operações de acesso ao banco de dados 
* relacionadas às categorias (departamentos) do catálogo. 
* * Funções disponíveis: 
* • Criar categoria. 
* • Listar categorias. 
* • Buscar categoria por ID. 
* • Atualizar categoria. 
* • Excluir categoria. 
* 
* Observação: 
* Este arquivo executa apenas consultas ao banco de dados. 
* As validações e regras de negócio são tratadas pelos 
* Controllers. 
* ============================================================ */

import { db } from "../config/database.js";

/* ============================================================ 
* Cadastro de Categorias 
* ============================================================ */ 
/** 
* 
* Cadastra uma nova categoria. 
* 
* @param {string} nome - Nome da categoria. 
* @param {string} descricao - Descrição da categoria. 
* 
* @returns {Object} Categoria recém-cadastrada. 
*/

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

/* ============================================================ 
* Consulta de Categorias 
* ============================================================ */ 
/** 
* Lista todas as categorias cadastradas. 
* 
* O retorno é ordenado pelo identificador da categoria. 
* 
* @returns {Array} Lista de categorias. 
*/


export async function listarCategorias() {
  const result = await db.query(
    "SELECT * FROM categorias ORDER BY id"
  );

  return result.rows;
}
/** 
* Busca uma categoria pelo seu identificador. 
* 
* @param {number} id - ID da categoria. 
* 
* @returns {Object|undefined} Categoria encontrada. 
*/

export async function buscarCategoriaPorId(id) {
  const result = await db.query(
    "SELECT * FROM categorias WHERE id = $1",
    [id]
  );

  return result.rows[0];
}

/* ============================================================ 
* Atualização de Categorias 
* ============================================================ 
*/ 
/** 
* Atualiza os dados de uma categoria. 
* 
* @param {number} id - ID da categoria. 
* @param {string} nome - Novo nome da categoria. 
* @param {string} descricao - Nova descrição da categoria. 
* 
* @returns {Object} Categoria atualizada. 
*/
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
/* ============================================================ 
* Exclusão de Categorias 
* ============================================================ 
*/ 
/** 
* Remove uma categoria do banco de dados. 
* 
* @param {number} id - Identificador da categoria. 
*/

export async function excluirCategoria(id) {
  await db.query(
    "DELETE FROM categorias WHERE id = $1",
    [id]
  );
}