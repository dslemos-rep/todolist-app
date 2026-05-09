import express from 'express';
import { PORT } from "./config/env.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the TodoList app!!");
});

app.listen(PORT || 5500, () => {
  console.log(`TodoList app running on http://localhost:${PORT || 5500}`);
});

export default app;
