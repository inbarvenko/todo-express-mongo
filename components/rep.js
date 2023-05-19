const TodoTask = require("../db/model");

const todosRepository = {
  getAllTodos: async () => {
    try {
      const todos = await TodoTask.find({});
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
    const todos = await TodoTask.find({});
    return todos;
  },

  deleteTodo: async (incomingID) => {
    try {
      const todo = await TodoTask.findByIdAndDelete(incomingID);
      const todos = await TodoTask.find({});
      console.log(111, todo);

      return todos;
    } catch (error) {
      console.error(error);
    }
  },

  updateTodo: async (data) => {
    const {_id, title, completed} = data;
    const todo = await TodoTask.findByIdAndUpdate(_id, {
      title, 
      completed,
    }, {
      new: true,
    });
    const todos = await TodoTask.find({});

    return todos;
  },
};

module.exports = todosRepository;