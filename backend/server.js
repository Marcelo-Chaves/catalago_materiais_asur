/**
 * ============================================================
 * server.js
 * ------------------------------------------------------------
 * Arquivo principal da aplicação.
 *
 * Responsabilidades:
 * • Inicializar o servidor HTTP.
 * • Importar a configuração da aplicação (Express).
 * • Verificar a conexão com o Supabase.
 * • Definir a porta da aplicação.
 * • Iniciar o servidor.
 *
 * Observação:
 * Este arquivo apenas inicia a aplicação. Toda a configuração
 * de rotas, middlewares e serviços é realizada em app.js.
 * ============================================================
 */

import app from "./app.js";
import supabase from "./src/config/supabase.js";

/**
 * Verifica se o cliente do Supabase foi inicializado.
 * O operador "!!" converte o objeto para um valor booleano.
 */

console.log("SUPABASE CONFIGURADO:", !!supabase);

/**
 * Define a porta utilizada pelo servidor.
 *
 * Em produção (Render) é utilizada a variável de ambiente PORT.
 * Em desenvolvimento, utiliza a porta 3000 como padrão.
 */

const PORT =
  process.env.PORT || 3000;

/**
 * Inicializa o servidor HTTP.
 *
 * Quando o servidor estiver pronto, exibe uma mensagem
 * informando em qual porta a aplicação está sendo executada.
 */  

app.listen(PORT, () => {
  console.log(
    `Servidor rodando na porta ${PORT}`
  );
});