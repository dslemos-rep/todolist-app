import express from 'express';
import dotenv from "dotenv";
import taskRouter from './src/routes/task.routes.js';
import { errorHandler } from './src/middlewares/error.middleware.js';
dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/v1/tasks", taskRouter);
app.use(errorHandler);
app.get("/", async (req, res) => {
  return res.send("Welcome to the TodoList app!!");
});

app.listen(process.env.PORT || 5500, () => {
  console.log(`TodoList app running on http://localhost:${process.env.PORT || 5500}`);
});

export default app;
