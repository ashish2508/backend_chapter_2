import express from "express";
import db from "../db.js";

const router = express.Router();

//get all todos for logged-in user
router.get("/", (req, res) => {
	const getTodos = db.prepare(`SELECT * FROM todos WHERE user_id=?`);
	const todos = getTodos.all(req.userId);
	res.json(todos);
});

//Create a new todo
router.post("/", (req, res) => {
	const { task } = req.body;
	const insertTodo = db.prepare(
		`INSERT INTO todos (user_id, task) VALUES (?, ?)`
	);
	const result = insertTodo.run(req.userId, task);

	res.json({ id: result.lastInsertRowid, task, completed: 0 });
});

//update a todo
router.put("/:id", (req, res) => {
	const updatedTodo = db.prepare("UPDATE todos SET completed = ? WHERE id = ?");
});

//delete a todo
router.delete("/:id", (req, res) => {
	const deleteTodo = db.prepare(
		`DELETE FROM todos WHERE id = ? AND user_id = ?`
	);
});

export default router;
