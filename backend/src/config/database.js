/**
 * ============================================================
 * database.js
 * ------------------------------------------------------------
 * Responsável por configurar e estabelecer a conexão com o
 * banco de dados PostgreSQL.
 *
 * Ambientes suportados:
 *
 * ✔ Desenvolvimento
 *    • PostgreSQL executando localmente (Docker)
 *
 * ✔ Produção
 *    • Banco PostgreSQL hospedado no Neon
 *    • Aplicação hospedada no Render
 *
 * A seleção do ambiente é feita automaticamente através da
 * variável de ambiente DATABASE_URL.
 * ============================================================
 */
import pg from "pg";
import dotenv from "dotenv";
/**
 * Carrega as variáveis de ambiente do arquivo .env.
 */
dotenv.config();

const { Pool } = pg;
/**
 * Instância responsável pelo gerenciamento das conexões
 * com o banco de dados.
 */


/* ============================================================
 * Configuração da conexão
 * ============================================================
 */

/**
 * Produção
 *
 * Quando a variável DATABASE_URL estiver definida,
 * significa que a aplicação está utilizando um banco
 * PostgreSQL hospedado no Neon.
 *
 * A conexão SSL é obrigatória para comunicação segura.
 */

let db;

if (process.env.DATABASE_URL) {
  // Produção (Neon / Render)
  db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  console.log("Conectando ao banco Neon...");
} else {
   /**
   * Desenvolvimento
   *
   * Utiliza os dados do arquivo .env para conectar ao
   * PostgreSQL executando localmente (Docker).
   */
  db = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });

  console.log("Conectando ao PostgreSQL local...");
}
/**
 * Exporta a conexão para utilização pelos Models.
 */

export { db };
/* ============================================================
 * Teste de conexão
 * ============================================================
 */

/**
 * Executa uma consulta simples ao iniciar a aplicação.
 *
 * Caso a conexão seja estabelecida com sucesso,
 * uma mensagem será exibida no console.
 *
 * Em caso de falha, o erro será registrado para facilitar
 * a identificação do problema.
 */
db.query("SELECT NOW()")
  .then(() => {
    console.log("✅ Banco conectado com sucesso");
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar:", err.message);
  });