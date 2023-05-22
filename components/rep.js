const TodoTask = require("../db/model");

const todosRepository = {
  getTodos: async (filter) => {
    try {
      let todos = await TodoTask.find({});
      switch (filter) {
        case 'active':
          todos = await TodoTask.find({ completed: false });
          break;
        case 'completed':
          todos = await TodoTask.find({ completed: true });
          break;
        default:
          break;
      }
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
    return todo;
  },

  deleteTodo: async (incomingID) => {
    try {
      const todo = await TodoTask.findByIdAndDelete(incomingID);
      console.log(todo);
      return todo;
    } catch (error) {
      console.error(error);
    }
  },

  updateTodo: async (data) => {
    const { _id, title, completed } = data;
    const todo = await TodoTask.findByIdAndUpdate(_id, {
      title,
      completed,
    }, {
      new: true,
    });

    console.log(todo);
    return todo;
  },
};

module.exports = todosRepository;