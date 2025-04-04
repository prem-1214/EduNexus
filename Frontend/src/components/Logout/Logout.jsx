import axios from "axios";

const Logout = async () => {
  try {
    await axios.post("/user/logout", {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Redirect to login page
    window.location.href = "/login";
  } catch (error) {
    console.error("Error during logout:", error);
  }
}

export default Logout