const TodoTask = require("../db/model");

const todosRepository = {
  getTodos: async (filter, curPage) => {
    try {
      const todosForPage = 10;
      const currentPage = curPage || 1;
      const activeTasks = (await TodoTask.find({completed: false})).length;
      let filteredObject = {};

      switch (filter) {
        case 'active':
          filteredObject = { completed: false };
          break;
        case 'completed':
          filteredObject = { completed: true };
          break;
        default:
          break;
      }

      let todos = await TodoTask
        .find(filteredObject)
        .skip((currentPage - 1) * todosForPage)
        .limit(todosForPage);

      let filteredItems = (await TodoTask.find(filteredObject)).length;

      //ceil - округление до ближайшего большего целого
      const allPages = Math.ceil(filteredItems / todosForPage);

      const pages = Array.from({ length: allPages }, (g, index) => index + 1);

      return {todos, pages, activeTasks};
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
    
    return todo;
  },

  deleteTodo: async (incomingID) => {
    try {
      const todo = await TodoTask.findByIdAndDelete(incomingID);
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

    return todo;
  },
};

module.exports = todosRepository;