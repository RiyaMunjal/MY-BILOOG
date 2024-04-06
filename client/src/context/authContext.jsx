import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { REACT_APP_BACKEND_URL } from "../config";

export const AuthContext = createContext(null);

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const login = async (input) => {
    const res = await axios.post(
      `${REACT_APP_BACKEND_URL}/api/auth/login`,
      input,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    setUser(res.data);
  };

  const logout = async () => {
    const res = await axios.get(`${REACT_APP_BACKEND_URL}/api/auth/logout`, {
      withCredentials: true,
    });
    console.log(res);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};
