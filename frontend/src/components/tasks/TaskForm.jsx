import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "../../app/api/taskApi"
import Button from "../ui/Button"
import Input from "../ui/Input"

const TaskForm = ({ selectedTask, onClose }) => {

  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  })

  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState("")

  // RTK Query mutations for creating and updating tasks

  const [createTask, { isLoading: creating }] =
    useCreateTaskMutation()
  const [updateTask, { isLoading: updating }] =
    useUpdateTaskMutation()


  // Populate form data when editing an existing task

  useEffect(() => {
    if (selectedTask) {
      setFormData({
        title: selectedTask.title,
        description: selectedTask.description,
      })
    }
  }, [selectedTask])

  const validate = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    return newErrors
  }

  // Handle input changes and clear errors on change

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

    setErrors({ ...errors, [e.target.name]: "" })
    setServerError("")
  }

  // Handle form submission for both creating and updating tasks

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      if (selectedTask) {
        await updateTask({
          id: selectedTask._id,
          ...formData,
        }).unwrap()
        toast.success("Task updated successfully")
      } else {
        await createTask(formData).unwrap()
        toast.success("Task created successfully")
      }

      onClose()
    } catch (err) {
      setServerError(
        err?.data?.message || "Something went wrong"
      )
      toast.error(err?.data?.message || "Something went wrong")
    }
  }

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">
        {selectedTask ? "Edit Task" : "Add Task"}
      </h2>

      {serverError && (
        <div className="bg-red-100 text-red-600 p-2 rounded-lg mb-3 text-sm">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
        />

        <Input
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <Button type="submit" loading={creating || updating}>
          {selectedTask ? "Update" : "Create"}
        </Button>
      </form>
    </>
  )
}

export default TaskForm