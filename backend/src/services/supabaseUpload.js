import supabase from "../config/supabase.js";

export async function uploadImagemSupabase(file) {

  const nomeArquivo =
    Date.now() +
    "-" +
    file.originalname;

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

  if (error) {
    throw error;
  }

  const { data: url } =
    supabase.storage
      .from("imagens_produtos")
      .getPublicUrl(
        data.path
      );

  return url.publicUrl;
}