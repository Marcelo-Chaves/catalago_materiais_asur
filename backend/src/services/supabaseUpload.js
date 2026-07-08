import supabase from "../config/supabase.js";

export async function uploadImagemSupabase(file) {

  const nomeLimpo = file.originalname
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9.-]/g, "-");

  const nomeArquivo =
    `${Date.now()}-${nomeLimpo}`;


  console.log("UPLOAD SUPABASE:");
  console.log(nomeArquivo);


  const { data, error } =
    await supabase.storage
      .from("imagens_produtos")
      .upload(
        nomeArquivo,
        file.buffer,
        {
          contentType: file.mimetype,
          upsert: false
        }
      );


  if (error) {
    console.log("ERRO SUPABASE:", error);
    throw error;
  }


  const { data: url } =
    supabase.storage
      .from("imagens_produtos")
      .getPublicUrl(
        data.path
      );


  console.log("URL GERADA:", url.publicUrl);


  return url.publicUrl;
}