import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api",
  prepareHeaders: (headers) => {
        const auth = localStorage.getItem("auth")

        if (auth) {
            const { token } = JSON.parse(auth)
            if (token) {
            headers.set("authorization", `Bearer ${token}`)
            }
        }

        return headers
    }
})

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: ["User", "Task"],
  endpoints: () => ({}),
})