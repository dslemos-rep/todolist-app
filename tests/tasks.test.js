import { describe, it, expect, afterAll, beforeEach } from "vitest";
import request from "supertest";
import app from "../app.js";
import pool from "../db.js";

beforeEach(async () => {
  await pool.query("DELETE FROM task");

  await pool.query(`
    INSERT INTO task (title, description, status, ends_at)
    VALUES ('Test task', 'description test', 'todo', '2026-06-01')
  `);
});

describe("Tasks API", () => {
  it("should fetch all tasks", async () => {
    const res = await request(app).get("/api/v1/tasks");

    expect(res.statusCode).toBe(200);
    expect(res.body.tasks).toBeDefined();
  });

  it("should return 404 for missing task", async () => {
    const res = await request(app).get("/api/v1/tasks/999999");

    expect(res.statusCode).toBe(404);
  });
});

afterAll(async () => {
  await pool.end();
});
