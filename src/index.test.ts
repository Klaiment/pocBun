import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Elysia } from 'elysia';
import request from 'supertest';

const server = 'http://localhost:3000';
describe('Elysia API', () => {
    it('GET / - should return "Hello Elysia"', async () => {
        const res = await request(server).get("/");
        expect(res.status).toBe(200);
        expect(res.text).toBe("Hello Elysia");
    });

    it('POST /add-task - should add a task', async () => {
        const task = "Test Task";
        const res = await request(server)
            .post("/add-task")
            .send({ task });
        expect(res.status).toBe(200);

        expect(res.text).toBe(`Task '${task}' added`);
    });

    it('POST /add-task - should return 400 if task is missing', async () => {
        const res = await request(server).post("/add-task").send({});
        expect(res.body.status).toBe(400);
        expect(res.body.body).toBe("Task is required");
    });

    it('GET /tasks - should return all tasks', async () => {
        const res = await request(server).get("/tasks");

        expect(res.status).toBe(200);
        expect(res.body.tasks).toBeDefined();
        expect(res.body.tasks).toContain("Test Task"); // Vérifie si la tâche ajoutée est présente
    });
});


