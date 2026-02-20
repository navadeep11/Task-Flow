const Button = ({ children, type = "button", loading, className, ...props }) => {
  return (
    <button
      type={type}
      className={`w-full py-2 px-4 rounded-xl font-medium transition duration-200 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  )
}

export default Button