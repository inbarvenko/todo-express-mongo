const express = require("express");
const createToDo = require("./controllers/createToDo");
const readToDo = require("./controllers/readToDo");
const updateToDo = require("./controllers/updateToDo");
const deleteToDo = require("./controllers/deleteToDo");

const todosRouter = express.Router();

todosRouter.get("/", readToDo);
todosRouter.post("/", createToDo);
todosRouter.patch("/:id", updateToDo);
todosRouter.delete("/:id", deleteToDo);

module.exports = todosRouter;