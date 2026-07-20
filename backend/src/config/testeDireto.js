
/**
 * ============================================================
 * testLocalConnection.js
 * ------------------------------------------------------------
 * Responsável por realizar um teste de conexão direta com o
 * banco de dados PostgreSQL local.
 *
 * Objetivo:
 * • Verificar se o servidor PostgreSQL está acessível.
 * • Confirmar que as credenciais de acesso estão corretas.
 * • Testar a execução de consultas SQL.
 *
 * Observação:
 * Este arquivo é utilizado apenas durante o desenvolvimento
 * para testes de conectividade e não faz parte do fluxo
 * principal da aplicação.
 * ============================================================
 */

import pg from "pg";

/* ============================================================
 * Configuração da Conexão
 * ============================================================
 */

/**
 * Cria uma conexão direta com o banco de dados PostgreSQL
 * utilizando as credenciais configuradas para o ambiente local.
 */
const client = new pg.Client({
  host: "127.0.0.1",
  port: 5433,
  database: "catalogo",
  user: "admin",
  password: "admin123",
});

/* ============================================================
 * Teste de Conexão
 * ============================================================
 */

try {

  // Estabelece conexão com o banco de dados.
  await client.connect();

  // Informa que a conexão foi realizada com sucesso.
  console.log("Conectado!");

  // Executa uma consulta para identificar o usuário conectado.
  const result = await client.query(
    "SELECT current_user"
  );

  // Exibe o resultado da consulta.
  console.log(result.rows);

  // Encerra a conexão com o banco de dados.
  await client.end();

} catch (err) {

  // Exibe o erro caso a conexão ou consulta falhe.
  console.error(err);

}

