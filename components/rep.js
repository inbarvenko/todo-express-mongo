const TodoTask = require("../db/model");

const todosRepository = {
  getTodos: async (filter, curPage) => {
    try {
      const todosForPage = 10;
      const currentPage = curPage || 1;
      let activeTasks = 0;
      let todos = [];
      let filteredItems = 0;
      let filteredObject = {};

      switch (filter) {
        case 'active':
          filteredObject = { completed: false };
          // filteredItems = activeTasks;
          break;
        case 'completed':
          filteredObject = { completed: true };
          // filteredItems = await TodoTask.countDocuments({completed: true});
          break;
        default:
          // filteredItems = await TodoTask.countDocuments({});
          break;
      }

      await Promise.all([
        new Promise(async (resolve, reject) => {
          const todo = await TodoTask
            .find(filteredObject)
            .skip((currentPage - 1) * todosForPage)
            .limit(todosForPage);

          resolve(todo);
        }
        ),
        new Promise(async (resolve, reject) => {
          const active = await TodoTask.countDocuments({ completed: false });
          resolve(active);
        }
        ),
        new Promise(async (resolve, reject) => {
          const allFiltered = await TodoTask.countDocuments(filteredObject);
          resolve(allFiltered);
        }
        ),
      ]).then((values) => {
        todos = values[0];
        activeTasks = values[1];
        filteredItems = values[2];
      }
      );

      //ceil - округление до ближайшего большего целого
      const allPages = await Math.ceil(filteredItems / todosForPage);

      const pages = await Array.from({ length: allPages }, (g, index) => index + 1);

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

module.exports = todosRepository;