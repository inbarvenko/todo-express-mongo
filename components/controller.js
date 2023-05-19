const express = require("express");
const router = express.Router();
const TodoTask = require("../db/model");

const todosRepository = require('./rep');

router.get("/", async (req, res) => {
	try {
		const todos = await todosRepository.getAllTodos();
		res.send(todos);
	}
	catch (error) {
		res.status(400).send(error.message);
	}
});

//Add method
router.post("/", async (req, res) => {
	try {
		const todo = await todosRepository.createTodo(req.body.title);
		res.send(todo);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

//Delete method
router.delete("/", async (req, res) => {
	try {
		console.log(222, req.body);
		const todo = await todosRepository.deleteTodo(req.body._id);
		res.send(todo);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

//Change todo method
router.patch("/", async (req, res) => {
	try {
		const updatedTodo = await todosRepository.updateTodo(req.body);
		res.send(updatedTodo);
	} catch (error) {
		res.status(400).send(error.message);
	}
})


module.exports = router;