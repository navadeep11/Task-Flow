const TaskViewModal = ({
  task,
  onToggleStatus,
  onEdit,
  onDelete,
}) => {
  return (
    <>
      <h3 className="text-lg font-semibold mb-2">
        {task.title}
      </h3>

      <p className="text-gray-600 mb-4">
        {task.description}
      </p>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={onToggleStatus}
          className={`px-3 py-1 rounded-full text-sm ${
            task.status === "completed"
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {task.status}
        </button>

        <div className="flex gap-4">
          <button
            onClick={onEdit}
            className="text-blue-600 text-sm"
          >
            Edit
          </button>

          <button
            onClick={onDelete}
            className="text-red-600 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  )
}

export default TaskViewModal