import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Teste de conexão
db.query("SELECT NOW()")
  .then(() => {
    console.log("✅ Banco conectado com sucesso");
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar:", err);
  });