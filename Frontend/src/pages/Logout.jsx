import axios from "axios"
import api from "../utils/axiosInstance"

const Logout = async () => {
  try {
    await api.post(
      "/user/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )

    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")

    // Redirect to login page
    window.location.href = "/login"
  } catch (error) {
    console.error("Error during logout:", error)
  }
}

export default Logout
