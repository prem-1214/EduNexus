import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL, // Use the environment variable directly
  withCredentials: true,
});

// Request Interceptor: Attach the access token to every request
api.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle token refresh if access token is expired
api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired access token
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_API_URL}/auth/refresh-token`, // Use the environment variable
          {},
          { withCredentials: true } // Ensure cookies are sent
        );

        const newAccessToken = refreshResponse.data.accessToken;

        // Store the new access token in localStorage
        localStorage.setItem("accessToken", newAccessToken);

        // Retry the original request with the new token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // Redirect to login if refresh fails
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
