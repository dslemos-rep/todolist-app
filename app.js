import express from 'express';
import pool from './db.js';
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.get("/", async (req, res) => {
  try {
    const result = await pool.query('select * from task');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
  res.send("Welcome to the TodoList app!!");
});

app.listen(process.env.PORT || 5500, () => {
  console.log(`TodoList app running on http://localhost:${process.env.PORT || 5500}`);
});

export default app;
