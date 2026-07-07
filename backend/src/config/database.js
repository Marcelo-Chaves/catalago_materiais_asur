import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

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
  // Desenvolvimento local (Docker)
  db = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });

  console.log("Conectando ao PostgreSQL local...");
}

export { db };

// Teste de conexão
db.query("SELECT NOW()")
  .then(() => {
    console.log("✅ Banco conectado com sucesso");
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar:", err.message);
  });