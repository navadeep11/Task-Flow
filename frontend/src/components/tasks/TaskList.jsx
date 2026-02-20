import TaskItem from "./TaskItem"

const TaskList = ({ tasks, onTaskClick }) => {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow p-8 text-center">
        <p className="text-gray-400 text-lg mb-2">📭 No tasks found</p>
       
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onClick={onTaskClick}
        />
      ))}
    </div>
  )
}

export default TaskList