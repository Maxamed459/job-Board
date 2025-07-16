import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);
  const [error, setError] = useState(null);

  const registerUser = async (userData) => {
    console.log(userData);
    try {
      const { data } = await axios.post("/api/user/register-admin", userData);
      if (data.success) {
        console.log(data);
        setAuthUser(data.userData);
        setError(null);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
      console.log(error.message);
    }
  };

  const login = async (userData) => {
    try {
      const { data } = await axios.post("/api/user/login", userData);
      if (data.success) {
        console.log(data);
        setError(null);
        navigate("/dashboard");

        const expiresIn = new Date().getTime() + data.expiresIn * 1000;

        localStorage.setItem("expiresIn", expiresIn.toString());
        localStorage.setItem("user", JSON.stringify(data.user));
        setAuthUser(data.user);
      }
    } catch (error) {
      setError(error.response?.data?.message);
      console.log(error.response?.data?.message);
    }
  };

  const logout = async () => {
    localStorage.removeItem("expiresIn");
    localStorage.removeItem("user");
    setAuthUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const expirationTime = localStorage.getItem("expiresIn");

    if (storedUser && expirationTime) {
      const currentTime = new Date().getTime();

      if (currentTime < parseInt(expirationTime)) {
        setAuthUser(JSON.parse(storedUser));
      } else {
        logout();
      }
    }
  }, []);

  const value = {
    registerUser,
    setAuthUser,
    authUser,
    error,
    setError,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
