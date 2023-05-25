const express = require("express");
const router = express.Router();

const todosController = require('./controllers');

router.get("/", async (req, res) => {
	try {
		const filter = req.query.filter;
		const currentPage = req.query.currentPage;
		const obj = await todosController.getTodos(filter, currentPage);
		res.json(obj);
	}
	catch (error) {
		res.status(400).send(error.message);
	}
});


//Add method
router.post("/", async (req, res) => {
	try {
		const newTodo = await todosController.createTodo(req.body.title);
		res.send(newTodo);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

//Delete method
router.delete("/", async (req, res) => {
	try {
		const deletedTodo = await todosController.deleteTodo(req.body._id);
		res.send(deletedTodo);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

//Change todo method
router.patch("/", async (req, res) => {
	try {
		const updatedTodo = await todosController.updateTodo(req.body);
		res.json(updatedTodo);
	} catch (error) {
		res.status(400).send(error.message);
	}
})


module.exports = router;