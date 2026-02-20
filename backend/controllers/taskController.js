const Task = require("../models/Task");

// @desc Create Task
// @route POST /api/tasks
// @access Private

const createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      res.status(400);
      throw new Error("Title is required");
    }

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      status,
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// @desc Get All Tasks for Logged User (with optional search)
// @route GET /api/tasks
// @access Private


const getTasks = async (req, res, next) => {
  try {
    const { search } = req.query;

    const query = {
      user: req.user._id,
    };

    // Only apply search if it's not empty after trimming
    if (search && search.trim() !== "") {
      query.title = {
        $regex: search.trim(),
        $options: "i", // case-insensitive
      };
    }

    const tasks = await Task.find(query).sort({
      createdAt: -1,
    });

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};
// @desc Update Task
// @route PUT /api/tasks/:id
// @access Private


const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    // Make sure task belongs to logged user
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized");
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;

    const updatedTask = await task.save();

    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// @desc Delete Task
// @route DELETE /api/tasks/:id
// @access Private


const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    if (task.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized");
    }

    await task.deleteOne();

    res.status(200).json({ message: "Task removed" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};