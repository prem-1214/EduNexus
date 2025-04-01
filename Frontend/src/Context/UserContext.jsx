import React, { createContext, useContext, useState, useEffect } from "react";

// Create the UserContext
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

// UserProvider component to wrap the app and provide user data
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user data from localStorage when the app initializes
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Function to update user data and persist it in localStorage
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Save user data to localStorage
  };

  // Function to clear user data (e.g., on logout)
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user data from localStorage
    localStorage.removeItem("accessToken"); // Remove access token
  };

  // Automatically refresh user data from localStorage on app reload
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // Persist user to localStorage whenever it changes
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};