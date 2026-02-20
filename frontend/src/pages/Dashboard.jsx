import { useState } from "react"
import toast from "react-hot-toast"
import {
  useGetTasksQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../app/api/taskApi"

import Modal from "../components/ui/Modal"
import TaskForm from "../components/tasks/TaskForm"
import TaskTopBar from "../components/tasks/TaskTopBar"
import TaskList from "../components/tasks/TaskList"
import TaskViewModal from "../components/tasks/TaskViewModal"

const Dashboard = () => {
  const [search, setSearch] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  // RTK Query hooks for fetching, deleting, and updating tasks

  const { data: tasks = [] } = useGetTasksQuery(search)
  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  // Open modal for adding a new task or viewing/editing an existing task

  const openAddModal = () => {
    setSelectedTask(null)
    setIsEditing(false)
    setIsModalOpen(true)
  }

  // Open task details in a modal when a task is clicked

  const openTaskDetails = (task) => {
    setSelectedTask(task)
    setIsEditing(false)
    setIsModalOpen(true)
  }

  
// Handle task deletion with confirmation

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        )
        if (!confirmDelete) return

        try {
            await deleteTask(id).unwrap()
            toast.success("Task deleted successfully")
            setIsModalOpen(false)
        } catch (err) {
            toast.error(err?.data?.message || "Delete failed")
        }
    }


  // Toggle task status between pending and completed
  
  const toggleStatus = async () => {
    await updateTask({
      id: selectedTask._id,
      status:
        selectedTask.status === "pending"
          ? "completed"
          : "pending",
    }).unwrap()
    toast.success("Status updated")

    setSelectedTask({
      ...selectedTask,
      status:
        selectedTask.status === "pending"
          ? "completed"
          : "pending",
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="max-w-4xl mx-auto space-y-6">

        <TaskTopBar
          search={search}
          setSearch={setSearch}
          onAdd={openAddModal}
        />

        <TaskList
          tasks={tasks}
          onTaskClick={openTaskDetails}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        {!selectedTask ? (
          <TaskForm
            selectedTask={null}
            onClose={() => setIsModalOpen(false)}
          />
        ) : !isEditing ? (
          <TaskViewModal
            task={selectedTask}
            onToggleStatus={toggleStatus}
            onEdit={() => setIsEditing(true)}
            onDelete={() =>
              handleDelete(selectedTask._id)
            }
          />
        ) : (
          <TaskForm
            selectedTask={selectedTask}
            onClose={() => {
              setIsEditing(false)
              setIsModalOpen(false)
            }}
          />
        )}
      </Modal>
    </div>
  )
}

export default Dashboard