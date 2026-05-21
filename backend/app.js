import express from 'express';
import cors from "cors";
import taskRouter from './src/routes/task.routes.js';
import { errorHandler } from './src/middlewares/error.middleware.js';
const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173"
}));
app.use("/api/v1/tasks", taskRouter);
app.use(errorHandler);
// app.get("/", async (req, res) => {
//   return res.send("Welcome to the TodoList app!!");
// });
//
export default app;
