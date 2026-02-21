import { useState } from "react"
import { useRegisterMutation } from "../app/api/authApi"
import { useDispatch, useSelector } from "react-redux"
import { setCredentials } from "../app/slices/authSlice"
import { useNavigate, Navigate } from "react-router-dom"
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"
import { Link } from "react-router-dom"

const Register = () => {
  const { token } = useSelector((state) => state.auth)

  // Redirect if already logged in
  if (token) {
    return <Navigate to="/dashboard" replace />
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState("")


  // RTK Query mutation for registration

  const [register, { isLoading }] = useRegisterMutation()
  const dispatch = useDispatch()

  const navigate = useNavigate()

  // Validate form inputs before submission

  const validate = () => {
    const newErrors = {}

    if (!formData.name) newErrors.name = "Name is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.password) newErrors.password = "Password is required"
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters"
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match"

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


  // Handle form submission for registration
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      const res = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }).unwrap()

      dispatch(setCredentials(res))
      navigate("/dashboard")
    } catch (err) {
      setServerError(err?.data?.message || "Something went wrong")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Register
        </h2>

        {serverError && (
          <div className="bg-red-100 text-red-600 p-2 rounded-lg mb-4 text-sm">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
          <Input label="Email" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
          <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} error={errors.password} />
          <Input label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />

          <Button type="submit" loading={isLoading}>
            Register
          </Button>


          <div className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register