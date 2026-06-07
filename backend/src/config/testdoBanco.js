import { db } from "./database.js";

try {
  const result = await db.query("SELECT NOW()");
  console.log("Banco conectado!");
  console.log(result.rows[0]);
} catch (error) {
  console.error(error);
}