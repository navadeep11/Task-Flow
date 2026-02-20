const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");

// All routes below are protected

router.use(protect);

//  GET /api/tasks
router
  .route("/")
  .get(getTasks)
  .post(createTask);

router
  .route("/:id")
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;