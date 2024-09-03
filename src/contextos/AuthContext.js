import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api";

export const AuthContext = createContext();
AuthContext.displayName = "Auth";

export default function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const login = (userToken, user) => {
    setUser(user);
    setToken(userToken);
    setIsAuthenticated(true);
    api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
    localStorage.setItem("authToken", `Bearer ${userToken}`); // Armazena o token no local storage
  };
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    api.defaults.headers.common["Authorization"] = null;
    localStorage.removeItem("authToken"); // Remove o token do local storage
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      const decodedToken = jwtDecode(savedToken);
      setUser(decodedToken.user);
      setToken(savedToken);
      api.defaults.headers.common["Authorization"] = savedToken;
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, logout, login, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
