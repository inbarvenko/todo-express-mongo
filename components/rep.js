const TodoTask = require("../db/model");

const todosRepository = {
  getTodos: async (filter, curPage) => {
    try {
      const todosForPage = 10;
      const currentPage = curPage || 1;
      const activeTasks = (await TodoTask.find({completed: false})).length;

      let todos = await TodoTask
        .find({})
        .skip((currentPage - 1) * todosForPage)
        .limit(todosForPage);

      let filteredItems = (await TodoTask.find({})).length;
      switch (filter) {
        case 'active':
          todos = await TodoTask
          .find({ completed: false })
          .skip((currentPage - 1) * todosForPage)
          .limit(todosForPage);

          filteredItems = activeTasks;
          break;
        case 'completed':
          todos = await TodoTask
          .find({ completed: true })
          .skip((currentPage - 1) * todosForPage)
          .limit(todosForPage);

          filteredItems = (await TodoTask.find({completed: true})).length;
          break;
        default:
          break;
      }

      console.log(activeTasks);

      //ceil - округление до ближайшего большего целого
      const allPages = Math.ceil(filteredItems / todosForPage);
      // console.log(allPages);

      const pages = Array.from({ length: allPages }, (g, index) => index + 1);
      // console.log(pages);
      // console.log(todos);

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
    console.log(todo);
    
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

    console.log(todo);
    return todo;
  },
};

module.exports = todosRepository;