import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

try {
  const client = await pool.connect();
  console.log("Connect to PostgreSQL");
  client.release();
} catch (err) {
  console.error("Database connection error:", err);
}
export default pool;
