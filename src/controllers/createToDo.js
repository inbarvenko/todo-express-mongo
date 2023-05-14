const express = require("express");
const router = express.Router();
const Todo = require("../db/model");

router.post("/", async (req, res) => {
  try {
    if (!req.body.title) {
      throw Error("Title is required");
    }
    const todo = new Todo({ title: req.body.title });
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;