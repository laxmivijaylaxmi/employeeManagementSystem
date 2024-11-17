import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const userContext = createContext();

export const useAuth = () => useContext(userContext);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const verifyUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get("http://localhost:7000/admin/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setUser(response.data.user); 
          console.log(response.data)// Ensure this returns the correct user data
        }
      }
      
    } catch (error) {
      console.error("User verification failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <userContext.Provider value={{ user, login, logout, verifyUser, loading }}>
      {children}
    </userContext.Provider>
  );
};

export default AuthContextProvider;
