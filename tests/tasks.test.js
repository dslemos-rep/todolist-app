import {
  describe,
  it,
  expect,
  afterAll,
  beforeEach,
} from "vitest";

import request from "supertest";

import app from "../app.js";
import pool from "../db.js";

beforeEach(async () => {
  await pool.query("DELETE FROM task");

  await pool.query(`
    INSERT INTO task (
      title,
      description,
      status,
      ends_at
    )
    VALUES (
      'Test task',
      'description test',
      'todo',
      '2026-06-01'
    )
  `);
});

afterAll(async () => {
  await pool.end();
});

const getFirstTaskId = async () => {
  const res = await request(app)
    .get("/api/v1/tasks");

  return res.body.tasks[0].id;
};

describe("Tasks API", () => {

  // =========================================
  // GET /tasks
  // =========================================

  it("should fetch all tasks", async () => {
    const res = await request(app)
      .get("/api/v1/tasks");

    expect(res.statusCode).toBe(200);

    expect(res.body.tasks).toBeDefined();

    expect(Array.isArray(res.body.tasks))
      .toBe(true);

    expect(res.body.tasks.length)
      .toBe(1);
  });

  it("should return empty array if no tasks exist", async () => {
    await pool.query("DELETE FROM task");

    const res = await request(app)
      .get("/api/v1/tasks");

    expect(res.statusCode).toBe(200);

    expect(res.body.tasks)
      .toEqual([]);
  });

  // =========================================
  // GET /tasks/:id
  // =========================================

  it("should fetch a single task", async () => {
    const taskId = await getFirstTaskId();

    const res = await request(app)
      .get(`/api/v1/tasks/${taskId}`);

    expect(res.statusCode).toBe(200);

    expect(res.body.task).toBeDefined();

    expect(res.body.task.id)
      .toBe(taskId);
  });

  it("should return 404 for missing task", async () => {
    const res = await request(app)
      .get("/api/v1/tasks/999999");

    expect(res.statusCode).toBe(404);

    expect(res.body.error)
      .toBe("Task not found");
  });

  // =========================================
  // POST /tasks
  // =========================================

  it("should create a task", async () => {
    const res = await request(app)
      .post("/api/v1/tasks")
      .send({
        title: "New task",
        description: "new description",
        status: "todo",
        ends_at: "2026-07-01",
      });

    expect(res.statusCode).toBe(201);

    expect(res.body.task).toBeDefined();

    expect(res.body.task.title)
      .toBe("New task");
  });

  // =========================================
  // PATCH /tasks/:id
  // =========================================

  it("should update task status", async () => {
    const taskId = await getFirstTaskId();

    const res = await request(app)
      .patch(`/api/v1/tasks/${taskId}`)
      .send({
        status: "done",
      });

    expect(res.statusCode).toBe(200);

    expect(res.body.task.status)
      .toBe("done");
  });

  it("should preserve untouched fields", async () => {
    const taskId = await getFirstTaskId();

    const original = await request(app)
      .get(`/api/v1/tasks/${taskId}`);

    const res = await request(app)
      .patch(`/api/v1/tasks/${taskId}`)
      .send({
        status: "done",
      });

    expect(res.body.task.title)
      .toBe(original.body.task.title);

    expect(res.body.task.description)
      .toBe(original.body.task.description);
  });

  it("should return 404 when updating missing task", async () => {
    const res = await request(app)
      .patch("/api/v1/tasks/999999")
      .send({
        status: "done",
      });

    expect(res.statusCode).toBe(404);

    expect(res.body.error)
      .toBe("Task not found");
  });

  // =========================================
  // DELETE /tasks/:id
  // =========================================

  it("should delete a task", async () => {
    const taskId = await getFirstTaskId();

    const res = await request(app)
      .delete(`/api/v1/tasks/${taskId}`);

    expect(res.statusCode).toBe(200);

    expect(res.body.message)
      .toBe("Task deleted");
  });

  it("should return 404 when deleting missing task", async () => {
    const res = await request(app)
      .delete("/api/v1/tasks/999999");

    expect(res.statusCode).toBe(404);

    expect(res.body.error)
      .toBe("Task not found");
  });

});
