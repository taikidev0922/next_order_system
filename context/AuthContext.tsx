"use client";
import { components } from "@/schema";
import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

type User = components["schemas"]["UserDetails"];

interface AuthContextType {
  user: User | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  setUser: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}
const setToken = (token: string) => {
  Cookies.set("token", token, { expires: 7 }); // 7日間有効
};
export const getToken = () => {
  return Cookies.get("token");
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User, token: string) => {
    setUser(userData);
    setToken(token);
  };

  const logout = () => {
    setUser(null);
    setToken("");
  };

  const value = {
    user,
    login,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
