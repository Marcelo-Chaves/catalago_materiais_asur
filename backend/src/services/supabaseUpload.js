/**
 * ============================================================
 * supabaseUpload.js
 * ------------------------------------------------------------
 * Responsável pelo envio de imagens para o Supabase Storage.
 *
 * Responsabilidades:
 * • Receber o arquivo enviado pelo cliente.
 * • Normalizar o nome do arquivo.
 * • Realizar o upload para o bucket configurado.
 * • Gerar a URL pública da imagem.
 *
 * Observação:
 * Os arquivos são enviados utilizando o buffer disponibilizado
 * pelo Multer através do middleware de upload.
 * ============================================================
 */

import supabase from "../config/supabase.js";

/**
 * Realiza o upload de uma imagem para o Supabase Storage.
 *
 * Fluxo:
 * 1. Recebe o arquivo enviado pelo usuário.
 * 2. Limpa e padroniza o nome do arquivo.
 * 3. Gera um nome único utilizando timestamp.
 * 4. Envia o arquivo para o bucket imagens_produtos.
 * 5. Gera e retorna a URL pública da imagem.
 *
 * @param {Object} file - Arquivo recebido pelo Multer.
 *
 * @returns {string} URL pública da imagem armazenada.
 */
export async function uploadImagemSupabase(file) {

  /*
   * Remove caracteres especiais do nome original
   * para evitar problemas no armazenamento.
   */
  const nomeLimpo = file.originalname
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9.-]/g, "-");


  /*
   * Cria um nome único para evitar conflito
   * entre arquivos com o mesmo nome.
   */
  const nomeArquivo =
    `${Date.now()}-${nomeLimpo}`;


  /*
   * Realiza o envio do arquivo para o bucket
   * imagens_produtos no Supabase Storage.
   */
  const { data, error } =
    await supabase.storage
      .from("imagens_produtos")
      .upload(
        nomeArquivo,
        file.buffer,
        {
          contentType: file.mimetype
        }
      );


  /*
   * Caso ocorra erro durante o upload,
   * interrompe a execução e retorna o erro.
   */
  if (error) {
    throw error;
  }


  /*
   * Obtém a URL pública do arquivo armazenado.
   */
  const { data: url } =
    supabase.storage
      .from("imagens_produtos")
      .getPublicUrl(data.path);


  /*
   * Retorna a URL para ser salva no banco
   * junto com os dados do produto.
   */
  return url.publicUrl;
}