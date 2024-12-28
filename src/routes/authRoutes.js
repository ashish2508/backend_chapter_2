import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "default_dev_secret";

//Register a new user end point (/auth/register)
router.post("/register", (req, res) => {
	const { username, password } = req.body;
	const hashedPassword = bcrypt.hashSync(password, 10);

	try {
		const insertUser = db.prepare(
			`INSERT INTO users (username, password)
VALUES(?, ?)`
		);
		const result = insertUser.run(username, hashedPassword);
		const defualtTodo = `Hello :) Add Your first Todo!`;
		const insertTodo = db.prepare(`
  INSERT INTO todos (user_id, task)
  VALUES(?, ?)`);
		insertTodo.run(result.lastInsertRowid, defualtTodo);

		//create a token
		const token = jwt.sign(
			{ id: result.lastInsertRowid },
			process.env.JWT_SECRET,
			{ expiresIn: "24h" }
		);
		res.json({ token });
	} catch (err) {
		console.log(err.message);
		res.sendStatus(503);
	}
});
//Login a user (/auth/login)
router.post("/login", (req, res) => {
	const { username, password } = req.body;

	try {
		const getUser = db.prepare(`
SELECT * FROM users WHERE username = ?
      `);
		const user = getUser.get(username);

		if (!user) {
			return res.status(404).send({ message: "User not Found" });
		}
		const passwordIsValid = bcrypt.compareSync(password, user.password);
		if (!passwordIsValid) {
			return res.status(401).send({ message: "Invalid Password" });
		}
    const token=jwt.sign({id: user.id},process.env.JWT_SECRET,{expiresIn:'24h'})
    res.json({token})
	} catch (err) {
		console.log(err.message);
		res.sendStatus(503);
	}
});

export default router;
