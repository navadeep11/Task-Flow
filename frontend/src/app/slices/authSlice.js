import { createSlice } from "@reduxjs/toolkit"

const storedAuth = localStorage.getItem("auth")

const initialState = storedAuth
  ? JSON.parse(storedAuth)
  : {
      user: null,
      token: null,
    }

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { _id, name, email, token } = action.payload

      state.user = { _id, name, email }
      state.token = token

      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: { _id, name, email },
          token,
        })
      )
    },

    logout: (state) => {
      state.user = null
      state.token = null
      localStorage.removeItem("auth")
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer