import pool from "../../db.js";
import AppError from "../errors/AppError.js";

export const getTasks = async (req, res, next) => {
  try {
    const result = await pool.query('select * from task');
    return res.json({ message: "Tasks fetched", tasks: result.rows });
  } catch (err) {
    next(err);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) throw new AppError("Invalid task id", 400);
    const result = await pool.query('select * from task where id = $1', [id]);
    if (result.rows.length === 0) throw new AppError("Task not found", 404);
    return res.json({ message: "Task fetched", task: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title, description, status, ends_at } = req.body;
    const result = await pool.query("insert into task (title, description, status, ends_at) values ($1, $2, $3, $4) returning *", [title, description, status, ends_at]);
    return res.status(201).json({ message: "Task created", task: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) throw new AppError("Invalid task id", 400);
    const { title, description, status, ends_at } = req.body;
    const result = await pool.query("update task set title = coalesce($1, title), description = coalesce($2, description), status = coalesce($3, status), ends_at = coalesce($4, ends_at) where id = $5 returning *", [title, description, status, ends_at, id]);
    if (result.rows.length === 0) throw new AppError("Task not found", 404);
    return res.json({ message: "Task updated", task: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) throw new AppError("Invalid task id", 400);
    const result = await pool.query("delete from task where id = $1 returning *", [id]);
    if (result.rows.length === 0) throw new AppError("Task not found", 404);
    return res.json({ message: "Task deleted", task: result.rows[0] });
  } catch (err) {
    next(err);
  }
};
