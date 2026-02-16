import { createContext, useContext, useEffect, useState } from "react";
import { loginService, logoutService } from "../services/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("auth_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = (email, password, remember) => {
    const result = loginService(email, password);
    if (result.success) {
      setUser(result.user);
      if (remember) {
        localStorage.setItem("auth_user", JSON.stringify(result.user));
      }
    }
    return result;
  };

  const logout = () => {
    logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
