// context/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AuthResponse, User } from "@/types/auth";
import { getToken, setToken, clearToken } from "@/lib/token";
import { getUserData, setUserData } from "@/lib/user";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (data: AuthResponse) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = getToken();
    const savedUser = getUserData();
    if (savedToken && savedUser) {
      setTokenState(savedToken);
      setUser(savedUser);
    }
  }, []);

  function login(data: AuthResponse) {
    setToken(data.acess_token);
    setUserData(data.user);
    setTokenState(data.acess_token);
    setUser(data.user);
  }

  function logout() {
    clearToken();
    setTokenState(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
