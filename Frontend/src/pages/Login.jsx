import React, { useState } from "react"
import { GoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { Link, useNavigate } from "react-router-dom"
import TypingQuote from "../context/TypingQuote.jsx"
import api from "../utils/axiosInstance.js" // Import the axios instance
import { useUser } from "../context/UserContext.jsx"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()
  const { updateUser } = useUser()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post("/auth/login", { email, password })
      localStorage.setItem("accessToken", response.data.accessToken)
      updateUser(response.data.user)
      const role = response.data.user.role
      if (role === "student") navigate("/studentDashboard")
      else if (role === "educator") navigate("/educatorDashboard")
      else setErrorMessage("Unknown role. Please contact support.")
    } catch (error) {
      setErrorMessage("Invalid email or password.")
    }
  }

  const handleGoogleSuccess = async (response) => {
    if (response.credential) {
      const userInfo = jwtDecode(response.credential)
      try {
        // Use the axios instance to make the request
        const googleResponse = await api.post("/auth/google-login", {
          userInfo,
        })
        localStorage.setItem("accessToken", googleResponse.data.accessToken)
        updateUser(googleResponse.data.user)
        const role = googleResponse.data.user.role
        if (role === "student") navigate("/studentDashboard")
        else if (role === "educator") navigate("/educatorDashboard")
        else setErrorMessage("Unknown role. Please contact support.")
      } catch (error) {
        setErrorMessage("Google login failed.")
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-gray-800 px-4">
      <div className="w-full max-w-5xl rounded-2xl backdrop-blur-xl bg-white/70 border border-gray-200 shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Left: Login Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold mb-6 text-center tracking-tight text-gray-900">
            Welcome Back
          </h2>

          {errorMessage && (
            <div className="bg-red-100 text-red-600 text-sm px-4 py-2 rounded-md mb-4 text-center shadow">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800 placeholder-gray-400"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-800 placeholder-gray-400"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-md bg-gradient-to-r from-blue-400 to-teal-300 hover:from-blue-500 hover:to-teal-400 transition-all duration-300 font-semibold tracking-wide text-white shadow-md"
            >
              Login
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center">
            <div className="bg-white rounded-md shadow p-1">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setErrorMessage("Google login failed.")}
                useOneTap
              />
            </div>
          </div>

          <p className="mt-6 text-sm text-center text-gray-500">
            Not registered?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Create an account
            </Link>
          </p>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px bg-gray-200 my-8" />

        {/* Right: Quote Section */}
        <div className="w-full md:w-1/2 p-10 flex items-center justify-center bg-white/70">
          <TypingQuote />
        </div>
      </div>
    </div>
  )
}

export default Login
