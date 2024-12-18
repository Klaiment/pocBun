import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Elysia } from 'elysia';
import request from 'supertest';

// Importation du code serveur à tester
import { app } from './index'; // Assure-toi d'exporter `app` depuis ton fichier serveur

describe('Elysia API', () => {
    let instance = `http://localhost:3000`; // Stocke l'instance du serveur pour chaque test
    let tasks = []; // Mock des données pour remplacer le tableau réel

    beforeEach(() => {
        // Mock du tableau `tasks` utilisé dans l'application
        app.tasks = tasks;

        // Crée une nouvelle instance d'Elysia pour chaque test
        // instance = app.listen(3000); // Écoute sur un port aléatoire non utilisé
    });

    it('GET / - should return "Hello Elysia"', async () => {
        const res = await request(instance).get("/");
        expect(res.status).toBe(200);
        expect(res.text).toBe("Hello Elysia");
    });

    it('POST /add-task - should add a task', async () => {
        const task = "Test Task";
        const res = await request(instance)
            .post("/add-task")
            .send({ task });

        expect(res.status).toBe(200);
        expect(res.text).toBe(`Task '${task}' added`);
    });

    it('POST /add-task - should return 400 if task is missing', async () => {
        const res = await request(instance).post("/add-task").send({});
        expect(res.body.status).toBe(400);
        expect(res.body.body).toBe("Task is required");
    });

    it('GET /tasks - should return all tasks', async () => {
        // Ajout d'une tâche dans le mock
        tasks.push("Test Task");

        const res = await request(instance).get("/tasks");

        expect(res.status).toBe(200);
        expect(res.body.tasks).toBeDefined();
        expect(res.body.tasks).toContain("Test Task"); // Vérifie si la tâche ajoutée est présente
    });
});
