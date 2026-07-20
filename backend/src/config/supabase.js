/**
 * ============================================================
 * supabase.js
 * ------------------------------------------------------------
 * Responsável por criar e exportar a conexão com o Supabase.
 *
 * O cliente é utilizado pelos serviços da aplicação para
 * realizar operações como upload e gerenciamento de arquivos
 * no Supabase Storage.
 *
 * As credenciais de acesso são obtidas através das variáveis
 * de ambiente configuradas no arquivo .env ou no ambiente
 * de produção.
 * ============================================================
 */

import { createClient } from "@supabase/supabase-js";

/**
 * Cria uma instância do cliente Supabase utilizando
 * as credenciais definidas nas variáveis de ambiente.
 */
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

/**
 * Exporta a instância do Supabase para utilização
 * pelos demais módulos da aplicação.
 */
export default supabase;