const express = require("express");
const router = express.Router();
const Todo = require("../db/model");

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({
      completed: req.query.filter === "COMPLETED",
    });
    res.json(todos);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;