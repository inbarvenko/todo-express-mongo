const TodoTask = require("../db/model");

const todosRepository = {
  getAllTodos: async () => {
    try {
      const todos = await TodoTask.find({});
      console.log(todos);
      return todos;
    } catch (error) {
      console.error(error);
    }
  },

  createTodo: async (title) => {
    const todo = new TodoTask({
      title,
      completed: false,
    });

    await todo.save();
    console.log(todo);

    const todos = await TodoTask.find({});

    return todos;
  },

  deleteTodo: async (incomingID) => {
    try {
      const todos = await TodoTask.deleteOne({_id: incomingID})

      console.log(todos);
      return todos;
    } catch (error) {
      console.error(error);
    }
  },

  updateTodo: async (id, value) => {
    const todo = await todoModel.findByIdAndUpdate(id, value, { new: true });
    console.log(todo);

    return todo;
  },
};

module.exports = todosRepository;