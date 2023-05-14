const express = require("express");
const router = express.Router();

const todoServices = require('./service');

router.get("/", async (req, res) => {
  try {
		const todos = await todoServices.getAllTodos();
		res.send(todos);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.post("/", async (req, res) => {
	try {
		const todo = await todoServices.createTodo(req.body);
		res.send(todo);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.patch("/", async (req, res) => {
	try {
		const updatedTodo = await todoServices.updateTodo(req.body)
		res.send(updatedTodo)
 	} catch (error) {
		res.status(400).send(error.message);
	}
})


module.exports = router;