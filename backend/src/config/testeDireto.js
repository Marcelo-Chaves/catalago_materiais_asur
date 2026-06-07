import pg from "pg";

const client = new pg.Client({
  host: "127.0.0.1",
  port: 5433,
  database: "catalogo",
  user: "admin",
  password: "admin123",
});

try {
  await client.connect();
  console.log("Conectado!");

  const result = await client.query("SELECT current_user");
  console.log(result.rows);

  await client.end();
} catch (err) {
  console.error(err);
}