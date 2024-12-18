import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'
const app = new Elysia();
let tasks = [];
app.use(swagger())

app.get("/", () => "Hello Elysia");

app.post("/add-task", ({ body }) => {
    const { task } = body || {};
    if (!task) {
        return {
            status: 400,
            body: "Task is required"
        };
    }
    tasks.push(task);
    return `Task '${task}' added`;
});



app.listen(3000)
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
