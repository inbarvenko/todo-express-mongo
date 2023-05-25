const TodoTask = require("../db/model");

const todosController = {
  getTodos: async (filter, curPage) => {
    try {
      const todosForPage = 10;
      const currentPage = curPage || 1;

      const filteredObject = (filter === 'all' || !filter) ? {} : { completed: filter === 'completed' };

      const [todos, activeTasks, filteredItems] = await Promise.all([
        TodoTask.find(filteredObject).limit(todosForPage).skip((currentPage - 1) * todosForPage),
        TodoTask.countDocuments({ completed: false }),
        TodoTask.countDocuments(filteredObject),
      ]);

      console.log(todos, activeTasks, filteredItems)

      //ceil - округление до ближайшего большего целого
      const allPages = Math.ceil(filteredItems / todosForPage);

      const pages = Array.from({ length: allPages }, (g, index) => index + 1);

      return { todos, pages, activeTasks };
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

module.exports = todosController;