const todoModel = require("../db/model");

const todosRepository = {
  getAllTodos: async () => {
    const todos = await todoModel.find({});
    console.log(todos);
    return todos;
  },

  createTodo: async (value) => {
    const todo = new todoModel({ value });

    await todo.save();
    console.log(todo);
    
    return todo;
  },

  updateTodo: async (id, value) => {
    const todo = await todoModel.findByIdAndUpdate(id, value, { new: true });
    console.log(todo);

    return todo;
  },
};

module.exports = todosRepository;