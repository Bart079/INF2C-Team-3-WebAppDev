import { createContext, useState, type ReactNode , useContext } from "react";
import type { User, UserCredentials } from "../types/User";
import type { AuthContextValue } from "../types/AuthContextValue";


const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
}
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  async function login(username: string, password: string) {
  if (username.trim() === "" || password.trim() === "") {
    return false;
  }

  const response = await fetch("/mockUsers.json");

  if (!response.ok) {
    throw new Error(`Could not load users: ${response.status}`);
  }

  const members: UserCredentials[] = await response.json();
  const member = members.find(
    (item) => item.username === username && item.password === password,
  );

  if (!member) {
    return false;
  }

  const loggedIn = {
    id: member.id,
    username: member.username,
    roles: member.roles,
  };

  setUser(loggedIn);
  localStorage.setItem("user", JSON.stringify(loggedIn));
  return true;
}

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}