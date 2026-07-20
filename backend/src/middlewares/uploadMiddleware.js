
/**
 * ============================================================
 * uploadMiddleware.js
 * ------------------------------------------------------------
 * Responsável pela configuração do middleware Multer para
 * recebimento de arquivos enviados nas requisições HTTP.
 *
 * Neste projeto, os arquivos são armazenados temporariamente
 * na memória do servidor para posteriormente serem enviados
 * ao Supabase Storage.
 *
 * Observação:
 * Nenhum arquivo é salvo localmente no servidor.
 * ============================================================
 */

import multer from "multer";

/* ============================================================
 * Configuração do Armazenamento
 * ============================================================
 */

/**
 * Define o armazenamento temporário em memória.
 *
 * Os arquivos ficam disponíveis em req.file durante
 * o processamento da requisição.
 */
const storage = multer.memoryStorage();

/* ============================================================
 * Middleware de Upload
 * ============================================================
 */

/**
 * Configura e exporta o middleware responsável pelo
 * processamento dos arquivos enviados pelo cliente.
 */
export const upload = multer({
  storage
});

