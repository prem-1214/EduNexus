import React, { useState } from "react"
import { GoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { Link, useNavigate } from "react-router-dom"
import TypingQuote from "../Context/TypingQuote.jsx"

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("/auth/register", { email, password })
      localStorage.setItem("accessToken", response.data.accessToken)
      navigate("/login")
    } catch (error) {
      setErrorMessage("Registration failed. Try again.")
    }
  }

  const handleGoogleSuccess = async (response) => {
    if (response.credential) {
      const userInfo = jwtDecode(response.credential)
      try {
        const googleResponse = await axios.post("/auth/google-login", {
          userInfo,
        })
        localStorage.setItem("accessToken", googleResponse.data.accessToken)
        const role = googleResponse.data.user.role
        if (role === "student") navigate("/studentDashboard")
        else if (role === "educator") navigate("/educatorDashboard")
        else setErrorMessage("Unknown role. Please contact support.")
      } catch (error) {
        setErrorMessage("Google registration failed.")
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#141e30] via-[#243b55] to-[#141e30] text-white px-4">
      <div className="w-full max-w-5xl rounded-2xl backdrop-blur-xl bg-white/10 dark:bg-black/30 border border-white/20 shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Left: Register Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold mb-6 text-center tracking-tight">
            Create an Account
          </h2>

          {errorMessage && (
            <div className="bg-red-500/80 text-white text-sm px-4 py-2 rounded-md mb-4 text-center animate-pulse shadow-md">
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
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-300"
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
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400 text-white placeholder-gray-300"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-md bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 transition-all duration-300 font-semibold tracking-wide text-white shadow-md"
            >
              Register
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center">
            <div className="bg-white rounded-md shadow-lg p-1">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setErrorMessage("Google login failed.")}
                useOneTap
              />
            </div>
          </div>

          <p className="mt-6 text-sm text-center text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-400 hover:underline">
              Login here
            </Link>
          </p>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px bg-white/20 my-8" />

        {/* Right: Quote Section */}
        <div className="w-full md:w-1/2 p-10 flex items-center justify-center">
          <TypingQuote />
        </div>
      </div>
    </div>
  )
}

export default Register
