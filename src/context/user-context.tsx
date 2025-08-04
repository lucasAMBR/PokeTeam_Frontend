// context/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AuthResponse, User } from "@/types/auth";
import { getToken, setToken, clearToken } from "@/lib/token";
import { clearUserData, getUserData, setUserData } from "@/lib/user";
import { api } from "@/lib/axios";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (data: AuthResponse) => void;
  logout: () => void;
  isInvalid: () => Promise<boolean>;
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
    clearUserData();
    setTokenState(null);
    setUser(null);
  }

  const isInvalid = async (): Promise<boolean> => {
    const token = getToken();
    if (!token) return true;

    try {
      const response = await api.get("/perfil", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
      return false;
    } catch {
      return true;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isInvalid }}>
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
