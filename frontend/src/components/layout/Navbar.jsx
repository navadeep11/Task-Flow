import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../app/slices/authSlice"
import { useNavigate, Link } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import toast from "react-hot-toast"

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token, user } = useSelector((state) => state.auth)

  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Handle user logout with confirmation

  const handleLogout = () => {
    const confirmLogout = window.confirm(
        "Are you sure you want to logout?"
    )

    if (!confirmLogout) return

    dispatch(logout())
    toast.success("Logged out successfully")
    navigate("/")
 }

 

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <nav className="w-full bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link
          to={token ? "/dashboard" : "/"}
          className="text-xl font-bold text-blue-600"
        >
          TaskFlow
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {!token && (
            <>
              <Link
                to="/"
                className="text-gray-600 hover:text-blue-600 text-sm"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-gray-600 hover:text-blue-600 text-sm"
              >
                Register
              </Link>
            </>
          )}

          {token && (
            <div className="relative" ref={dropdownRef}>

              {/* Profile Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>

                <span className="hidden sm:block text-sm text-gray-700">
                  {user?.name}
                </span>
              </button>

              {/* Dropdown */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border p-4 animate-fadeIn">

                  <div className="mb-3">
                    <p className="font-semibold text-gray-800">
                      {user?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user?.email}
                    </p>
                  </div>

                  <div className="border-t pt-3">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition text-sm font-medium"
                    >
                      Logout
                    </button>
                  </div>

                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar