import pg from "pg";
import { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } from "./config/env.js";
const { Pool } = pg;

const pool = new Pool({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME
});

try {
  const client = await pool.connect();
  console.log("Connect to PostgreSQL");
  client.release();
} catch (err) {
  console.error("Database connection error:", err);
}
export default pool;
