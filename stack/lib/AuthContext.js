import { useState, useEffect, createContext, useContext } from "react";
import axiosInstance from "./axiosinstance";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const Signup = async ({ name, email, password }) => {
    setloading(true);
    seterror(null);

    try {
      const res = await axiosInstance.post("/user/signup", {
        name,
        email,
        password,
      });

      setUser(res.data.data);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.data)
      );

      toast.success("Signup Successful");
    } catch (error) {
      seterror(error);
      throw error;
    }

    setloading(false);
  };

  const Login = async ({ email, password }) => {
    setloading(true);
    seterror(null);

    try {
      const res = await axiosInstance.post("/user/login", {
        email,
        password,
      });

      setUser(res.data.data);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.data)
      );

      toast.success("Login Successful");
    } catch (error) {
      seterror(error);
      throw error;
    }

    setloading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        Signup,
        Login,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);