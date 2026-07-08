import app from "./app.js";

import supabase from "./src/config/supabase.js";

console.log("SUPABASE CONFIGURADO:", !!supabase);

const PORT =
  process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Servidor rodando na porta ${PORT}`
  );
});