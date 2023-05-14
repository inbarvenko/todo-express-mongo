const express = require("express");
const router = express.Router();
const Todo = require("../db/model");

router.delete("/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      throw Error("No id");
    }
    const deletedTodo = await Todo.findByIdAndDelete({ _id: req.params.id });

    if (!deletedTodo) {
      return res.status(404).json({ message: "Unable to delete" });
    }

    res.json("ok");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;