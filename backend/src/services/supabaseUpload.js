import supabase from "../config/supabase.js";

export async function uploadImagemSupabase(file) {

  const { data: buckets, error: bucketError } =
  await supabase.storage.listBuckets();

  console.log("BUCKETS SUPABASE:", buckets);
  console.log("ERRO BUCKET:", bucketError);

  const nomeLimpo = file.originalname
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9.-]/g, "-");

  const nomeArquivo = `${Date.now()}-${nomeLimpo}`;

  console.log("ARQUIVO RECEBIDO:");
  console.log(file);

  console.log("NOME ENVIADO AO SUPABASE:");
  console.log(nomeArquivo);


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
    console.log("ERRO STORAGE:");
    console.log(error);
    throw error;
  }


  const { data: url } =
    supabase.storage
      .from("imagens_produtos")
      .getPublicUrl(data.path);


  console.log("URL FINAL:");
  console.log(url.publicUrl);


  return url.publicUrl;
}