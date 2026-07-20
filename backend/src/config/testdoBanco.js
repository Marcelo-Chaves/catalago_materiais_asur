
/**
 * ============================================================
 * testConnection.js
 * ------------------------------------------------------------
 * Responsável por realizar um teste simples de conexão com o
 * banco de dados PostgreSQL.
 *
 * Objetivo:
 * • Verificar se a conexão foi estabelecida corretamente.
 * • Confirmar que o banco está respondendo consultas.
 *
 * Observação:
 * Este arquivo é destinado apenas para testes durante o
 * desenvolvimento e não faz parte do fluxo principal da
 * aplicação.
 * ============================================================
 */

import { db } from "./database.js";

/* ============================================================
 * Teste de Conexão
 * ============================================================
 */

try {

  // Executa uma consulta simples para verificar
  // se o banco de dados está acessível.
  const result = await db.query("SELECT NOW()");

  // Exibe mensagem informando que a conexão foi realizada.
  console.log("Banco conectado!");

  // Exibe o resultado da consulta, contendo a data e hora
  // atual retornada pelo servidor PostgreSQL.
  console.log(result.rows[0]);

} catch (error) {

  // Exibe o erro caso a conexão ou a consulta falhe.
  console.error(error);

}

