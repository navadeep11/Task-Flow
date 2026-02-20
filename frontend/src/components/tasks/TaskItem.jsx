const TaskItem = ({ task, onClick }) => {
  return (
    <div
      onClick={() => onClick(task)}
      className="group bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex justify-between items-center border border-gray-100"
    >
      <div className="flex items-center gap-3">

        {/* Status Indicator */}
        <div
          className={`w-2 h-10 rounded-full ${
            task.status === "completed"
              ? "bg-green-500"
              : "bg-yellow-500"
          }`}
        />

        <div>
          <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition">
            {task.title}
          </h4>
          <p className="text-xs text-gray-400">
            Click to view details
          </p>
        </div>
      </div>

      <span
        className={`text-xs px-3 py-1 rounded-full font-medium ${
          task.status === "completed"
            ? "bg-green-100 text-green-600"
            : "bg-yellow-100 text-yellow-600"
        }`}
      >
        {task.status}
      </span>
    </div>
  )
}

export default TaskItem