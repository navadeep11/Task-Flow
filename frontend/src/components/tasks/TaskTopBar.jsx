const TaskTopBar = ({ search, setSearch, onAdd }) => {
  return (
    <div className="flex justify-between items-center">

      {/* Search */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:max-w-xs px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Desktop Add */}
      <button
        onClick={onAdd}
        className="hidden sm:inline-flex ml-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      >
        + Add Task
      </button>

      {/* Mobile Add */}
      <button
        onClick={onAdd}
        className="sm:hidden ml-4 w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full text-xl font-bold"
      >
        +
      </button>
    </div>
  )
}

export default TaskTopBar