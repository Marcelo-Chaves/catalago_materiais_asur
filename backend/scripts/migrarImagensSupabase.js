import "dotenv/config";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import supabase from "../src/config/supabase.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const pastaUploads = path.join(
  __dirname,
  "../uploads"
);


async function migrar() {

  const arquivos = fs.readdirSync(pastaUploads);

  console.log(
    "Arquivos encontrados:",
    arquivos.length
  );


  for (const arquivo of arquivos) {

    const caminho =
      path.join(
        pastaUploads,
        arquivo
      );


    const buffer =
      fs.readFileSync(caminho);


    console.log(
      "Enviando:",
      arquivo
    );


    const { error } =
      await supabase.storage
        .from("imagens_produtos")
        .upload(
          arquivo,
          buffer,
          {
            upsert: true
          }
        );


    if (error) {

      console.log(
        "ERRO:",
        arquivo,
        error.message
      );

    } else {

      console.log(
        "OK:",
        arquivo
      );

    }

  }


}


migrar();